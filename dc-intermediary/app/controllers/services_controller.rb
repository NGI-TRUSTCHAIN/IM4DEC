class ServicesController < ApplicationController
    include ApplicationHelper
    include IntermediaryHelper
    include Pagy::Backend

    Hash.include CoreExtensions

    # [:page, :search, :read] have public access
    before_action -> { doorkeeper_authorize! :write }, only: [:create]
    before_action -> { doorkeeper_authorize! :write, :admin }, only: [:update, :delete]
    after_action { pagy_headers_merge(@pagy) if @pagy }

    def page
        # uses RFC-8288 compliant http response headers (and other helpers) useful for API pagination
        page = params[:page] || 1
        if page == "all"
            page = 1
            items = Store.count
        else
            items = params[:items] || 20
        end
        @records = Store.where(key: "service").select(:id, :item, :meta)
        retVal = []
        @records.each do |r|
            meta = r.meta
            if !(meta.is_a?(Hash) || meta.is_a?(Array))
                meta = JSON.parse(meta) rescue nil
            end
            if meta["delete"].nil? || !meta["delete"]
                data = r.item
                if !(data.is_a?(Hash) || data.is_a?(Array))
                    data = JSON.parse(data) rescue nil
                end                
                service_name = data.transform_keys(&:to_s)["interface"]["info"]["title"].to_s rescue ""
                if service_name.to_s == ""
                    retVal << {"service-id": r.id}
                else
                    retVal << {"service-id": r.id, "name": service_name}
                end
            end
        end
        if params[:sort].to_s == "name"
            retVal = retVal.sort_by { |r| r.transform_keys(&:to_s)["name"].to_s }
        end
        @pagy, @records = pagy_array(retVal, page: page, items: items)
        render json: @records,
               status: 200

    end

    def search
        query = params.except(:controller, :action, :service)
        @services = Store.where(key: "service")
        retVal = []
        query.each do |q|
            @services.each do |s|
                data = s.item
                if !(data.is_a?(Hash) || data.is_a?(Array))
                    data = JSON.parse(data) rescue nil
                end
                meta = s.meta
                if !(meta.is_a?(Hash) || meta.is_a?(Array))
                    meta = JSON.parse(meta) rescue nil
                end
                if meta["delete"].nil? || !meta["delete"]
                    if data.deep_find(q.first.to_s).to_s.downcase.include?(q.last.downcase)
                        service_name = data.transform_keys(&:to_s)["interface"]["info"]["title"].to_s rescue ""
                        retVal << {"service-id": s.id, "name": service_name}
                    end
                    if q.first.to_s == "name"
                        if data.deep_find("title").to_s.downcase.include?(q.last.downcase)
                            service_name = data.transform_keys(&:to_s)["interface"]["info"]["title"].to_s rescue ""
                            retVal << {"service-id": s.id, "name": service_name}
                        end
                    end
                end
            end     
        end
        render json: retVal.uniq,
               status: 200

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
        if meta["type"] != "service"
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
        render json: retVal.merge({"service-id" => @store.id}),
               status: 200
    end

    def create
        # input
        data = params.except(:controller, :action, :service)
        if !data["_json"].nil?
            data = data["_json"]
        end
        meta = {
            "type": "service",
            "organization-id": doorkeeper_org
        }
        dri = Oydid.hash(Oydid.canonical({"content": data, "meta": meta}))

        # validate

        # write
        @store = Store.find_by_dri(dri)
        if @store.nil?
            @store = Store.new(item: data.to_json, 
                               meta: meta.to_json, 
                               dri: dri,
                               key: "service")
            @store.save
        end
        service_name = data["interface"]["info"]["title"].to_s rescue nil
        if service_name.nil?
            retVal = {"service-id": @store.id}
        else
            retVal = {"service-id": @store.id, "name": service_name}
        end
        render json: retVal,
               status: 200

    end

    def update
        # input
        id = params[:id]
        data = params.permit!.except(:controller, :action, :service, :id).transform_keys(&:to_s)
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
        if meta["type"] != "service"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["delete"].to_s.downcase == "true"
            render json: {"error": "not found"},
                   status: 404
            return
        end
        if meta["organization-id"].to_s != doorkeeper_org
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
                render json: {"service-id": @store.id},
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
        if meta["type"] != "service"
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
            service_name = data["interface"]["info"]["title"].to_s rescue nil
            render json: {"service-id": @store.id, "name": service_name.to_s},
                   status: 200
        else
            render json: {"error": "cannot delete"},
                   status: 400
        end

    end

end
