class OrganizationsController < ApplicationController
    include ApplicationHelper
    include IntermediaryHelper

    before_action -> { doorkeeper_authorize! :admin }, only: [:create, :index]
    before_action -> { doorkeeper_authorize! :write, :admin }, only: [:update, :delete]
    before_action -> { doorkeeper_authorize! :read, :write, :admin }, only: [:read, :list]

    def create
        data = params.except(:controller, :action, :organization)
        if !data["_json"].nil?
            data = data["_json"]
        end
        meta = {
            "type": "organization"
        }
        dri = Oydid.hash(Oydid.canonical({"content": data, "meta": meta}))
        @store = Store.find_by_dri(dri)
        if @store.nil?
            @store = Store.new(item: data.to_json, meta: meta.to_json, dri: dri, key: "org")
            @store.save
        end
        org_id = @store.id
        org_name = data["name"].to_s

        # create admin user for organization
        @dk = Doorkeeper::Application.where(name: "admin", organization_id: org_id).first rescue nil
        if @dk.nil?
            @dk = Doorkeeper::Application.new(
                name: "admin", 
                organization_id: org_id, 
                scopes: "read write", 
                redirect_uri: 'urn:ietf:wg:oauth:2.0:oob')
            @dk.save
        end
        data = {"name": "admin"}
        meta = {
            "type": "user",
            "organization-id": org_id
        }
        dri = Oydid.hash(Oydid.canonical({"content": data, "meta": meta}))
        @store = Store.find_by_dri(dri)
        if @store.nil?
            @store = Store.new(item: data.to_json, meta: meta.to_json, dri: dri, key: "user_" + org_id.to_s)
            @store.save
        end

        retVal = {"organization-id": org_id, "name": org_name, "admin-user-id": @store.id}
        render json: retVal,
               status: 200
    end

    def index
        @orgs = Store.where(key: "org")
        retVal = []
        @orgs.each do |org|
            data = org.item
            if !(data.is_a?(Hash) || data.is_a?(Array))
                data = JSON.parse(data) rescue {}
            end
            meta = org.meta
            if !(meta.is_a?(Hash) || meta.is_a?(Array))
                meta = JSON.parse(meta) rescue {}
            end
            if meta["delete"].to_s.downcase != "true"
                retVal << {"organization-id": org.id, "name": data["name"].to_s}
            end
        end unless @orgs.nil?
        render json: retVal,
               status: 200

    end

    def read
        id = params[:id]
        if doorkeeper_org != id.to_s && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
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
        if meta["type"] != "organization"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if show_meta.to_s == "TRUE"
            retVal = meta.merge({"dri" => @store.dri})
            retVal = retVal.merge({"created-at" => @store.created_at})
            retVal = retVal.merge({"updated-at" => @store.updated_at})
        else
            retVal = data
        end
        render json: retVal.merge({"organization-id" => @store.id}),
               status: 200

    end

    def current
        @store = Store.find(doorkeeper_org) rescue nil?
        if @store.nil?
            render json: {"error": "user without organisation"},
                   status: 400
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
        if meta["type"] != "organization"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end

        render json: {"organization-id": @store.id, "name": data["name"].to_s},
               status: 200
    end

    def update
        # input
        id = params[:id]
        data = params.permit!.except(:controller, :action, :organization, :id).transform_keys(&:to_s)
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
        meta = @store.meta
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        meta = meta.transform_keys(&:to_s)
        if meta["type"] != "organization"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"] != doorkeeper_org && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        if !data["meta"].nil?
            meta = meta.merge(data["meta"])
            data = data.except("meta")
        end        

        dri = Oydid.hash(Oydid.canonical({"content": data, "meta": meta}))
        if Store.find_by_dri(dri).nil?
            # update data
            @store.item = data.to_json
            @store.meta = meta.to_json
            @store.dri = dri
            if @store.save
                render json: {"organization-id": @store.id, "name": data["name"].to_s},
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

    def delete
        # input
        id = params[:id]

        # validate
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
        meta = meta.transform_keys(&:to_s)
        if meta["type"] != "organization"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if @store.id.to_s != doorkeeper_org && doorkeeper_scope != "admin"
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

    def list
        id = params[:id]
        if doorkeeper_org != id.to_s && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        @store = Store.find(id) rescue nil
        if @store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        meta = @store.meta
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        if meta["type"] != "organization"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end

        @orgs = Store.where(key: "user_" + id.to_s)
        retVal = []
        @orgs.each do |org|
            data = org.item
            if !(data.is_a?(Hash) || data.is_a?(Array))
                data = JSON.parse(data) rescue {}
            end
            meta = org.meta
            if !(meta.is_a?(Hash) || meta.is_a?(Array))
                meta = JSON.parse(meta) rescue nil
            end
            if meta["delete"].nil? || meta["delete"].to_s.downcase != "true"
                retVal << {"user-id": org.id, "name": data["name"].to_s}
            end
        end unless @orgs.nil?
        render json: retVal,
               status: 200

    end
end
