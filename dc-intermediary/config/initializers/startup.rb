begin
    if Doorkeeper::Application.count == 0
        Doorkeeper::Application.create!({ 
            name: 'master', 
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
            scopes: 'admin write read'})
    end
    puts "=== MASTER CREDENTIALS ==="
    puts "APP_KEY: " + Doorkeeper::Application.first.uid.to_s
    puts "APP_SECRET: " + Doorkeeper::Application.first.secret.to_s
rescue Exception => e  
    puts e.message
end