scope '/' do
    # Babelfish ===================
    # Service handling
    match 'list',             to: 'services#page',   via: 'get'
    match 'list/count/page',  to: 'services#page',   via: 'get'
    match 'service/search',   to: 'services#search', via: 'get'
    match 'service/:id',      to: 'services#read',   via: 'get'
    match 'service/:id/meta', to: 'services#read',   via: 'get', defaults: { show_meta: "TRUE"}
    match 'service',          to: 'services#create', via: 'post'
    match 'service/:id',      to: 'services#update', via: 'put'
    match 'service/:id',      to: 'services#delete', via: 'delete'

    # Organisation handling
    match 'organization',          to: 'organizations#index',   via: 'get'
    match 'organization/current',  to: 'organizations#current', via: 'get'
    match 'organization/:id',      to: 'organizations#read',    via: 'get'
    match 'organization/:id/meta', to: 'organizations#read',    via: 'get', defaults: { show_meta: "TRUE"}
    match 'organization/:id/list', to: 'organizations#list',    via: 'get'
    match 'organization',          to: 'organizations#create',  via: 'post'
    match 'organization/:id',      to: 'organizations#update',  via: 'put'
    match 'organization/:id',      to: 'organizations#delete',  via: 'delete'

    # User hanlding
    match 'user',              to: 'users#create',  via: 'post'
    match 'user/current',      to: 'users#current', via: 'get'
    match 'user/current/meta', to: 'users#current', via: 'get', defaults: { show_meta: "TRUE"}
    match 'user/:id',          to: 'users#read',    via: 'get'
    match 'user/:id/meta',     to: 'users#read',    via: 'get', defaults: { show_meta: "TRUE"}
    match 'user/:id/wallet',   to: 'users#wallet',  via: 'get'
    match 'user/:id',          to: 'users#update',  via: 'put'
    match 'user/:id',          to: 'users#delete',  via: 'delete'

    # Collection handling
    match 'collection/list',        to: 'collections#list',          via: 'get'
    match 'collection/:id',         to: 'collections#read',          via: 'get'
    match 'collection/:id/meta',    to: 'collections#read',          via: 'get', defaults: { show_meta: "TRUE"}
    match 'collection/:id/objects', to: 'collections#objects',       via: 'get'
    match 'collection/:id/access',  to: 'collections#get_access',    via: 'get'
    match 'collection/:id/access',  to: 'collections#create_access', via: 'post'
    match 'collection/access/:id',  to: 'collections#delete_access', via: 'delete'
    match 'collection/:id/events',  to: 'collections#events',        via: 'get'
    match 'event/:id',              to: 'collections#read_event',    via: 'get'
    match 'collection',             to: 'collections#create',        via: 'post'
    match 'collection/:id',         to: 'collections#update',        via: 'put'
    match 'collection/:id',         to: 'collections#delete',        via: 'delete'

    # Object handling
    match 'object/:id',                 to: 'objects#read',   via: 'get'
    match 'object/:id/meta',            to: 'objects#read',   via: 'get', defaults: { show_meta: "TRUE"}
    match 'object/:id/write',           to: 'objects#write',  via: 'put'
    match 'object/:id/read',            to: 'objects#object', via: 'get'
    match 'object/:id/read/meta',       to: 'objects#objmet', via: 'get'
    match 'object/:object_id/:user_id', to: 'objects#access', via: 'get'
    match 'object',                     to: 'objects#create', via: 'post'
    match 'object/:id',                 to: 'objects#update', via: 'put'
    match 'object/:id',                 to: 'objects#delete', via: 'delete'

    # Integration Helper
    match 'integration/match_da',       to: 'integrations#match_da', via: 'post'

end