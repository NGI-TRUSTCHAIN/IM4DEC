# config/initializers/redis.rb
require 'redis'

# Create a new redis client using the url
if ENV["REDIS_PASSWORD"].to_s == ""
    $redis = Redis.new(host: ENV["REDIS_HOST"].to_s, port: 6379)
else
    $redis = Redis.new(host: ENV["REDIS_HOST"].to_s, password: ENV["REDIS_PASSWORD"].to_s, port: 6379)
end
