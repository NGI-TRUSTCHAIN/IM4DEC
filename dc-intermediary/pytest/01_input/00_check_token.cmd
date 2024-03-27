curl -s -d grant_type=client_credentials -d client_id=$APP_KEY -d client_secret=$APP_SECRET -d scope=admin \
    -X POST $GW_HOST/oauth/token | jq -r '.scope'