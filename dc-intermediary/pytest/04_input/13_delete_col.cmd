curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -X DELETE $GW_HOST/collection/`echo '{"name": "Delete Collection"}' | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/collection | jq -r '."collection-id"'` | jq -r '.name'