scope '/' do
    match 'api/chatbot/welcome',    to: 'chatbots#welcome', via: 'post'
    match 'api/v1/chatbot/welcome', to: 'chatbots#welcome', via: 'post'
    match 'api/chatbot/reply',      to: 'chatbots#reply',   via: 'post'
    match 'api/v1/chatbot/reply',   to: 'chatbots#reply',   via: 'post'

    match 'api/chat/list',          to: 'chats#index',      via: 'get'
    match 'api/v1/chat/list',       to: 'chats#index',      via: 'get'
    match 'api/chat/:id',           to: 'chats#read',       via: 'get'
    match 'api/v1/chat/:id',        to: 'chats#read',       via: 'get'

end