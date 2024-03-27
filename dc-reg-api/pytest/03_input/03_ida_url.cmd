TOKEN=`oydid auth $DID $REGAPI --json | jq -r '.access_token'` && \
REG_ID=`curl -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"header": {"method": "id_austria","action": "init"}, "payload":{}}' -s \
     -X PUT $REGAPI/api/v3/register | \
jq -r '.reg_id'` && \
curl -H "Authorization: Bearer $TOKEN" "$REGAPI/api/v3/register?reg_id=$REG_ID" | \
 jq -c '{status, status_text}'