class ChatsController < ApplicationController
    # respond only to JSON requests
    respond_to :json
    respond_to :html, only: []
    respond_to :xml, only: []

    include ChatbotHelper
    include CalltypeHelper

    before_action -> { doorkeeper_authorize! :read, :write, :admin }

    def index
        content = Store.group(:call_id)
                    .minimum(:created_at)
                    .sort_by { |call_id, created_at| created_at }.to_h
                    .transform_values { |created_at| created_at.strftime('%d.%m.%Y %H:%M:%S') } rescue {}
        render json: content, 
               status: 200
    end

    def read
        call_id = params[:id].to_s
        @chat = Store.where(call_id: call_id).order(:created_at) rescue nil
        if @chat.nil?
            render json: {"error": "not found"},
                   status: 404
            return
        end

        system_msg = read_texblock(OAI_SYSTEM, "en")
        conv = [{"time": @chat.first.created_at.strftime("%H:%M:%S"), "role": "system", "text": system_msg}.transform_keys(&:to_s)]
        rating = nil
        rating_flag = false
        @chat.each do |record|
            message_array = nil
            if HAS_JSONB
                event_data = record.item.transform_keys(&:to_s)
            else
                event_data = JSON.parse(record.item).transform_keys(&:to_s)
            end
            if !event_data["call"].nil?
                if !event_data["call"]["chat"].nil?
                    message_array = event_data["call"]["chat"]
                end
            else
                if !event_data["chat"].nil?
                    message_array = event_data["chat"]
                end
            end
            if message_array.nil?
                if !event_data.nil? && !event_data["message"].nil?
                    message_array = [event_data["message"]]
                end
            end
            message_array.each do |message|
                text = message["texts"].first rescue ""
                if text.to_s != "" && text.include?("Das ist ein TEST-Notruf von der automatischen DEC112 Systemüberwachung.")
                    test_call = true
                end
                if text.to_s != "" && !text.start_with?("You wrote: ") && !text.start_with?("Phone  has initiated an emergency chat from")
                    if rating_flag
                        rating = text.to_s
                        rating_flag = false
                    end
                    if text.include?("Please rate the chat") ||
                       text.include?("bewerten Sie den durchgeführten Chat")
                            rating_flag = true
                    end
                    if message["origin"] == "remote"
                        conv << {"time": record.created_at.strftime("%H:%M:%S"), "role": "user", "text": text}.transform_keys(&:to_s)
                    end

                    if message["origin"] == "local"
                        if text.include?("The system has ended the emergency call.") ||
                           text.include?("Ich werde den Chat beenden.") ||
                           text.include?("Ende des Anrufs.")
                                call_ended = true
                                return_msg = "//call_ended"
                        end
                        if text.include?("rate the chat on a scale")
                            call_ended = true
                            return_msg = "//call_ended-1"
                        end
                        conv << {"time": record.created_at.strftime("%H:%M:%S"), "role": "assistant", "text": text}.transform_keys(&:to_s)
                    end
                    # puts message["origin"] + ": " + text
                end
                nil
            end unless message_array.nil?
            nil
        end
        content = {"identifier": call_id, "rating": rating, "conversation": conv.sort_by { |e| e["time"] }}
        render json: content, 
               status: 200
    end

end
