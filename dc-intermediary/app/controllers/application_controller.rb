class ApplicationController < ActionController::API
    def version
        render json: {"service": "babelfish", "version": "0.2.0", "oydid-gem": Gem.loaded_specs["oydid"].version.to_s}.to_json,
               status: 200
    end

    def missing
        render json: {"error": "invalid path"},
               status: 404
    end	

    def doorkeeper_unauthorized_render_options(error: nil)
        { json: { error: "Not authorized" } }
    end

    def doorkeeper_forbidden_render_options(*)
        { json: { error: "Not authorized" } }
    end
end
