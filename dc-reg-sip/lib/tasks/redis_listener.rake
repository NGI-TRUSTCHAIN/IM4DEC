require 'pg'

Rails.logger = Logger.new(STDOUT)

namespace :redis_listener do
    desc "Start Redis listener (SIP Plugin)"
    task start: :environment do
        CHANNEL_NAME = 'sip'
        SIP_SECRET = ENV["SIP_SECRET"]
        Rails.logger.info("starting to listen at '#{CHANNEL_NAME}'")
        puts "starting to listen at '#{CHANNEL_NAME}'"
        $redis.subscribe(CHANNEL_NAME) do |on|
            on.message do |channel, message|
                Rails.logger.info("Broadcast on channel #{channel}: #{message}")
                puts "Broadcast on channel #{channel}: #{message}"
                reg_id = message
                continue = true

                # create SIP credentials
                username = Digest::MD5.hexdigest(reg_id + ":" + SecureRandom.alphanumeric(26))
                domain = "service.dec112.at"
                password = Digest::MD5.hexdigest(SecureRandom.alphanumeric(26))
                ha1 = Digest::MD5.hexdigest(username + ':' + domain + ':' + password)
                ha1b = Digest::MD5.hexdigest(username + '@' + domain + ':' + domain + ':' + password)
                Rails.logger.info("user: #{username}, password: #{password}")
                puts "user: #{username}, password: #{password}"

                sip_credentials = {"username":username, "password": password}
                if SIP_SECRET.to_s == ""
                    $redis.hset(reg_id, "status_code", 9002)
                    $redis.hset(reg_id, "status_text", "SIP Plugin: missing configuration 'SIP_SECRET'")
                    continue = false
                end
                if continue
                    delete_token = Digest::SHA256.hexdigest(username + ':' + SIP_SECRET)

                    # create entry in subscriber table of Kamailio DB
                    begin
                        conn = PG.connect(
                                    dbname: ENV["DB_KAMAILIO_NAME"], 
                                    user: ENV["DB_KAMAILIO_USER"], 
                                    password: ENV["DB_KAMAILIO_PASSWORD"].strip, 
                                    host: ENV["DB_KAMAILIO_HOST"], 
                                    port: 5432)
                    rescue Exception => e
                        $redis.hset(reg_id, "status_code", 9003)
                        $redis.hset(reg_id, "status_text", "SIP Plugin: error on connecting to Kamailio DB")
                        continue = false
                    end
                end
                if continue
                    sql_statement = "INSERT INTO subscriber(username, domain, password, ha1, ha1b) "
                    sql_statement += "VALUES ('" + username + "', "
                    sql_statement += "'" + domain + "', "
                    sql_statement += "'" + password + "', "
                    sql_statement += "'" + ha1 + "', "
                    sql_statement += "'" + ha1b + "') "
                    sql_statement += "ON CONFLICT (username) DO NOTHING;"
                    res = conn.exec(sql_statement)
                    if !(res && res.cmd_tuples > 0)
                        $redis.hset(reg_id, "status_code", 9004)
                        $redis.hset(reg_id, "status_text", "SIP Plugin: error on writing subscriber table")
                    end

                    # existing response?
                    er = $redis.hget(reg_id, "response") rescue nil
                    if er.nil?
                        response = {}
                    else
                        response = JSON.parse(er) rescue {}
                    end
                    options = JSON.parse($redis.hget(reg_id, "options")) rescue nil
                    if !options.nil?
                        options = options["encrypt"] rescue nil
                    end
                    options = options.downcase rescue nil
                    if options == "true"
                        options = nil
                    end

                    case options.to_s
                    when "false"
                        response[:sip] = {
                            sip_credentials: sip_credentials, 
                            delete_token: delete_token.to_s
                        }
                        $redis.hset(reg_id, "response", response.to_json)
                        $redis.hset(reg_id, "status_code", 1000)
                        $redis.hset(reg_id, "status_text", "SIP credentials created")

                    when "jwe"
                        sip_credentials_jwe = {}
                        delete_token_jwe = {}
                        response[:sip] = {
                            sip_credentials: sip_credentials_jwe, 
                            delete_token: delete_token_jwe
                        }
                        $redis.hset(reg_id, "response", response.to_json)
                        $redis.hset(reg_id, "status_code", 1000)
                        $redis.hset(reg_id, "status_text", "SIP credentials created")

                    else
                        # encrypt SIP credentials
                        public_key = $redis.hget(reg_id, "public_key") rescue nil
                        did_info = Oydid.read(public_key, {}).first rescue nil
                        encryption_key = did_info["doc"]["doc"]["keyAgreement"].first["publicKeyMultibase"] rescue nil
                        sip_credentials_encrypted = Oydid.encrypt(sip_credentials.to_json, encryption_key).first rescue nil
                        delete_token_encrypted = Oydid.encrypt(delete_token, encryption_key).first rescue nil

                        if sip_credentials_encrypted.is_a?(Hash)
                            response[:sip_credentials] = sip_credentials_encrypted   # !!!deprecated: remove
                            response[:delete_token] = delete_token_encrypted         # !!!deprecated: remove
                            response[:sip] = {
                                sip_credentials: sip_credentials_encrypted, 
                                delete_token: delete_token
                            }
                            $redis.hset(reg_id, "response", response.to_json)
                            $redis.hset(reg_id, "status_code", 1000)
                            $redis.hset(reg_id, "status_text", "SIP credentials created")
                        else
                            $redis.hset(reg_id, "status_code", 9001)
                            $redis.hset(reg_id, "status_text", "SIP Plugin: error on creating SIP credentials")
                        end
                    end
                end
            end
        end
    end
end