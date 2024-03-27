require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DcBase
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
    config.after_initialize do
      begin
        if Doorkeeper::Application.count == 0
          uid = ENV['APP_KEY'].to_s
          secret = ENV['APP_SECRET'].to_s
          if uid.to_s == "" || secret.to_s == ""
            Doorkeeper::Application.create!(
              {
                name: 'master', 
                redirect_uri: 'urn:ietf:wg:oauth:2.0:oob', 
                scopes: 'admin write read'
              }
            )
          else
            Doorkeeper::Application.create!(
              {
                name: 'master', 
                uid: uid,
                secret: secret, 
                redirect_uri: 'urn:ietf:wg:oauth:2.0:oob', 
                scopes: 'admin write read'
              }
            )
          end
        end
        ENV['APP_KEY'] = Doorkeeper::Application.first.uid.to_s
        ENV['APP_SECRET'] = Doorkeeper::Application.first.secret.to_s
        puts "APP_KEY: " + Doorkeeper::Application.first.uid.to_s
        puts "APP_SECRET: " + Doorkeeper::Application.first.secret.to_s
      rescue => error
        puts "config.after_initialize ERROR: " + error.message.to_s
      end
    end
  end
end
