DEFAULT_LANG = ENV["DEFAULT_LANG"] || "en"
OAI_SYSTEM = ENV["OAI_SYSTEM"] || "OAI_system_default"
OAI_MODEL = ENV["OAI_MODEL"] || "gpt-3.5-turbo"
$oai_client = OpenAI::Client.new(access_token: ENV["OAI_ACCESS_TOKEN"])