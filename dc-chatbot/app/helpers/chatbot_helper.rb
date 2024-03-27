module ChatbotHelper
    include ApplicationHelper

    def read_texblock(tb_name, lang = "")
        if lang == ""
            file_name = tb_name + "_" + DEFAULT_LANG + ".txt"
        else
            file_name = tb_name + "_" + lang + ".txt"
        end
        file_path = Rails.root.join('config', 'textblocks', file_name)
        content = File.read(file_path) rescue ""
        if content.to_s == ""
            file_name = tb_name + "_" + DEFAULT_LANG
            file_path = Rails.root.join('config', 'textblocks', file_name)
            content = File.read(file_path) rescue ""
        end
        return content
    end

    def read_question(id, lang = "")
        if lang == ""
            file_name = id.to_s + "-*.question_" + DEFAULT_LANG
        else
            file_name = id.to_s + "-*.question_" + lang
        end
        file_path = Dir[Rails.root.join('config', 'textblocks', 'questionnaire', file_name)].first rescue ""
        content = File.read(file_path) rescue ""
        return content
    end

    def string_matches_config(str, config_file)
        config_file_path = Rails.root.join('config', 'textblocks', config_file)
        File.open(config_file_path, 'r') do |file|
            file.each_line do |line|
                return true if line.strip == str
            end
        end
        false
    rescue
        false
    end

    def string_start_with_config(str, config_file)
        config_file_path = Rails.root.join('config', 'textblocks', config_file)
        File.open(config_file_path, 'r') do |file|
            file.each_line do |line|
                return true if str.start_with?(line.strip)
            end
        end
        false
    rescue
        false
    end

    def string_include_config(str, config_file, subdir = "")
        if subdir.to_s == ""
            config_file_path = Rails.root.join('config', 'textblocks', config_file)
        else
            config_file_path = Rails.root.join('config', 'textblocks', subdir, config_file)
        end
        File.open(config_file_path, 'r') do |file|
            file.each_line do |line|
                return true if str.include?(line.strip)
            end
        end
        false
    rescue
        false
    end

    def dec112_reply(msg, call_id, lang)
        call_ended = false
        # test_call = false
        return_msg = ""
        @chat = Store.where(call_id: call_id)
        system_msg = read_texblock(OAI_SYSTEM, "en") # chatbot is always configured in English language
        conv = [{"role": "system", "content": system_msg}]

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
            last_user_text = ""
            question_id = nil
            message_array.each do |message|
                text = message["texts"].first rescue ""
                if text.to_s != ""
                    # if string_matches_config(text, "chatbot_test_call.txt")
                    #     test_call = true
                    # end
                    if !string_start_with_config(text, "chatbot_filter.txt")
                        case message["origin"]
                        when "remote"
                            conv << {"role": "user", "content": text}
                            last_user_text = text.clone
                        when "local"
                            if string_include_config(text, "chatbot_end_call.txt")
                                call_ended = true
                                return_msg = "//call_ended"
                            end
                            if call_ended
                                Dir[Rails.root.join('config', 'textblocks', 'questionnaire', '*.txt')].each do |file_path|
                                    file_name = File.basename(file_path)
                                    if string_include_config(text, file_name, 'questionnaire')
                                        question_id = file_name.split("-").first.to_i
                                        condition_files = Rails.root.join('config', 'textblocks', 'questionnaire', question_id.to_s + '*.condition')
                                        if Dir[condition_files].any?
                                            if string_include_config(msg.downcase, File.basename(Dir[condition_files].first), "questionnaire")
                                                question_id = question_id * 10
                                            else
                                                # condition not met
                                            end
                                        end
                                        next_files = Rails.root.join('config', 'textblocks', 'questionnaire', (question_id +1).to_s + '-*')
                                        if Dir[next_files].any?
                                            if File.basename(Dir[next_files].first).include?("-last-")
                                                return_msg = "//call_termi-" + question_id.to_s
                                            else
                                                if return_msg.start_with?("//call_termi")
                                                    return_msg = "//call_termi-" + question_id.to_s
                                                else
                                                    return_msg = "//call_ended-" + question_id.to_s
                                                end
                                            end
                                        else
                                            if return_msg.start_with?("//call_termi")
                                                return_msg = "//call_termi-" + question_id.to_s
                                            else
                                                return_msg = "//call_ended-" + question_id.to_s
                                            end
                                        end
                                    else
                                        if !return_msg.start_with?("//call_termi")
                                            if question_id.nil?
                                                return_msg = "//call_ended"
                                            else
                                                return_msg = "//call_ended-" + question_id.to_s
                                            end
                                        end
                                    end
                                end
                            end
                            conv << {"role": "assistant", "content": text}
                        end
                    end
                end
            end unless message_array.nil?
            nil
        end
        if !string_start_with_config(msg, "chatbot_filter.txt")
            conv << {"role": "user", "content": msg.to_s}
            if !call_ended
                # if !test_call
                    oai_params = {
                          model: OAI_MODEL, 
                          messages: conv,
                          temperature: 1,
                          max_tokens: 1024,
                          top_p: 1,
                          frequency_penalty: 0,
                          presence_penalty: 0
                        }
                    response = $oai_client.chat(parameters: oai_params)
                    return_msg = response["choices"].first["message"]["content"] rescue "error"
                # else
                #     return_msg = ""
                # end
            end
        else
            return_msg = ""
        end
        return return_msg.to_s
    end
end