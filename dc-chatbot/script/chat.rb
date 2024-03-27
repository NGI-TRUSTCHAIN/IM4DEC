#!/usr/bin/env ruby
# encoding: utf-8

require 'websocket'
require 'httparty'
require 'timeout'
require 'socket'
require 'json'
require 'uri'

DC_URL = "http://localhost:3000/"
DC_DATA_URL = DC_URL + "api/data"
DC_CHATBOT_URL = DC_URL + "api/chatbot/"
STATIC_HEADERS = { 'Content-Type' => 'application/json' }

class WebSocketClient
  def get_headers
    auth_url = DC_URL + "oauth/token"
    app_key = ENV["APP_KEY"]
    app_secret = ENV["APP_SECRET"]
    rensponse_nil = false
    begin
        response = HTTParty.post(auth_url, 
            headers: { 'Content-Type' => 'application/json' },
            body: { client_id: app_key, 
                    client_secret: app_secret, 
                    grant_type: "client_credentials" }.to_json )
    rescue => ex
      response_nil = true
    end
    if response_nil
      nil
    else
      token = response.parsed_response["access_token"].to_s rescue ""
      if token == ""
        nil
      else
        { 
          'Accept' => '*/*',
          'Content-Type' => 'application/json',
          'Authorization' => 'Bearer ' + token
        }
      end
    end
  end

  def initialize(url)
    @url = URI.parse(url)
  end

  def connect
    begin
      tcp_client = TCPSocket.new(@url.host, @url.port)
      if @url.scheme == "wss"
        require 'openssl'
        ssl_context = OpenSSL::SSL::SSLContext.new
        ssl_client = OpenSSL::SSL::SSLSocket.new(tcp_client, ssl_context)
        ssl_client.connect
        @client = ssl_client
      else
        @client = tcp_client
      end
      @handshake = WebSocket::Handshake::Client.new(url: @url.to_s)
      @client.write(@handshake.to_s)

      while !@handshake.finished?
        @handshake << @client.readpartial(1024)
      end
      if @handshake.valid?
        p "Connected successfully!"
        msg = {method: 'subscribe_new_calls'}
        send_message(msg.to_json)
        listen
        p "Connection ended"
      else
        p "Handshake failed!"
      end
    rescue => error
      p "connect: " + error.message
    end      
  end

  def listen
    begin
      default_lang = ENV['CHAT_LANG'] || 'de'
      lang = default_lang.clone
      @frame = WebSocket::Frame::Incoming::Client.new
      end_call_times = {}
      dc_headers = nil
      last_heartbeat_time = Time.now
      last_dc_headers_time = 0
      call_id = nil
      data = nil
      loop do
        begin
          Timeout.timeout(20) do
            data = @client.readpartial(1024)
          end
        rescue Timeout::Error
        end

        if Time.now - last_heartbeat_time >= 10
          msg = {method: 'get_active_calls_count'}
          send_message(msg.to_json)
          p "heartbeat"
          last_heartbeat_time = Time.now
        end

        new_end_call_times = {}
        end_call_times.each do |call_id, end_call_time|
          if !end_call_time.nil?
            if Time.now > end_call_time
              msg = {
                method: 'close_call',
                call_id: call_id
              }
              send_message(msg.to_json)
            else
              new_end_call_times[call_id] = end_call_time
            end
          else
            new_end_call_times[call_id] = nil
          end
        end
        end_call_times = new_end_call_times.clone

        @frame << data
        while msg = @frame.next
          dat = JSON.parse(msg.data)
          write = false
          if !dat.nil?
            case dat["event"].to_s
            when "new_call"
              call_id = dat["call_id"].to_s
              p "new_call-event for id: " + call_id
              lang = dat["lang"] || default_lang.clone
              end_call_times[call_id] = nil
              begin_string = "sip:"
              end_string = "@"
              call_type = dat["called_uri"].to_s[/#{begin_string}(.*?)#{end_string}/m, 1] rescue ""
              msg = {
                method: 'subscribe_call',
                call_id: call_id
              }
              send_message(msg.to_json)
              msg = {
                method: 'get_call',
                call_id: call_id
              }
              send_message(msg.to_json)
              # response = HTTParty.post(DC_CHATBOT_URL + "welcome", 
              #               headers: STATIC_HEADERS, 
              #               body: { call_id: call_id, 
              #                       lang: lang, 
              #                       calltype: call_type}.to_json )
              write = true
            when "new_message"
              call_id = dat["call_id"].to_s
              p "new message: " + call_id.to_s
              msg = dat["message"]["texts"].join("\n").strip rescue ""
              origin = dat["message"]["origin"].strip rescue ""
              if origin == "remote" && msg != ""
                response = HTTParty.post(DC_CHATBOT_URL + "reply", 
                              headers: STATIC_HEADERS, 
                              body: { message: msg, 
                                      call_id: call_id, 
                                      lang: lang}.to_json )
                chat_response = response.parsed_response
                if chat_response.is_a?(String)
                  chat_response = JSON.parse(chat_response) rescue nil
                end
                chat_response.each do |item|
                  case item["action"].to_s
                  when "send"
                    msg = {
                      method: 'send',
                      call_id: call_id,
                      message: item["message"].to_s.gsub("\n","<br>").gsub("\\","")
                    }
                    send_message(msg.to_json)
                  when "wait"
                    sleep(item["time"].to_i) rescue sleep 5
                  when "end"
                    msg = {
                      method: 'close_call',
                      call_id: call_id
                    }
                    send_message(msg.to_json)
                  when "end20"
                    end_call_times[call_id] = Time.now + 120
                    p Time.now.to_s + " - set end_call_time to " + end_call_times[call_id].to_s
                  else
                    p "unknown action '" + item["action"].to_s + "'"
                  end
                end unless chat_response.nil?
              end
              write = true
            when "close_call", "state_change"
              call_id = dat["call_id"].to_s
              write = true
            end
            if dat["method"].to_s == "get_call"
              call_id = dat["call"]["call_id"].to_s rescue ""
              begin_string = "sip:"
              end_string = "@"
              call_type = dat["call"]["called_uri"].to_s[/#{begin_string}(.*?)#{end_string}/m, 1] rescue ""
              if call_type != "" && call_id != ""
                msg = {
                  method: 'send',
                  call_id: call_id,
                }
                case call_type.to_s
                when "122"
                  msg["message"] = 'Einsatztyp: Feuerwehr'
                  send_message(msg.to_json)
                when "133"
                  msg["message"] = 'Einsatztyp: Polizei'
                  send_message(msg.to_json)
                when "144"
                  msg["message"] = 'Einsatztyp: Rettung'
                  send_message(msg.to_json)
                end
              end
              dat["code"] = 200
              write = true
            end
            if write
              dat["message_received_ts"] = Time.now.strftime("%Y-%m-%dT%H:%M:%S.%LZ")
              if dc_headers.nil? || Time.now - last_dc_headers_time >= 3600
                dc_headers = get_headers()
                last_dc_headers_time = Time.now
              end
              post_response = HTTParty.post(DC_DATA_URL, 
                                headers: dc_headers, 
                                body: {"data": dat, "meta": {"call-id": call_id.to_s}}.to_json )
            end
          end
        end
      end
    rescue => error
      p "listen: " + error.message
    end
  end

  def send_message(message)
    begin
      frame = WebSocket::Frame::Outgoing::Client.new(version: @handshake.version, data: message, type: :text)
      @client.write(frame.to_s)
    rescue => error
      p "send_message: " + error.message
    end
  end

  def close
    @client.close
  end
end

client = WebSocketClient.new(ENV['WS_ENDPOINT'].to_s)
while true
  client.connect
  sleep 5
  p "try re-connect"
end
