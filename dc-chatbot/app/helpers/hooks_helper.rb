module HooksHelper
    def write_hook(data)
        @store = Store.find(data[:id]) rescue nil
        if !@store.nil?
            meta = @store.meta
            if meta.is_a?(String)
                meta = JSON.parse(meta) rescue {}
            end
            call_id = meta.transform_keys(&:to_s)["call-id"] rescue nil
            if !call_id.nil?
                @store.call_id = call_id
                @store.save
            end
        end
    end

    def read_hook(data)

    end

    def update_hook(data)

    end

    def delete_hook(data)

    end

end
