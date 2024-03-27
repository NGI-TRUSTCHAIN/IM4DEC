class ObjectsController < ApplicationController
    include ApplicationHelper
    include IntermediaryHelper
    include CollectionHelper
    include StorageHelper

    before_action -> { doorkeeper_authorize! :write, :admin }, only: [:create, :write, :update, :delete]
    before_action -> { doorkeeper_authorize! :read, :write, :admin }, only: [:read, :object, :access]

    def create
        data = params.permit!.except(:controller, :action, :object).transform_keys(&:to_s)
        if !data["_json"].nil?
            data = data["_json"]
        end
        meta = {
            "type": "object",
            "organization-id": doorkeeper_org,
            "delete": false
        }
        if !data["meta"].nil?
            meta = meta.merge(data["meta"])
            data = data.except("meta")
        end
        dri = Oydid.hash(Oydid.canonical({"data": data, "meta": meta}))
        col_id = data["collection-id"] rescue ""
        if col_id.to_s == ""
            col_id = meta["collection-id"] rescue ""
            if col_id.to_s == ""
                render json: {"error": "missing 'collection-id'"},
                       status: 400
                return
            else
                meta["collection-id"] = col_id.to_s
                data = data.except("collection-id")
            end
        else
            meta["collection-id"] = col_id.to_s
            data = data.except("collection-id")
        end
        # @col = Store.find(col_id) rescue nil
        col = getCollection(col_id)
        if col.nil?
            render json: {"error": "invalid 'collection-id'"},
                   status: 400
            return
        end
        col_meta = col[:meta]
        if col_meta["type"] != "collection"
            render json: {"error": "invalid 'collection-id'"},
                   status: 400
            return
        end
        if col_meta["organization-id"].to_s != doorkeeper_org.to_s
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end

        store = getStorage_by_dri(dri)
        # @store = Store.find_by_dri(dri)
        if store.nil?
            store = newStorage(col_id, data, meta, dri, "object_" + col_id.to_s)
            # @store = Store.new(item: data.to_json, meta: meta.to_json, dri: dri, key: "object_" + col_id.to_s)
            # @store.save
        end
        if store[:id].nil?
            render json: {"error": store[:error].to_s},
                   status: 500
        else
            createEvent(col_id, CE_CREATE_OBJECT, "create object", {object_id: store[:id], data: data, meta: meta})
            render json: {"object-id": store[:id], "collection-id": col_id},
                   status: 200
        end
    end

    def update
        # input
        id = params.permit![:id]
        data = params.permit!.except(:controller, :action, :object, :id).transform_keys(&:to_s)
        if !data["_json"].nil?
            data = data["_json"]
        end

        # checks
        # @store = Store.find(id)
        store = getStorage_by_id(id)
        if store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        meta = store[:meta]
        meta = meta.transform_keys(&:to_s)
        if meta["type"] != "object"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"].to_s != doorkeeper_org.to_s
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        if !data["meta"].nil?
            meta = {
                "type": "object",
                "organization-id": doorkeeper_org
            }
            meta = meta.merge(data["meta"])
            data = data.except("meta")
        end
        meta = meta.transform_keys(&:to_s)
        if !(data.is_a?(Hash) || data.is_a?(Array))
            json_data = JSON.parse(data) rescue nil
            if json_data.nil?
                data = JSON.parse(data.to_json) rescue nil
            else
                data = json_data
            end
        end
        col_id = data["collection-id"] rescue ""
        if col_id.to_s == ""
            col_id = meta["collection-id"] rescue ""
            if col_id.to_s == ""
                render json: {"error": "missing 'collection-id'"},
                       status: 400
                return
            else
                meta["collection-id"] = col_id.to_s
                data = data.except("collection-id")
            end
        end
        col = getCollection(col_id)
        if col.nil?
            render json: {"error": "invalid 'collection-id'"},
                   status: 400
            return
        end
        col_meta = col[:meta]
        if col_meta["type"] != "collection"
            render json: {"error": "invalid 'collection-id'"},
                   status: 400
            return
        end
        if col_meta["organization-id"].to_s != doorkeeper_org.to_s
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        dri = Oydid.hash(Oydid.canonical({"data": data, "meta": meta}))
        check_store = getStorage_by_dri(dri)
        if !check_store.nil?
            render json: {"object-id": check_store[:id], "collection-id": col_id, "info": "object already exists"},
                   status: 200
            return
        end

        # update data
        update_store = updateStorage(col_id, store[:id], data, meta, dri, "object_" + col_id.to_s)
        if update_store[:id].nil?
            if update_store[:error].to_s == ""
                render json: {"error": "cannot save update"},
                       status: 500
            else
                render json: {"error": update_store[:error]},
                       status: 500
            end
        else
            createEvent(col_id, CE_UPDATE_OBJECT, "update object", {object_id: store[:id], data: data, meta: meta})
            render json: {"object-id": store[:id], "collection-id": col_id},
                   status: 200
        end

    end

    def write
        # input
        id = params.permit![:id]
        payload = params.permit!.except(:controller, :action, :object, :id)
        if !payload["_json"].nil?
            payload = payload["_json"]
        end
        payload_dri = Oydid.hash(Oydid.canonical(payload.to_json))
        # @store = Store.find(id)
        store = getStorage_by_id(id)
        if store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end

        # validate
        data = store[:data].transform_keys(&:to_s) rescue store[:data]
        meta = store[:meta].transform_keys(&:to_s)
        if meta["type"] != "object"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"].to_s != doorkeeper_org.to_s
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        col_id = meta["collection-id"]

        # store payload
        pl_meta = {
            "type": "payload",
            "collection-id": col_id,
            "organization-id": doorkeeper_org
        }
        if data["payload"].to_s == ""
            pl = newStorage(col_id, payload, pl_meta, payload_dri, nil)
            # @pl = Store.new(item: payload.to_json, meta: pl_meta.to_json, dri: payload_dri)
        else
            pl = getStorage_by_dri(payload_dri)
            # @pl = Store.find_by_dri(payload_dri)
            if pl.nil?
                pl = newStorage(col_id, payload, pl_meta, payload_dri, nil)
            else
                pl = updateStorage(col_id, pl[:id], payload, pl_meta, payload_dri, nil)
            end
        end
        if pl[:id].nil?
            if pl[:error].to_s == ""
                render json: {"error": "cannot save payload"},
                       status: 500
            else
                render json: {"error": pl[:error]},
                       status: 500
            end
        else
            data["payload"] = payload_dri
            dri = Oydid.hash(Oydid.canonical({"data": data, "meta": meta}))
            update_store = updateStorage(col_id, store[:id], data, meta, dri, "object_" + col_id.to_s)
            if update_store[:id].nil?
                if update_store[:error].to_s == ""
                    render json: {"error": "cannot save update to payload"},
                           status: 500
                else
                    render json: {"error": update_store[:error]},
                           status: 500
                end
            else
                createEvent(col_id, CE_WRITE_PAYLOAD, "write payload", {object_id: store[:id], payload_dri: payload_dri, payload: payload})
                render json: {"object-id": store[:id], "collection-id": col_id},
                       status: 200
            end
        end
    end

    def read
        id = params[:id]
        show_meta = params[:show_meta]
        # @store = Store.find(id)
        store = getStorage_by_id(id)
        if store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = store[:data]
        if data.is_a?(Hash)
            data = data.transform_keys(&:to_s)
        end
        meta = store[:meta]
        if meta.is_a?(Hash)
            meta = meta.transform_keys(&:to_s)
        end
        if meta["type"] != "object"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"].to_s != doorkeeper_org.to_s
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        store = store.transform_keys(&:to_s)
        if show_meta.to_s == "TRUE"
            retVal = meta.merge({"dri" => store["dri"]})
            retVal = retVal.merge({"created-at" => store["created-at"]})
            retVal = retVal.merge({"updated-at" => store["updated-at"]})
        else
            retVal = data
        end
        createEvent(col_id, CE_READ_OBJECT, "read object", {object_id: store["id"], read_meta: (show_meta.to_s == "TRUE")})
        render json: retVal.merge({"object-id" => store["id"]}),
               status: 200
    end

    def access
        obj_id = params.permit![:object_id]
        user_id = params.permit![:user_id]
        obj = getStorage_by_id(obj_id)
        # @obj = Store.find(obj_id)
        user = getStorage_by_id(user_id)
        # @user = Store.find(user_id)
        if obj.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if user.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        obj_data = obj[:data].transform_keys(&:to_s)
        obj_meta = obj[:meta].transform_keys(&:to_s)
        if obj_meta["type"] != "object"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if obj_meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        user_data = user[:data].transform_keys(&:to_s)
        user_meta = user[:meta].transform_keys(&:to_s)
        if user_meta["type"] != "user"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if user_meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        retVal = {
          "object-id": obj_id,
          "collection-id": user_id,
          "name": obj_data["name"].to_s,
          "access": true
        }
        status_code = 200
        if user_meta["organization-id"].to_s != doorkeeper_org.to_s
            retVal = {
              "object-id": obj_id,
              "collection-id": user_id,
              "access": false
            }
            status_code = 401
        end
        if obj_meta["organization-id"].to_s != doorkeeper_org.to_s
            retVal = {
              "object-id": obj_id,
              "collection-id": user_id,
              "access": false
            }
            status_code = 401
        end
        render json: retVal,
               status: status_code

    end

    def object
        id = params[:id]
        store = getStorage_by_id(id)
        # @store = Store.find(id)
        if store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = store[:data].transform_keys(&:to_s)
        meta = store[:meta].transform_keys(&:to_s)
        if meta["type"] != "object"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"].to_s != doorkeeper_org.to_s
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        payload_dri = data["payload"].to_s
        if payload_dri == ""
            render json: {"error": "no payload attached to object"},
                   status: 400
            return
        end
        pl = getStorage_by_dri(payload_dri)
        # @pl = Store.find_by_dri(payload_dri)
        if pl.nil?
            render json: {"error": "no payload attached to object"},
                   status: 404
            return
        end
        payload = pl[:data]
        createEvent(meta["collection-id"], CE_READ_PAYLOAD, "read payload", {object_id: id, payload_dri: payload_dri})

        render json: payload,
               status: 200
    end

    # meta data for object
    def objmet
        id = params[:id]
        store = getStorage_by_id(id)
        # @store = Store.find(id)
        if store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = store[:data]
        if data.is_a?(Hash)
            data = data.transform_keys(&:to_s)
        end
        meta = store[:meta]
        if meta.is_a?(Hash)
            meta = meta.transform_keys(&:to_s)
        end
        if meta["type"] != "object"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"].to_s != doorkeeper_org.to_s
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end
        payload_dri = data["payload"].to_s
        if payload_dri == ""
            render json: {"error": "no payload attached to object"},
                   status: 400
            return
        end
        pl = getStorage_by_dri(payload_dri)
        # @pl = Store.find_by_dri(payload_dri)
        if pl.nil?
            render json: {"error": "no payload meta data attached to object"},
                   status: 404
            return
        end
        render json: pl[:meta],
               status: 200
    end

    def delete
        # input
        id = params[:id]

        # validate
        store = getStorage_by_id(id)
        # @store = Store.find(id)
        if store.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end
        data = store[:data].transform_keys(&:to_s)
        meta = store[:meta].transform_keys(&:to_s)
        if meta["type"] != "object"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"].to_s != doorkeeper_org.to_s && doorkeeper_scope.to_s != "admin"
            render json: {"error": "Not authorized"},
                   status: 401
            return
        end

        meta = meta.merge("delete": true)
        col_id = meta["collection-id"]
        update_store = updateStorage(col_id, store[:id], data, meta, nil, nil)
        if update_store[:id].nil?
            if update_store[:error].to_s == ""
                render json: {"error": "cannot delete"},
                       status: 500
            else
                render json: {"error": update_store[:error]},
                       status: 500
            end
        else
            createEvent(col_id, CE_DELETE_OBJECT, "delete object", {object_id: id})
            render json: {"object-id": store[:id], "collection-id": col_id},
                   status: 200
        end
    end
end
