scope '/' do
    match 'connect', to: 'connections#oidc', via: 'get'
end