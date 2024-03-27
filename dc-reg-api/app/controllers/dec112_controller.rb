class Dec112Controller < ApplicationController
    include ApplicationHelper

    def doorkeeper_unauthorized_render_options(error: nil)
        { json: { error: "Not authorized" } }
    end

    if !(ENV["AUTH"].to_s == "" || ENV["AUTH"].to_s.downcase == "false")
        before_action -> { doorkeeper_authorize! :read, :write, :admin }, except: [:info, :root]
    end

    def info
        render json: {"info": "active"},
               status: 200
    end

    def root
        ci = Store.where(schema: CONFIG_ITEM_SCHEMA)
        retVal = nil
        ci.each do |el|
            item = el.item
            if item.is_a?(String)
                item = JSON.parse(item) rescue {}
            end
            if item["key"] == "root"
                retVal = JSON.parse(item["value"]) rescue {}
            end
        end
        render json: retVal,
               status: 200
    end

    def user
        ci = Store.where(schema: CONFIG_ITEM_SCHEMA)
        retVal = nil
        ci.each do |el|
            item = el.item
            if item.is_a?(String)
                item = JSON.parse(item) rescue {}
            end
            if item["key"] == "user"
                retVal = JSON.parse(item["value"]) rescue {}
            end
        end
        render json: retVal,
               status: 200
    end

    def create

        # Input data ------------------
        data = params.permit!.except(:controller, :action, :dec112).transform_keys(&:to_s)
        if !data["_json"].nil?
            data = data["_json"]
        end

        options = {}
        reg_id       = data["header"]["reg_id"] rescue ""
        reg_method   = data["header"]["method"].to_s rescue ""
        action       = data["header"]["action"].to_s rescue ""
        phone_number = data["payload"]["phone_number"].to_s rescue ""
        email        = data["payload"]["email"].to_s rescue ""
        model        = data["payload"]["model"].to_s rescue ""
        lang         = data["payload"]["lang"].to_s rescue "de"
        purpose      = data["payload"]["purpose"].to_s rescue ""
        application  = data["payload"]["application"].to_s rescue ""
        options      = data["payload"]["options"] rescue {}
        public_key   = Doorkeeper::AccessToken.find_by_token(doorkeeper_token.token).public_key rescue nil
        if public_key.nil?
            did = data["payload"]["did"].to_s
            did_info, msg = Oydid.read(did, {})
            if did_info.nil?
                render json: {"error": "cannot resolve DID"},
                       status: 401
                return
            end
            if did_info["error"] != 0
                render json: {"error": did_info["message"].to_s},
                       status: 401
                return
            end
            public_key = did_info["doc"]["key"].split(":")[0].to_s
        end


        # Validation ------------------
        if reg_method == ""
            render json: {"error": "invalid input: missing 'method'"},
                   status: 412
            return
        end
        if action == ""
            render json: {"error": "invalid input: missing 'action'"},
                   status: 412
            return
        end
        if request.post? && reg_id.to_s != ""
            render json: {"error": "must not provide reg_id in POST"},
                   status: 412
            return
        end

        # build Registration Object ---
        reg_object = {}
        case action
        when "init", "new_number"
            if reg_id.to_s == ""
                reg_id = SecureRandom.uuid
            end
            reg_object = $redis.hgetall(reg_id)
            if reg_object.nil? or reg_object == {}
                if options.to_s == ""
                    options = {}
                end
                reg_object = {
                    "public_key": public_key,
                    "phone_number": phone_number,
                    "email": email,
                    "model": model,
                    "lang": lang,
                    "method": reg_method,
                    "action": action,
                    "purpose": purpose,
                    "application": application,
                    "options": options.to_json,
                    "status_code": 1001,
                    "status_text": "initial"
                }
                $redis.hmset(reg_id, reg_object.flat_map { |k, v| [k, v] })
            else
                # check if token matches stroed public_key
                stored_pubkey = $redis.hget(reg_id, "public_key") rescue nil
                if stored_pubkey.to_s != public_key
                    render json: {"error": "invalid access token for provided reg_id"},
                           status: 403
                    return
                end
            end
        else
            reg_object = $redis.hgetall(reg_id)
            if reg_object.nil? or reg_object == {}
                render json: {"error": "invalid input: missing or unknown 'reg_id'"},
                       status: 412
                return
            end

            # check if token matches stroed public_key
            stored_pubkey = $redis.hget(reg_id, "public_key") rescue nil
            if stored_pubkey.to_s != public_key
                render json: {"error": "invalid access token for provided reg_id"},
                       status: 403
                return
            end

            $redis.hset(reg_id, "action", action)
            $redis.hset(reg_id, "payload", data["payload"].to_json)
            # existing options?
            opt = $redis.hget(reg_id, "options") rescue nil
            if options.nil?
                options = {}
            end
            if opt.nil?
                opt = {}
            else
                opt = JSON.parse(opt) rescue {}
            end
            options = options.merge(opt) rescue {}
            $redis.hset(reg_id, "options", options.to_json)
            reg_object = $redis.hgetall(reg_id)
        end

        # publish to channel
        rr = $redis.publish(reg_method, reg_id)
        if rr.to_s == "0"
            render json: {"error": "no listener on channel '" + reg_method + "'"},
                   status: 500
            return
        end
        case action
        when "init"
            $redis.hset(reg_id, "status_code", 1002)
            $redis.hset(reg_id, "status_text", reg_method.upcase + " plugin triggered")
        else
            $redis.hset(reg_id, "status_code", 1003)
            $redis.hset(reg_id, "status_text", action + " received, " + reg_method.upcase + " plugin triggered")
        end

        sleep(ACTION_WAIT)
        # compile return value
        retVal = { "reg_id": reg_id }
        status_code = $redis.hget(reg_id, "status_code").to_i rescue 0
        status_text = $redis.hget(reg_id, "status_text") rescue ""
        retVal["status"] = status_code
        if status_text.to_s != ""
            retVal["status_text"] = status_text
        end
        response = JSON.parse($redis.hget(reg_id, "response")) rescue nil
        if response.to_s != ""
            retVal = retVal.merge(response)
        end

        render json: retVal,
               status: 200
    end

    def read
        reg_id = params.permit![:reg_id]
        status_code = $redis.hget(reg_id, "status_code") rescue ""
        status_text = $redis.hget(reg_id, "status_text") rescue ""
        if status_code.to_s == ""
            render json: {"error": "invalid 'reg_id'"},
                   status: 400
            return
        end
        public_key = Doorkeeper::AccessToken.find_by_token(doorkeeper_token.token).public_key rescue nil
        reg_id_public_key = $redis.hget(reg_id, "public_key") rescue nil
        if public_key != reg_id_public_key && !public_key.nil?
            render json: {"error": "invalid 'reg_id'"},
                   status: 400
            return
        end

        # publish to 'sip'channel
        if status_text.end_with?("verification passed")
            rr = $redis.publish("sip", reg_id)
            if rr.to_s == "0"
                render json: {"error": "no listener on channel 'sip'"},
                       status: 500
                return
            else
                $redis.hset(reg_id, "status_code", 1002)
                $redis.hset(reg_id, "status_text", "SIP plugin triggered")
                sleep(ACTION_WAIT) # allow the SIP plugin to finish the request
            end
        end

        # compile return value
        retVal = { "reg_id": reg_id }
        status_code = $redis.hget(reg_id, "status_code").to_i rescue 0
        status_text = $redis.hget(reg_id, "status_text") rescue ""
        retVal["status"] = status_code
        if status_text.to_s != ""
            retVal["status_text"] = status_text
        end
        response = JSON.parse($redis.hget(reg_id, "response")) rescue nil
        if response.to_s != ""
            retVal = retVal.merge(response)
        end

        render json: retVal,
               status: 200
    end

    def delete
        reg_id = params.permit![:reg_id]
        status_code = $redis.hget(reg_id, "status_code") rescue ""
        if status_code.to_s == ""
            render json: {"error": "invalid 'reg_id'"},
                   status: 400
            return
        end
        public_key = Doorkeeper::AccessToken.find_by_token(doorkeeper_token.token).public_key rescue nil
        reg_id_public_key = $redis.hget(reg_id, "public_key") rescue nil
        if public_key != reg_id_public_key && !public_key.nil?
            render json: {"error": "invalid 'reg_id'"},
                   status: 400
            return
        end

        begin
            $redis.del(reg_id)
        rescue Error => e
            render json: {"error": e.message},
                   status: 500
            return
        end
        
        retVal = { "reg_id": reg_id, "status": 1004, "status_text": "REG_ID removed" }
        render json: retVal,
               status: 200
    end

end