curl -H 'Content-Type: application/json' -d @- -X POST https://soya-web-cli.ownyourdata.eu/api/v1/validate/Did | jq '.isValid'