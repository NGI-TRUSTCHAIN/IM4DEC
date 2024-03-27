namespace :redis_listener do
    desc "Start Redis listener"
    task start: :environment do
        CHANNEL_NAME = 'id_austria'
        puts "starting to listen at '#{CHANNEL_NAME}'" 
        $redis.subscribe(CHANNEL_NAME) do |on|
            on.message do |channel, message|
                Rails.logger.info("Broadcast on channel #{channel}: #{message}")
                reg_id = message
                action = $redis.hget(reg_id, "action") rescue nil
                case action
                when "init"
                    service_url = ENV['IDA_SERVICE_URL'] || "https://eid.oesterreich.gv.at"
                    dec_ida_url = ENV['DEC_IDA_URL'] || "https://idaustria.dec112.eu/connect"
                    dec_client_id = ENV['DEC_CLIENT_ID'] || "https://idaustria.dec112.eu"
                    ida_url = service_url + "/auth/idp/profile/oidc/authorize?"
                    ida_url += "response_type=code&"
                    ida_url += "client_id=" + URI.encode_www_form_component(dec_client_id) + "&"
                    ida_url += "redirect_uri=" + URI.encode_www_form_component(dec_ida_url) + "&"
                    ida_url += "scope=openid+profile+eid&"
                    ida_url += "state=" + reg_id

                    er = $redis.hget(reg_id, "response") rescue nil
                    if er.nil?
                        response = {}
                    else
                        response = JSON.parse(er) rescue {}
                    end
                    response[:id_austria] = {ida_url: ida_url}
                    $redis.hset(reg_id, "response", response.to_json)
                    $redis.hset(reg_id, "status_code", 1200)
                    $redis.hset(reg_id, "status_text", "ID Austria URL generated")
                else
                    $redis.hset(reg_id, "status_code", 1202)
                    $redis.hset(reg_id, "status_text", "ID Austria Plugin: unknown action '" + action.to_s + "'" )
                end
            end
        end
    end
end