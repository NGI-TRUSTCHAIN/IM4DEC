module CollectionHelper
    def getCollection(col_id)
        @col = Store.find(col_id) rescue nil
        if @col.nil?
            return nil
        else
            id = @col.id.to_s
            if !(@col.item.is_a?(Hash) || @col.item.is_a?(Array))
                data = JSON.parse(@col.item) rescue nil
            else
                data = @col.item
            end
            if !(@col.meta.is_a?(Hash) || @col.meta.is_a?(Array))
                meta = JSON.parse(@col.meta) rescue nil
            else
                meta = @col.meta
            end
            return {"id": id, "data": data, "meta": meta}
        end
    end

    def createEvent(collection_id, event_type, event, event_object)
puts "in createEvent"
puts "collection_id: " + collection_id.to_s
        @ce = CollectionEvent.new
        @ce.collection_id = collection_id
        @ce.user_id = doorkeeper_user
        @ce.timestamp = DateTime.now
        @ce.event_type = event_type
        @ce.event_object = event_object.to_json
        @ce.event = event
        retVal = @ce.save
puts "retVal: " + retVal.to_s
    end
end
