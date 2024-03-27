class CollectionsController < ApplicationController
    include ApplicationHelper
    include IntermediaryHelper
    include CollectionHelper

    before_action -> { doorkeeper_authorize! :admin }, only: [:get_access]
    before_action -> { doorkeeper_authorize! :write }, only: [:create, :create_access]
    before_action -> { doorkeeper_authorize! :write, :admin }, only: [:update, :delete, :delete_access]
    before_action -> { doorkeeper_authorize! :read, :write, :admin }, only: [:read, :list, :objects, :events, :read_event]

    def create
        data = params.permit!.except(:controller, :action, :collection).transform_keys(&:to_s)
        if !data["_json"].nil?
            data = data["_json"]
        end
        meta = {
            "type": "collection",
            "organization-id": doorkeeper_org,
            "delete": false
        }
        if !data["meta"].nil?
            meta = meta.merge(data["meta"])
            data = data.except("meta")
        end
        dri = Oydid.hash(Oydid.canonical({"content": data, "meta": meta}))
        @store = Store.find_by_dri(dri)
        if @store.nil?
            @store = Store.new(item: data.to_json, meta: meta.to_json, dri: dri, key: "col_" + doorkeeper_org)
            if @store.save
                createEvent(@store.id, CE_CREATE_COLLECTION, "create collection", {data: data, meta: meta})
                retVal = {"collection-id": @store.id, "name": data["name"].to_s}
                render json: retVal,
                       status: 200
            else
                render json: {"error": "cannot create collection"},
                       status: 500
            end
        else
            render json: {"info": "collection already exists"},
                   status: 201
        end
    end

    def update
        # input
        id = params.permit![:id]
        data = params.permit!.except(:controller, :action, :collection, :id).transform_keys(&:to_s)
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
        if !data["meta"].nil?
            meta = meta.merge(data["meta"])
            data = data.except("meta")
        end        
        if meta["type"] != "collection"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"] != doorkeeper_org
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
                createEvent(@store.id, CE_UPDATE_COLLECTION, "update collection", {data: data, meta: meta})
                render json: {"collection-id": @store.id},
                       status: 200
            else
                render json: {"error": "cannot update collection"},
                       status: 400
            end
        else
            render json: {"info": "collection not updated"},
                   status: 204
        end
    end

    def objects
        id = params[:id]
        @store = Store.find(id)
        if @store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = @store.item
        meta = @store.meta
        if !(data.is_a?(Hash) || data.is_a?(Array))
            data_json = JSON.parse(data) rescue nil
            if data_json.nil?
                data = JSON.parse(data.to_json) rescue nil
            else
                data = data_json
            end
        end
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        if meta["type"] != "collection"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"] != doorkeeper_org
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        @obj = Store.where(key: "object_" + id.to_s)
        retVal = []
        @obj.each do |r|
            obj_data = r.item
            if !obj_data.nil?
                if !(obj_data.is_a?(Hash) || obj_data.is_a?(Array))
                    obj_data = JSON.parse(obj_data) rescue nil
                end
                obj_meta = r.meta
                if !(obj_meta.is_a?(Hash) || obj_meta.is_a?(Array))
                    obj_meta = JSON.parse(obj_meta) rescue nil
                end
                if !obj_data.nil? && !obj_meta.nil?
                    if obj_meta["delete"].nil? || !obj_meta["delete"]
                        obj_name = obj_data["name"] rescue nil
                        if obj_name.to_s == ""
                            retVal << {"object-id": r.id}
                        else
                            retVal << {"object-id": r.id, "name": obj_name}
                        end
                    end
                end
            end
        end
        render json: retVal,
               status: 200
    end

    def read
        id = params[:id]
        show_meta = params[:show_meta]
        @store = Store.find(id)
        if @store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = @store.item
        meta = @store.meta
        if !(data.is_a?(Hash) || data.is_a?(Array))
            data_json = JSON.parse(data) rescue nil
            if data_json.nil?
                data = JSON.parse(data.to_json) rescue nil
            else
                data = data_json
            end
        end
        if !(meta.is_a?(Hash) || meta.is_a?(Array))
            meta = JSON.parse(meta) rescue nil
        end
        if meta["type"] != "collection"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"] != doorkeeper_org
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
        if retVal.is_a?(Array)
            retVal={"collection": retVal}
        end
        render json: retVal.merge({"collection-id" => @store.id}),
               status: 200
    end

    def list
        @store = Store.where(key: "col_" + doorkeeper_org)
        retVal = []
        @store.each do |r|
            data = r.item
            if !(data.is_a?(Hash) || data.is_a?(Array))
                data = JSON.parse(data) rescue nil
            end
            meta = r.meta
            if !(meta.is_a?(Hash) || meta.is_a?(Array))
                meta = JSON.parse(meta) rescue nil
            end
            if meta["delete"].nil? || !meta["delete"]
                col_name = data["name"] rescue nil
                if col_name.to_s == ""
                    retVal << {"collection-id": r.id}
                else
                    retVal << {"collection-id": r.id, "name": col_name}
                end
            end
        end
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
        if meta["type"] != "collection"
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
            createEvent(@store.id, CE_DELETE_COLLECTION, "delete collection", {name: data["name"].to_s})
            render json: {"collection-id": @store.id, "name": data["name"].to_s},
                   status: 200
        else
            render json: {"error": "cannot delete"},
                   status: 400
        end

    end

    def get_access
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
        if meta["type"] != "collection"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end

        result = []
        ca = CollectionAccess.where(collection_id: id)
        ca.each do |rec|
            result << { "collection-access-id": rec.id, 
                        "collection-id": id,
                        "organization-id": rec.organization_id,
                        "VerifiblePresentation-D3A": rec.data_agreement }
        end unless ca.nil?

        render json: result,
               status: 200
    end

    def create_access
        # input
        collection_id = params.permit!["id"]
        organization_id = doorkeeper_org
        d3a = params.permit!["VerifiablePresentation-D3A"]

        # validate collection
        @store = Store.find(collection_id)
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
        if meta["type"] != "collection"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end

        # validate Data Agreement and compliance
        begin
            response = HTTParty.get(d3a)
            if response.code != 200
                render json: {"error": "invalid data agreement"},
                       status: 400
                return
            end
        rescue => error
            render json: {"error": error.message.to_s},
                   status: 500
            return
        end

        # create Collection Access record
        @ca = CollectionAccess.new
        @ca.collection_id = collection_id.to_i
        @ca.organization_id = doorkeeper_org.to_i
        @ca.data_agreement = d3a
        @ca.save

        createEvent(collection_id, CE_ACCESS_COLLECTION, "create collection access", {organization_id: doorkeeper_org.to_i, data_agreement: d3a})

        render json: {"collection-access-id": @ca.id},
               status: 200
    end 

    def delete_access
        id = params.permit!["id"]
        @ca = CollectionAccess.find(id) rescue nil
        if @ca.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if @ca.organization_id != doorkeeper_org && doorkeeper_scope != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        if @ca.destroy
            createEvent(collection_id, CE_ACCESS_COLLECTION, "delete collection access", {organization_id: doorkeeper_org.to_i})
            render json: {"collection-access-id": id},
                   status: 200
        else
            render json: {"error": "cannot delete"},
                   status: 500
        end
    end 

    def events
        # !!! fix-me: include access management
        col_id = params.permit!["id"]
        @ce = CollectionEvent.where(collection_id: col_id)
        render json: @ce.select(:id, :event, :timestamp, 'collection_id AS "collection-id"', 'user_id AS "user-id"'),
               status: 200
    end

    def read_event
        # !!! fix-me: include access management
        id = params.permit!["id"]
        @ce = CollectionEvent.find(id) rescue nil
        if @ce.nil?
            render json: {"error": "not found"},
                   status: 404
        else
            render json: @ce.to_json,
                   status: 200
        end

    end

end
