module Api
    module V1
        class StoresController < ApiController

            def write
                render json: {"error": "not available"},
                       status: 500
                return
            end

            def read
                dri = params[:dri].to_s

                if dri == ""
                    render json: {"error": "only 'dri' supported"},
                           status: 500
                    return
                end
                @store = Store.find_by_dri(dri)
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
                if meta["delete"].to_s.downcase == "true"
                    render json: {"error": "not found"},
                           status: 404
                    return
                end

                render json: {data: data, meta: meta, id: @store.id},
                       status: 200
            end

            def schemas
                render json: {"error": "not available"},
                       status: 500
                return
            end
        end
    end
end