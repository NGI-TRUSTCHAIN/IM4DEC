namespace :redis_listener do
    desc "Start Redis listener"
    task start: :environment do

        def matches_any?(string, regex_array)
            regex_array.any? { |regex| string =~ regex }
        end

        def convert_to_regex_array(string)
            # Extract all patterns between forward slashes
            patterns = string.scan(/\/(.*?)\//).flatten
            # Convert extracted patterns to Regexp objects
            patterns.map { |pattern| Regexp.new(pattern) }
        end

        CHANNEL_NAME = ENV["SMS_CHANNEL_NAME"] || 'sms'
        PRIVATE_KEY_SEED = ENV["PRIVATE_KEY_SEED"] || SecureRandom.base64(32)
        PUBLIC_KEY = Oydid.public_key(Oydid.generate_private_key(PRIVATE_KEY_SEED, 'ed25519-priv', {}).first, {}, 'x25519-pub').first
        CODE_STRUCTURE = ENV["SMS_CODE_STRUCTURE"] || '\d{8}'
        SMS_TEXT = JSON.parse(ENV["SMS_TEXT"]) || {"de":"Dein DEC112 Verifizierungs-Code ist: ", "en":"Your DEC112 verification code: "} rescue {"de":"Dein DEC112 Verifizierungs-Code ist: ", "en":"Your DEC112 verification code: "}
        DEFAULT_LANGUAGE = ENV["DEFAULT_LANGUAGE"] || "de"
        PHONE_NUMBER_VERIFICATION = convert_to_regex_array(ENV["PHONE_NUMBER_VERIFICATION"]) || [/^0043/] rescue [/^0043/]
        SMS_URL = ENV["SMS_SENDER_URL"] || "https://www.firmensms.at/gateway/senden.php"
        SMS_SEND_MAX_COUNT = ENV["SMS_SEND_MAX_COUNT"] || "3"
        SENDER = ENV["SMS_SENDER_NAME"] || "OwnYourData"

        Rails.logger = Logger.new(STDOUT)

        Rails.logger.info("starting to listen at '#{CHANNEL_NAME}'")
        puts "starting to listen at '#{CHANNEL_NAME}'"
        $redis.subscribe(CHANNEL_NAME) do |on|
            on.message do |channel, message|
                Rails.logger.info("Broadcast on channel #{channel}: #{message}")
                puts "Broadcast on channel #{channel}: #{message}"
                reg_id = message
                action = $redis.hget(reg_id, "action") rescue nil
                case action
                when "init", "resend"
                    continue = true
                    sms_send_count = $redis.hget(reg_id, "sms_send_count").to_i rescue nil
                    if sms_send_count.to_s == ""
                        sms_send_count = 0
                    end
                    sms_send_max_count = SMS_SEND_MAX_COUNT.to_i rescue 3
                    if sms_send_count >= sms_send_max_count
                        $redis.hset(reg_id, "status_code", 1107)
                        $redis.hset(reg_id, "status_text", "SMS Plugin: SMS resend limit (" + sms_send_max_count.to_s + ") reached")
                        continue = false
                    end
                    if continue
                        init_code = /#{CODE_STRUCTURE}/.generate
                        curr_lang = $redis.hget(reg_id, "lang") rescue DEFAULT_LANGUAGE
                        if curr_lang.to_s == ""
                            curr_lang = DEFAULT_LANGUAGE
                        end
                        sms_lang_text = SMS_TEXT.transform_keys(&:to_s)[curr_lang] rescue "Your DEC112 verification code: "
                        init_code_text = sms_lang_text.to_s + init_code.to_s
                        init_code_encrypted = Oydid.encrypt(init_code, PUBLIC_KEY).first.to_json rescue nil
                        if init_code_encrypted.nil?
                            $redis.hset(reg_id, "status_code", 1107)
                            $redis.hset(reg_id, "status_text", "SMS Plugin: internal error in SMS code handling")
                            continue = false
                        else
                            if ENV["EMAIL_TEST_MODE"].to_s.downcase == "true"
                                to = $redis.hget(reg_id, "email") rescue nil
                                if to.to_s != ""
                                    EventMailer.send_email(to, SENDER, init_code_text).deliver_now
                                    $redis.hset(reg_id, "sms_code", init_code_encrypted)
                                    $redis.hset(reg_id, "status_code", 1102)
                                    $redis.hset(reg_id, "status_text", "SMS Plugin: Email sent")
                                    $redis.hset(reg_id, "sms_send_count", sms_send_count+1)
                                    $redis.hset(reg_id, "sms_code_sent_to_user", Time.now.to_i)
                                    $redis.hset(reg_id, "sms_provider", "Email")
                                    $redis.hset(reg_id, "sms_phone_number", to)
                                    continue = false
                                end
                            end
                        end
                    end
                    if continue
                        to = $redis.hget(reg_id, "phone_number") rescue nil
                        if to.to_s == ""
                            $redis.hset(reg_id, "status_code", 1103)
                            $redis.hset(reg_id, "status_text", "SMS Plugin: cannot send SMS code")
                            continue = false
                        end
                    end
                    if continue
                        # temporary fix to support non-Austrian numbers
                        if to.start_with?('004300')
                            to = to[4..-1]
                        end
                        # temporary fix for invalid phone numbers - !!!remove after Feb24-Tests
                        if to.start_with?('00430')
                            to = '0043' + to[5..-1]
                        end

                        if !matches_any?(to, PHONE_NUMBER_VERIFICATION)
                            $redis.hset(reg_id, "status_code", 1108)
                            $redis.hset(reg_id, "status_text", "SMS Plugin: invalid phone number")
                            continue = false
                        end
                    end
                    if continue
                        body = "id=" + ENV["SMS_USER"].to_s
                        body += "&pass=" + ENV["SMS_PWD"].to_s
                        body += "&nummer=" + to.to_s
                        body += "&absender=" + SENDER.to_s
                        body += "&route=3"
                        body += "&text=" + init_code_text.to_s
                        response_nil = false
                        begin
                            Rails.logger.info(body.to_s)
                            response = HTTParty.post(SMS_URL, body: body )
                        rescue => ex
                            response_nil = true
                        end
                        if !response_nil && !response.body.nil? && response.code == 200
                            Rails.logger.info(response.parsed_response.to_json)
                            if response.parsed_response.to_s.downcase.start_with?("error")
                                $redis.hset(reg_id, "status_code", 1107)
                                $redis.hset(reg_id, "status_text", "SMS Plugin: internal error in SMS code handling")
                            else
                                $redis.hset(reg_id, "sms_code", init_code_encrypted)
                                $redis.hset(reg_id, "sms_send_count", sms_send_count+1)
                                $redis.hset(reg_id, "sms_code_sent_to_user", Time.now.to_i)
                                $redis.hset(reg_id, "sms_provider", SMS_URL)
                                $redis.hset(reg_id, "sms_phone_number", to)
                                $redis.hset(reg_id, "status_code", 1101)
                                $redis.hset(reg_id, "status_text", "SMS Plugin: SMS sent")
                            end
                        else
                            $redis.hset(reg_id, "status_code", 1107)
                            $redis.hset(reg_id, "status_text", "SMS Plugin: internal error in SMS code handling")
                        end
                    end

                when "SmsVerificationCode"
                    user_input = JSON.parse($redis.hget(reg_id, "payload")) rescue nil
                    if user_input.to_s == ""
                        $redis.hset(reg_id, "status_code", 1104)
                        $redis.hset(reg_id, "status_text", "SMS Plugin: invalid input for 'SmsVerificationCode'")
                    else
                        user_code = user_input["sms_code"] rescue nil
                        if user_code.to_s == ""
                            $redis.hset(reg_id, "status_code", 1105)
                            $redis.hset(reg_id, "status_text", "SMS Plugin: invalid input in 'SmsVerificationCode'")
                        else
                            init_code_encrypted = $redis.hget(reg_id, "sms_code") rescue nil
                            init_code = Oydid.decrypt(init_code_encrypted, Oydid.generate_private_key(PRIVATE_KEY_SEED, 'ed25519-priv', {}).first).first rescue nil
                            if init_code.nil?
                                $redis.hset(reg_id, "status_code", 1107)
                                $redis.hset(reg_id, "status_text", "SMS Plugin: internal error in SMS code handling")
                            else
                                if init_code != user_code
                                    $redis.hset(reg_id, "status_code", 1101)
                                    $redis.hset(reg_id, "status_text", "SMS Plugin: invalid SMS code provided")
                                else
                                    $redis.hset(reg_id, "status_code", 1100)
                                    $redis.hset(reg_id, "status_text", "SMS verification passed")

                                    # create VC
                                    payload = {
                                        "timestamp-code-sent-to-user": $redis.hget(reg_id, "sms_code_sent_to_user").to_i,
                                        "sms-provider": $redis.hget(reg_id, "sms_provider").to_s,
                                        "phone-number": $redis.hget(reg_id, "sms_phone_number").to_s,
                                        "timestamp-code-received-from-user": Time.now.to_i
                                    }
                                    # tsr_hash = Digest::SHA256.hexdigest(Oydid.canonical(payload))
                                    # command = "openssl ts -query -data "
                                    # command += '<(echo -n "' + tsr_hash + '") '
                                    # command += "-no_nonce -sha512 -cert 2>/dev/null | "
                                    # command += 'curl -s -H "Content-Type: application/timestamp-query" '
                                    # command += "--data-binary @- https://freetsa.org/tsr | base64 -w 0"
                                    # out, err, status = Open3.capture3("bash", "-c", command)
                                    # tsr_base64 = ""
                                    # if err == "" && status.to_i == 0
                                    #     tsr_base64 = out
                                    # end
                                    # payload["tsr_hash"] = tsr_hash
                                    # payload["tsr_base64"] = tsr_base64
                                    options = {}
                                    public_key = $redis.hget(reg_id, "public_key") rescue nil
                                    options[:holder] = "did:oyd:" + public_key.to_s
                                    options[:issuer] = ENV["DID_ISSUER"]
                                    options[:issuer_privateKey] = Oydid.generate_private_key(ENV["ISSUER_PRIVATEKEY"], 'ed25519-priv', options).first
                                    vc, msg = Oydid.create_vc(payload.transform_keys(&:to_s), options)

                                    # encrypt VC
                                    public_key = $redis.hget(reg_id, "public_key") rescue nil
                                    did_info = Oydid.read(public_key, {}).first rescue nil
                                    encryption_key = did_info["doc"]["doc"]["keyAgreement"].first["publicKeyMultibase"] rescue nil
                                    vc_encrypted = Oydid.encrypt(vc.to_json, encryption_key).first rescue nil
                                    if vc_encrypted.is_a?(Hash)
                                        # existing response?
                                        er = $redis.hget(reg_id, "response") rescue nil
                                        if er.nil?
                                            response = {}
                                        else
                                            response = JSON.parse(er) rescue {}
                                        end
                                        response[:vc_phonenumber] = vc_encrypted # !!!deprecated: remove
                                        response[:sms] = {vc: vc_encrypted}
                                        $redis.hset(reg_id, "response", response.to_json)
                                    end
                                end
                            end
                        end
                    end
                else
                    $redis.hset(reg_id, "status_code", 1110)
                    $redis.hset(reg_id, "status_text", "SMS Plugin: unknown action '" + action.to_s + "'" )

                end
            end
        end
    end
end