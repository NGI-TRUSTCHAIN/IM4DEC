scope '/' do
    # UI ==========================
    root 'static_pages#home'
    match '/welcome',    to: 'static_pages#home',       via: 'get'
    match '/step2',      to: 'static_pages#step2',      via: 'post'
    match '/credential', to: 'static_pages#credential', via: 'get'

    # Request DID from Wallet =====
    match '/agent/siop/definitions/sphereonWallet/auth-requests/:id',  to: 'oidc4vc#auth_request',  via: 'get'
    match '/agent/siop/definitions/sphereonWallet/auth-responses/:id', to: 'oidc4vc#auth_response', via: 'post'

    # Issue VC
    match '/dec112/.well-known/openid-credential-issuer', to: 'oidc4vci#dec112',      via: 'get'
    match '/dec112/token',                                to: 'oidc4vci#token',       via: 'post'
    match '/dec112/credentials',                          to: 'oidc4vci#credentials', via: 'post'

end