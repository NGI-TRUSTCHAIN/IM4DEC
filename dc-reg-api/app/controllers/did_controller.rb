class DidController < ApplicationController
    def auth
        did_info, msg = Oydid.read(params[:did], {})
        if did_info.nil?
            render json: {"error": "cannot resolve DID"},
                   status: 401
            return
        end
        if did_info["error"] != 0
            render json: {"error": did_info["message"].to_s},
                   status: 401
            return
        end
        public_key = did_info["doc"]["key"].split(":")[0].to_s

        oauth_app_name = ENV["DEFAULT_VC_OAUTH_APP"].to_s
        @oauth = Doorkeeper::Application.find_by_name(oauth_app_name) rescue nil
        if @oauth.nil?
            render json: {"error": "OAuth not configured"},
                   status: 404
            return
        end

        # create token
        @t = Doorkeeper::AccessToken.new(
            application_id: @oauth.id, 
            expires_in: 7200, 
            scopes: @oauth.scopes, 
            public_key: public_key)
        if @t.save
            retVal = {
                "access_token": @t.token.to_s,
                "token_type": "Bearer",
                "expires_in": @t.expires_in,
                "scope": @t.scopes.to_s,
                "created_at": @t.created_at.to_i }
            render json: retVal,
                   status: 200
        else
            render json: {"error": "cannot create access token - " + @t.errors.to_json},
                   status: 500
        end
    end
end