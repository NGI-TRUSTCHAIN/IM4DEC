scope '/' do

    match 'api/v3/config/root', to: 'dec112#root', via: 'get'
    match 'api/v3/config/user', to: 'dec112#user', via: 'get'
    match 'api/config/root',    to: 'dec112#root', via: 'get'
    match 'api/config/user',    to: 'dec112#user', via: 'get'

    match 'api/v3/register', to: 'dec112#read',   via: 'get'
    match 'api/register',    to: 'dec112#read',   via: 'get'

    match 'api/v3/register', to: 'dec112#create', via: 'post'
    match 'api/register',    to: 'dec112#create', via: 'post'

    match 'api/v3/register', to: 'dec112#create', via: 'put'
    match 'api/register',    to: 'dec112#create', via: 'put'

    match 'api/v3/register', to: 'dec112#delete', via: 'delete'
    match 'api/register',    to: 'dec112#delete', via: 'delete'

    match 'did_auth', to: 'did#auth',      via: 'post'

end