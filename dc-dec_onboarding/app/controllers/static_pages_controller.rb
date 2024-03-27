class StaticPagesController < ApplicationController
    protect_from_forgery with: :null_session
    include ApplicationHelper

    require 'uri'
    require 'barby'
    require 'barby/barcode'
    require 'barby/barcode/qr_code'
    require 'barby/outputter/png_outputter'

    def home
        @session_id = SecureRandom.uuid
        @store = Store.new
        @store.key = @session_id
        @store.item = {"session-id": @session_id}
        @store.save
        @onboard_url = "openid-vc://?request_uri=" + 
            URI.encode_www_form_component(ISSUER_HOST + AUTH_REQUEST_URI) + @session_id
    end

    def step2
        session_id = params[:session_id]
        @store = Store.find_by_key(session_id)
        item = @store.item
        holder_did = item["holder-did"]

        auth_url = REGAPI_URL + '/oauth/token'
        app_key = ENV["REGAPI_APPKEY"]
        app_secret = ENV["REGAPI_APPSECRET"]
        response_nil = false
        begin
            response = HTTParty.post(auth_url, 
                headers: { 'Content-Type' => 'application/json' },
                body: { client_id: app_key, 
                    client_secret: app_secret, 
                    grant_type: "client_credentials" }.to_json )
        rescue => ex
            response_nil = true
        end
        if response_nil || response.code != 200
            render json: {"error": "cannot authenticate against " + auth_url},
                   status: 500
            return
        end
        token = response["access_token"]

        register_url = REGAPI_URL + '/api/v3/register'
        request = {
            header: {
                method: "id_austria",
                action: "init"
            },
            payload: {
                did: holder_did,
                options: { 
                    redirect: ISSUER_HOST + '/credential',
                    encrypt: "false" 
                }
            }
        }
        response_nil = false
        begin
            response = HTTParty.post(register_url,
                headers: { 'Content-Type' => 'application/json',
                           'Authorization' => 'Bearer ' + token },
                body: request.to_json )
        rescue => ex
            response_nil = true
        end
        if response_nil || response.code != 200
            render json: {"error": "cannot retrieve reg_id"},
                   status: 500
            return
        end
        reg_id = response["reg_id"]
        item["reg-id"] = reg_id
        @store.item = item
        @store.key = reg_id
        @store.save

        ida_url = response["id_austria"]["ida_url"]
        redirect_to ida_url, allow_other_host: true
    end

    def credential
        reg_id = params[:reg_id]
        @store = Store.find_by_key(reg_id)
        item = @store.item

        auth_url = REGAPI_URL + '/oauth/token'
        app_key = ENV["REGAPI_APPKEY"]
        app_secret = ENV["REGAPI_APPSECRET"]
        response_nil = false
        begin
            response = HTTParty.post(auth_url, 
                headers: { 'Content-Type' => 'application/json' },
                body: { client_id: app_key, 
                    client_secret: app_secret, 
                    grant_type: "client_credentials" }.to_json )
        rescue => ex
            response_nil = true
        end
        if response_nil || response.code != 200
            render json: {"error": "cannot authenticate against " + auth_url},
                   status: 500
            return
        end
        token = response["access_token"]

        register_url = REGAPI_URL + '/api/v3/register?reg_id=' + reg_id
        response_nil = false
        begin
            response = HTTParty.get(register_url,
                headers: { 'Authorization' => 'Bearer ' + token })
        rescue => ex
            response_nil = true
        end
        if response_nil || response.code != 200
            render json: {"error": "cannot retrieve reg_id"},
                   status: 500
            return
        end
        if response["id_austria"]["vc"].nil?
            item["id-austria"] = response["id_austria"]
        else
            item["id-austria"] = response["id_austria"]["vc"]
        end
        item["sip"] = response["sip"]

        preauth_code = SecureRandom.urlsafe_base64(17)[0,22]
        item["preauth-code"] = preauth_code
        @store.item = item
        @store.key = preauth_code
        @store.save

        payload = {
            "grants": {
                "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
                    "pre-authorized_code": preauth_code,
                    "user_pin_required": false
                }
            },
            "credentials": [
                CREDENTIAL_TYPE
            ],
            "credential_issuer": ISSUER_HOST + CREDENTIAL_PATH
        }
        @credential_offer = "openid-credential-offer://?credential_offer=" + 
                                URI.encode_www_form_component(payload.to_json)
    end

end