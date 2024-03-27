module StorageHelper
    def getStorage_by_id(id)
        @store = Store.find(id) rescue nil
        if @store.nil?
            return nil
        else
            id = @store.id.to_s
            if !(@store.item.is_a?(Hash) || @store.item.is_a?(Array))
                data = JSON.parse(@store.item) rescue {}
            else
                data = @store.item
            end
            if !(@store.meta.is_a?(Hash) || @store.meta.is_a?(Array))
                meta = JSON.parse(@store.meta) rescue {}
            else
                meta = @store.meta
            end
            return {"id": id, "data": data, "meta": meta, "dri": @store.dri, "created-at": @store.created_at, "updated-at": @store.updated_at}
        end
    end

    def getStorage_by_dri(dri)
        @store = Store.where(dri: dri).order(id: :asc).last rescue nil
        if @store.nil?
            return nil
        else
            id = @store.id.to_s
            if !(@store.item.is_a?(Hash) || @store.item.is_a?(Array))
                data = JSON.parse(@store.item) rescue {}
            else
                data = @store.item
            end
            if !(@store.meta.is_a?(Hash) || @store.meta.is_a?(Array))
                meta = JSON.parse(@store.meta) rescue {}
            else
                meta = @store.meta
            end
            if meta["type"] == "payload"
                col = getCollection(meta["collection-id"])
                col_data = col[:data].transform_keys(&:to_s)
                off_chain_storage = col_data["storage"]["type"] rescue ""
                on_chain_storage = col_data["dlt"]["type"] rescue ""
                case off_chain_storage
                when "Semantic Container"
                    semcon_url = col_data["storage"]["url"]
                    response = HTTParty.get(semcon_url + "/api/data?dri=" + meta["storage-response"]["dri"].to_s)
                    if response.code.to_s != "200"
                        errors = response["error"]
                    else
                        data = response.parsed_response["data"] rescue {}
                    end
                when "AWS"
                    if meta["storage-response"].nil?
                        data = nil
                    else
                        bucket_name = meta["storage-response"]["bucket"] || 'ontochain'
                        object_key = meta["storage-response"]["object"]
                        uploader = S3JsonUploader.new(bucket_name)
                        retVal = uploader.download(object_key)
                        data = retVal["data"]
                        if !(data.is_a?(Hash) || data.is_a?(Array))
                            data = JSON.parse(data) rescue {}
                        end
                    end
                end
            end

            return {"id": id, "data": data, "meta": meta, "dri": @store.dri, "created-at": @store.created_at, "updated-at": @store.updated_at}
        end
    end

    def newStorage(col_id, data, meta, dri, key)
        col = getCollection(col_id)
        if col.nil?
            return {"id":nil, "error": "invalid collection-id: " + col_id.to_s}
        end
        col_data = col[:data].transform_keys(&:to_s)
        off_chain_storage = col_data["storage"]["type"] rescue ""
        on_chain_storage = col_data["dlt"]["type"] rescue ""
        if meta.nil?
            meta = {}
        end
        meta = meta.transform_keys(&:to_s)
        @store = Store.new(dri: dri, key: key)
        @store.save
        id = @store.id

        if meta["type"] == "object"
            off_chain_storage = ""
            on_chain_storage = ""
        end
        case on_chain_storage
        when "Bellecour"
            payload = '{"id":"' + id.to_s + '","dri":"' + dri.to_s + '"}'
            meta = storage_Bellecour(payload, meta)
        when "Convex"
            payload = "id:" + id.to_s + ",dri:" + dri.to_s
            meta = storage_Convex(payload, meta)
        end
        errors = nil
        id = nil
        case off_chain_storage
        when "Semantic Container"
            semcon_url = col_data["storage"]["url"]
            @store.meta = meta.to_json
            if @store.save
                id = @store.id.to_s

                response = HTTParty.post(semcon_url + "/api/data",
                    headers: { 'Content-Type' => 'application/json' },
                    body: {"data": data, "meta": meta}.to_json)
                if response.code.to_s != "200"
                    errors = response["error"]
                else
                    meta["storage-response"] = response.parsed_response
                    meta["storage-response"]["semcon_url"] = semcon_url
                    @store.meta = meta.to_json
                    if !@store.save
                        id = nil
                        errors = @store.errors
                    end
                end
            else
                errors = @store.errors
            end

        when "AWS"
            # store locally
            @store.meta = meta.to_json
            if @store.save
                id = @store.id.to_s
                # write to AWS
                bucket_name = ENV["AWS_S3_BUCKET"] || 'ontochain'
                object_key = dri.to_s + '.json'
                json_object = { id: id, data: data, meta: meta, dri: dri }
                uploader = S3JsonUploader.new(bucket_name)
                uploader.upload(json_object, object_key)
                meta["storage-response"] = {
                    "bucket" => bucket_name,
                    "object" => object_key
                }
                @store.meta = meta.to_json
                if !@store.save
                    id = nil
                    errors = @store.errors
                end
            else
                errors = @store.errors
            end
        else
            @store.item = data.to_json
            @store.meta = meta.to_json
            if @store.save
                id = @store.id.to_s
            else
                errors = @store.errors
            end
        end

        if id.nil?
            return {"error": errors, "id": nil}
        else
            return {"id": id.to_s}
        end
    end

    def updateStorage(col_id, id, data, meta, dri, key)
        @store = Store.find(id)
        col = getCollection(col_id)
        if col.nil?
            return {"id":nil, "error": "invalid collection-id: " + col_id.to_s}
        end
        col_data = col[:data].transform_keys(&:to_s)
        off_chain_storage = col_data["storage"]["type"] rescue ""
        on_chain_storage = col_data["dlt"]["type"] rescue ""
        if meta.nil?
            meta = {}
        end
        meta = meta.transform_keys(&:to_s)
        if meta["type"] == "object"
            off_chain_storage = ""
            on_chain_storage = ""
        end

        case on_chain_storage
        when "Bellecour"
            payload = '{"id":"' + id.to_s + '","dri":"' + dri.to_s + '"}'
            meta = storage_Bellecour(payload, meta)
        when "Convex"
            payload = "id:" + id.to_s + ",dri:" + dri.to_s
            meta = storage_Convex(payload, meta)
        end

        errors = nil
        id = nil
        case off_chain_storage
        when "Semantic Container"
            semcon_url = col_data["storage"]["url"]
            @store.meta = meta.to_json
            @store.dri = dri
            @store.key = key
            if @store.save
                id = @store.id.to_s
                response = HTTParty.post(semcon_url + "/api/data",
                    headers: { 'Content-Type' => 'application/json' },
                    body: {"data": data, "meta": meta}.to_json)
                if response.code.to_s != "200"
                    errors = response["error"]
                else
                    meta["storage-response"] = response.parsed_response
                    meta["storage-response"]["semcon_url"] = semcon_url
                    @store.meta = meta.to_json
                    if !@store.save
                        id = nil
                        errors = @store.errors
                    end
                end
            else
                errors = @store.errors
            end
        when "AWS"
            # store locally
            @store.meta = meta.to_json
            @store.dri = dri
            @store.key = key
            if @store.save
                id = @store.id.to_s
                # write to AWS
                bucket_name = ENV["AWS_S3_BUCKET"] || 'ontochain'
                object_key = dri.to_s + '.json'
                json_object = { id: id, data: data, meta: meta, dri: dri }
                uploader = S3JsonUploader.new(bucket_name)
                uploader.upload(json_object, object_key)
                meta["storage-response"] = {
                    "bucket" => bucket_name,
                    "object" => object_key
                }
                @store.meta = meta.to_json
                if !@store.save
                    id = nil
                    errors = @store.errors
                end
            else
                errors = @store.errors
            end
        else
            @store.item = data.to_json
            @store.meta = meta.to_json
            @store.dri = dri
            @store.key = key
            if @store.save
                id = @store.id.to_s
            else
                errors = @store.errors
            end
        end
        if id.nil?
            return {"error": errors, "id": nil}
        else
            return {"id": id.to_s}
        end
    end

    def storage_Bellecour(payload, meta)
        config_chain_url = ENV["CHAIN_URL"] || "https://bellecour.iex.ec"
        config_contract_address = ENV["CONTRACT_ADDRESS"] || "0xF31A125fb44E0c2dca45c2665F272e9fc09f92AE"
        file_path = Rails.root.join('lib', 'contract_abi.json')
        config_contract_abi = ENV["CONTRACT_ABI"] || File.read(file_path)
        config_contract_function = ENV["CONTRACT_FUNCTION"] || "StoreInLogs"
        config_payload = payload.to_json
        config_private_key = ENV["BELLECOUR_PRIVATE_KEY"]

        file_path = Rails.root.join('lib', 'contract.js')
        content = File.read(file_path)
        content = content.gsub("$CHAIN_URL", config_chain_url.to_s)
        content = content.gsub("$CONTRACT_ADDRESS", config_contract_address.to_s)
        content = content.gsub("$CONTRACT_ABI", config_contract_abi.to_s)
        content = content.gsub("$CONTRACT_FUNCTION", config_contract_function.to_s)
        content = content.gsub("$PAYLOAD", config_payload.to_s)
        content = content.gsub("$PRIVATE_KEY", config_private_key.to_s)

        require 'open3'
        cmd = "npm i web3@1.10.0 && echo '" + content + "' | node "
        out = nil
        exit_status = nil
        Open3.popen3(cmd) {|stdin, stdout, stderr, wait_thr|
          pid = wait_thr.pid # pid of the started process.
          out = stdout.gets(nil)
          exit_status = wait_thr.value # Process::Status object returned.
        }
        txhash = out.match(/transactionHash: '([^']+)'/)[1] rescue nil
        if !txhash.nil?
            meta["dlt-response"] = {"bellecour-txhash": txhash}
        end

        return meta
    end

    def storage_Convex(payload, meta)
        convex = true
        # get Convex data from current user
        @user = Store.find(doorkeeper_user)
        user_meta = @user.meta
        if !(user_meta.is_a?(Hash) || user_meta.is_a?(Array))
            user_meta = JSON.parse(user_meta) rescue nil
        end
        if user_meta["dlt"].nil?
            convex = false
        end
        account_address = ""
        seed = ""
        raw_key = nil
        target_url = ""
        notary_service_name = ""
        if convex
            convex = false
            user_meta["dlt"].each do |item|
                if item["type"] == "Convex"
                    account_address = item["account"]
                    seed = item["seed"]
                    raw_key = Ed25519::SigningKey.new([seed].pack('H*'))
                    target_url = item["convex-url"].to_s rescue ""
                    notary_service_name = item["deployed-function"].to_s rescue ""
                    convex = true
                end
            end
        end
        if convex
            response = HTTParty.get("https://convex.world/api/v1/accounts/" + account_address)
            account_key = response.parsed_response["accountKey"]
            if target_url == ""
                target_url = "https://convex.world/api/v1/transaction/"
            end
            if notary_service_name == ""
                notary_service_name = "n"
            end

            storage_hash = Digest::SHA2.hexdigest payload
            convex_payload = {}
            convex_payload[:address] = account_address
            convex_payload[:source] = "(def id (call " + notary_service_name + " (add-document 0x" + storage_hash + ")))"
            response = HTTParty.post(target_url + "prepare",
                headers: { 'Content-Type' => 'application/json' },
                body: convex_payload.to_json)
            signed_hash = raw_key.sign([response["hash"]].pack('H*')).unpack("H*").first
            submit_payload = {}
            submit_payload[:address] = account_address
            submit_payload[:accountKey] = account_key
            submit_payload[:hash] = response["hash"]
            submit_payload[:sig] = signed_hash
            submit_response = HTTParty.post(target_url + "submit",
                headers: { 'Content-Type' => 'application/json' },
                body: submit_payload.to_json)
            if !submit_response["value"].nil?
                meta["dlt-response"] = {"convex-sequence": submit_response["value"].to_s, "convex-account": account_address, "storage-hash": storage_hash}
            end
        end
        return meta
    end
end
