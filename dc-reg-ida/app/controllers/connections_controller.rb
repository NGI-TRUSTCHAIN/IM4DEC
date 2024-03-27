class ConnectionsController < ApplicationController
    def oidc
        reg_id = nil
        begin

            puts "--Params------------"
            puts params.to_json
            puts "--------------------"

            code = params[:code]
            reg_id = params[:state]
            dec_client_id = ENV['DEC_CLIENT_ID'] || "https://idaustria.dec112.eu"
            dec_ida_url = ENV['DEC_IDA_URL'] || "https://idaustria.dec112.eu/connect"
            request_params = {
                :code =>          params[:code].to_s,
                :grant_type =>    "authorization_code",
                :client_id =>     dec_client_id,
                :client_secret => ENV['IDA_CLIENT_SECRET'].to_s,
                :redirect_uri =>  dec_ida_url
            }

puts "Request Params:"
puts JSON.pretty_generate(request_params)
puts "---------------"

            eid_endpoint = ENV['EID_ENDPOINT'] || "https://eid.oesterreich.gv.at/auth/idp/profile/oidc/token"
            response = HTTParty.post(eid_endpoint, query: request_params)

puts "Token Response:"
puts response.to_s
puts "---"
puts response.parsed_response.to_s
puts "==="

            decoded_token = JWT.decode response["id_token"], nil, false

            puts "--IDENTITY---------------"
            puts "Vorname: " + decoded_token.first["given_name"].to_s
            puts "Nachname: " + decoded_token.first["family_name"].to_s
            puts "Geburtsdatum: " + decoded_token.first["birthdate"].to_s
            puts "Adresse"
            puts Base64.decode64(decoded_token.first["urn:eidgvat:attributes.mainAddress"]).force_encoding('UTF-8').to_s
            puts "-----------------"
            # identity = {
            #     vorname: decoded_token.first["given_name"].to_s,
            #     nachname: decoded_token.first["family_name"].to_s,
            #     geburtsdatum: decoded_token.first["birthdate"].to_s,
            #     adresse: Base64.decode64(decoded_token.first["urn:eidgvat:attributes.mainAddress"])
            # }
            # rr = $redis.hset(reg_id, "Identity", identity.to_json)
            # Rails.logger.info("Redis response: " + rr.to_json)

            # create VC
            payload = {
                "id-austria-completed": Time.now.to_i,
                vorname: decoded_token.first["given_name"].to_s,
                nachname: decoded_token.first["family_name"].to_s,
                geburtsdatum: decoded_token.first["birthdate"].to_s,
                adresse: JSON.parse(Base64.decode64(decoded_token.first["urn:eidgvat:attributes.mainAddress"]).force_encoding('UTF-8')),
                "eid-issuing-nation": decoded_token.first["urn:pvpgvat:oidc.eid_issuing_nation"].to_s,
                "eid-signer-certificate": decoded_token.first["urn:pvpgvat:oidc.eid_signer_certificate"].to_s
            }

            # existing response?
            er = $redis.hget(reg_id, "response") rescue nil
            if er.nil?
                response = {}
            else
                response = JSON.parse(er) rescue {}
            end
            reg_options = JSON.parse($redis.hget(reg_id, "options")) rescue nil
            if !reg_options.nil?
                reg_options = reg_options["encrypt"] rescue nil
            end
            reg_options = reg_options.downcase rescue nil
            if reg_options == "true"
                reg_options = nil
            end
            case reg_options.to_s
            when "false"
                response[:id_austria] = payload

puts "Response-------"
puts JSON.pretty_generate(response)
puts "---"

                $redis.hset(reg_id, "response", response.to_json)

                # publish completion
                $redis.hset(reg_id, "status_code", 1200)
                $redis.hset(reg_id, "status_text", "ID_AUSTRIA verification passed")

            when "jwe"
                response[:id_austria] = {jwe: false}
                $redis.hset(reg_id, "response", response.to_json)

                # publish completion
                $redis.hset(reg_id, "status_code", 1200)
                $redis.hset(reg_id, "status_text", "ID_AUSTRIA verification passed")

            else
                options = {}
                public_key = $redis.hget(reg_id, "public_key") rescue nil
                options[:holder] = "did:oyd:" + public_key.to_s
                options[:issuer] = ENV["DID_ISSUER"]
                options[:issuer_privateKey] = Oydid.generate_private_key(ENV["ISSUER_PRIVATEKEY"], 'ed25519-priv', options).first
                vc, msg = Oydid.create_vc(payload.transform_keys(&:to_s), options)
                did_info = Oydid.read(public_key, {}).first rescue nil
                encryption_key = did_info["doc"]["doc"]["keyAgreement"].first["publicKeyMultibase"] rescue nil
                vc_encrypted = Oydid.encrypt(vc.to_json, encryption_key).first rescue nil
                if vc_encrypted.is_a?(Hash)
                    er = $redis.hget(reg_id, "response") rescue nil
                    if er.nil?
                        response = {}
                    else
                        response = JSON.parse(er) rescue {}
                    end
                    response[:id_austria] = {vc: vc_encrypted.transform_keys(&:to_s)} # includes deleting IDA-URL
                    $redis.hset(reg_id, "response", response.to_json)

                    # publish completion
                    $redis.hset(reg_id, "status_code", 1200)
                    $redis.hset(reg_id, "status_text", "ID_AUSTRIA verification passed")
                else
                    $redis.hdel(reg_id, "response")
                end
            end

            # check action after ID Austria verification is completed
            redirect_url = JSON.parse($redis.hget(reg_id, "options"))["redirect"] rescue nil
            if redirect_url.to_s != ""
                redirect_to redirect_url + "?reg_id=" + reg_id.to_s, allow_other_host: true
            else
                file_path = Rails.root.join('public', 'default_response.html')
                render html: File.read(file_path).html_safe, 
                       content_type: 'text/html', 
                       status: 200
                # render json: {"identification": "success"}, 
                #        status: 200
            end
        rescue Exception => e
            begin
                $redis.hset(reg_id, "status_code", 1203)
                $redis.hset(reg_id, "status_text", "ID_AUSTRIA Plugin: invalid response")
            rescue
                # do nothing
            end
            puts "ERROR"
            puts e.message.to_s
            render json: {"error": e.message.to_s},
                   status: 500
        end
    end
end