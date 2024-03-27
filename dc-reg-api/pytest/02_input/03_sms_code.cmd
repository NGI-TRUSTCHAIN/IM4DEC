TOKEN=`oydid auth $DID $REGAPI --json | jq -r '.access_token'` && \
REG_ID=`curl -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"header": {"method": "sms","action": "init"}, "payload":{"phone_number": "00431234567"}}' -s \
     -X PUT $REGAPI/api/v3/register | \
jq -r '.reg_id'` && \
echo '{"header": {"method": "sms","action": "SmsVerificationCode"},
       "payload":{}}' | \
jq --arg reg_id "$REG_ID" '.header += {"reg_id": $reg_id}' | \
jq --arg code "12345678" '.payload += {"sms_code": $code}' | \
curl -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d @- \
     -X PUT $REGAPI/api/v3/register | \
 jq -c '{status, status_text}'