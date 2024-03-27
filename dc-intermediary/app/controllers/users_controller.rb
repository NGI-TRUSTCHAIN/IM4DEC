class UsersController < ApplicationController
    include ApplicationHelper
    include IntermediaryHelper

    before_action -> { doorkeeper_authorize! :write }, only: [:create]
    before_action -> { doorkeeper_authorize! :write, :admin }, only: [:update, :delete]
    before_action -> { doorkeeper_authorize! :read, :write, :admin }, only: [:read, :wallet]

    def create
        data = params.except(:controller, :action, :user)
        org_id = data["organization-id"]

        if doorkeeper_org != org_id.to_s && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        if data["name"].to_s == ""
            render json: {"error": "invalid 'name'"},
                   status: 400
            return
        end
        if !data["meta"].nil?
            meta = data["meta"]
            data = data.except["meta"]
            meta["type"] = "user"
            meta["organization-id"] = doorkeeper_org
        else
            meta = {
                "type": "user",
                "organization-id": doorkeeper_org
            }
        end

        dri = Oydid.hash(Oydid.canonical({"content": data, "meta": meta}))
        @store = Store.find_by_dri(dri)
        if @store.nil?
            if org_id.to_s == ""
                render json: {"error": "missing 'organization-id'"},
                       status: 400
                return
            end
            @org = Store.find(org_id) rescue nil
            if @org.nil?
                render json: {"error": "invalid 'organization-id'"},
                       status: 400
                return
            end
            @store = Store.new(item: data.to_json, meta: meta.to_json, dri: dri, key: "user_" + org_id.to_s)
        else
            @store.key = "user_" + org_id.to_s
        end
        @store.save

        # create entry in Doorkeeper::Application
        @org = Store.find(org_id)
        @dk = Doorkeeper::Application.where(name: data["name"].to_s, organization_id: org_id).first rescue nil
        if @dk.nil?
            @dk = Doorkeeper::Application.new(
                name: data["name"].to_s, 
                organization_id: org_id, 
                scopes: "read write", 
                redirect_uri: 'urn:ietf:wg:oauth:2.0:oob')
            @dk.save
        end

        if !@dk.nil? && @dk.uid.to_s != ""
            retVal = {"user-id": @store.id, "name": data["name"].to_s, "organization-id": org_id, "oauth": {"client-id": @dk.uid.to_s, "client-secret": @dk.secret.to_s}}
            render json: retVal,
                   status: 200
        else
            render json: {"error": "cannot create user'"},
                   status: 500
        end

    end

    def update
        # input
        id = params[:id]
        data = params.permit!.except(:controller, :action, :user, :id).transform_keys(&:to_s)
        if !data["_json"].nil?
            data = data["_json"]
        end

        # validate
        @store = Store.find(id)
        if @store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        orig_data = @store.item
        meta = @store.meta
        if !(orig_data.is_a?(Hash) || orig_data.is_a?(Array))
            orig_data = JSON.parse(orig_data) rescue nil
        end
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        meta = meta.transform_keys(&:to_s)
        if meta["type"] != "user"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        org_id = meta["organization-id"].to_s
        meta_oauth = false
        data_meta_oauth = data["meta"]["oauth"].to_s rescue ""
        if data_meta_oauth != ""
            meta_oauth = true
            input_meta = data["meta"].except("oauth")
        end
        if !data["meta"].nil?
            if meta_oauth
                meta = meta.merge(input_meta)
            else
                meta = meta.merge(data["meta"])
            end
            data = data.except("meta")
        end
        if meta["organization-id"].to_s != doorkeeper_org.to_s && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        dri = Oydid.hash(Oydid.canonical({"content": data, "meta": meta}))
        if Store.find_by_dri(dri).nil?
            # update data
            @store.item = data.to_json
            @store.meta = meta.to_json
            @store.dri = dri
            if @store.save
                @dk = Doorkeeper::Application.where(name: orig_data["name"].to_s, organization_id: org_id).first rescue nil
                if @dk.nil?
                    render json: {"error": "cannot save update"},
                           status: 400
                    return
                else
                    @dk.name = data["name"].to_s 
                    @dk.organization_id = org_id
                    if meta_oauth
                        @dk.uid = SecureRandom.base58(43)
                        @dk.secret = SecureRandom.base58(43)
                    end
                    @dk.save
                end

                render json: {"user-id": @store.id, "name": data["name"].to_s, "oauth": {"client-id": @dk.uid.to_s, "client-secret": @dk.secret.to_s}},
                       status: 200
            else
                render json: {"error": "cannot save update"},
                       status: 400
            end
        else
            render json: {"info": "nothing updated"},
                   status: 204
        end  

    end

    def read
        id = params[:id]
        show_meta = params[:show_meta]
        @store = Store.find(id) rescue nil
        if @store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = @store.item
        meta = @store.meta
        if !(data.is_a?(Hash) || data.is_a?(Array))
            data = JSON.parse(data) rescue nil
        end
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        if meta["type"] != "user"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        org_id = meta["organization-id"]
        if doorkeeper_org != org_id.to_s && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end

        if show_meta.to_s == "TRUE"
            retVal = meta.merge({"dri" => @store.dri})
            retVal = retVal.merge({"created-at" => @store.created_at})
            retVal = retVal.merge({"updated-at" => @store.updated_at})
        else
            retVal = data
        end
        render json: retVal.merge({"user-id" => @store.id}),
               status: 200
    end

    def current
        id = nil
        @oauth = Doorkeeper::Application.find(doorkeeper_token.application_id)
        org_id = @oauth.organization_id
        user_name = @oauth.name
        Store.where(key: "user_" + org_id.to_s).each do |user|
            un = JSON.parse(user.item)["name"].to_s rescue ""
            del = JSON.parse(user.meta)["delete"].to_s.downcase rescue ""
            if un == user_name && del != "true"
                id = user.id
            end
        end
        show_meta = params[:show_meta]
        @store = Store.find(id) rescue nil
        if @store.nil?
            render json: {"error1": "not found"},
                   status: 404
            return
        end
        data = @store.item
        meta = @store.meta
        if !(data.is_a?(Hash) || data.is_a?(Array))
            data = JSON.parse(data) rescue nil
        end
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        if meta["type"] != "user"
            render json: {"error2": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error3": "not found"},
                   status: 404
            return
        end
        org_id = meta["organization-id"]
        if doorkeeper_org != org_id.to_s && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end

        if show_meta.to_s == "TRUE"
            retVal = meta.merge({"dri" => @store.dri})
            retVal = retVal.merge({"created-at" => @store.created_at})
            retVal = retVal.merge({"updated-at" => @store.updated_at})
        else
            retVal = data
        end
        render json: retVal.merge({"user-id" => @store.id}),
               status: 200
    end

    def wallet
        id = params[:id]
        @store = Store.find(id) rescue nil
        if @store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = @store.item
        meta = @store.meta
        if !(data.is_a?(Hash) || data.is_a?(Array))
            data = JSON.parse(data) rescue nil
        end
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        if meta["type"] != "user"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        org_id = meta["organization-id"]
        if doorkeeper_org != org_id.to_s && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        retVal = {"user-id": @store.id}
        @dk = Doorkeeper::Application.where(name: data["name"], organization_id: org_id)
        if @dk.length > 0
            @dk = @dk.first
            retVal["oauth"] = {"client-id": @dk.uid, "client-secret": @dk.secret}
        end
        if !meta["dlt"].nil?
            retVal["dlt"] = meta["dlt"]
        end
        # {
        #   "user-id": 1,
        #   "dlt": [
        #     {
        #       "type": "Convex",
        #       "network": "testnet",
        #       "address": 48,
        #       "public-key": "0x82AbBf6EBb20cB21dB02375270b9C2078c2e09e9D7C492be6439c61F23917022",
        #       "balance": 96816794
        #     }
        #   ]
        # }        
        render json: retVal,
               status: 200

    end

    def delete
        # input
        id = params[:id]

        # validate
        @store = Store.find(id)
        if @store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = @store.item
        meta = @store.meta
        if !(data.is_a?(Hash) || data.is_a?(Array))
            data = JSON.parse(data) rescue nil
        end
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        meta = meta.transform_keys(&:to_s)
        if meta["type"] != "user"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"].to_s != doorkeeper_org && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end

        meta = meta.merge("delete": true)
        @store.meta = meta.to_json
        @store.dri = nil
        if @store.save
            render json: {"user-id": @store.id, "name": data["name"].to_s},
                   status: 200
        else
            render json: {"error": "cannot delete"},
                   status: 400
        end

    end

end
