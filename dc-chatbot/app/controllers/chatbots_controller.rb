class ChatbotsController < ApplicationController
    # respond only to JSON requests
    respond_to :json
    respond_to :html, only: []
    respond_to :xml, only: []

    include ChatbotHelper
    include CalltypeHelper

    def welcome
        msg = read_texblock("welcome", params[:lang].to_s)
        if msg.include?("{{")
            ct = params[:calltype].to_s
            if ct != ""
                ct = map_uri_calltype(ct)
            end
            if ct.to_s == ""
                ct = ENV["DEFAULT_CALLTYPE"] || "ambulance"
            end
            ct_lang = read_texblock(ct, params[:lang].to_s)
            handlebars = Handlebars::Engine.new
            template = handlebars.compile(msg)
            msg = template.call(:CALL_TYPE => ct_lang)
        end
        content = { message: msg }
        render json: content, 
               status: 200
    end

    def reply
        content = []
        # check if within normal flow of conversation
        return_msg = dec112_reply(params[:message], params[:call_id], params[:lang])
        if return_msg.to_s != ""
            if !return_msg.start_with?("//call_ended") && !return_msg.start_with?("//call_termi")
                content = [{"action": "send", "message": return_msg}]
            end

            # end of conversation and preconfigured questions are asked
            if return_msg.start_with?("//call_ended") || return_msg.start_with?("//call_termi") || string_include_config(return_msg, "chatbot_end_call.txt")
                if content.length > 0
                    content << {"action": "wait", "time": 2}
                end
                if return_msg.start_with?("//call_ended") || return_msg.start_with?("//call_termi")
                    if return_msg == "//call_ended"
                        call_id = "1"
                    else
                        call_id = (return_msg[13..-1].to_i + 1).to_s
                    end
                else
                    call_id = "1"
                end
                question_txt = read_question(call_id, params[:lang].to_s)
                if question_txt.to_s == ""
                    return_msg = read_texblock("goodbye", params[:lang].to_s)
                    content << {"action": "send", "message": return_msg}
                    content << {"action": "wait", "time": 3}
                    content << {"action": "end"}
                else
                    content << {"action": "send", "message": question_txt}
                    if return_msg.start_with?("//call_termi")
                        content << {"action": "end20"}
                    end
                end
            end
        end
        render json: content, 
               status: 200
    end

end
