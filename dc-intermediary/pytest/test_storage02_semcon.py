import pytest
import os
import re
import sys
import glob
import requests
import subprocess
from pathlib import Path

# test groups
# 01 - organisations
# 02 - users
# 03 - services
# 04 - storage
# 05 - AWS storage provider
# 06 - SemCon storage provider <- current

# requires
# $MASTER_TOKEN
gw_host = os.getenv('GW_HOST') or "http://localhost:3100"
os.environ["GW_HOST"] = gw_host

# configuration specific to tests
if gw_host == "http://localhost:3100":
    os.environ["SC_COLLECTION_ID"] = "13"
    os.environ["SC_OBJECT_ID"] = "14"
    os.environ["SEMCON_URL"] = "http://192.168.178.60:3200" # Vöslau
    # os.environ["SEMCON_URL"] = "http://10.0.0.7:3200" # Mönichwald
else:
    os.environ["SC_COLLECTION_ID"] = "236"
    os.environ["SC_OBJECT_ID"] = "239"
    os.environ["SEMCON_URL"] = "https://storage-oc3.data-container.net"

def envsubst(text):
    pattern = re.compile(r'\$({}?|[a-zA-Z_]\w*)'.format('|'.join(map(re.escape, os.environ.keys()))))
    return pattern.sub(lambda m: os.getenv(m.group(1)), text)

cwd = os.getcwd()
@pytest.mark.parametrize('input',  sorted(glob.glob(cwd+'/06_input/*.doc')))
def test_storage02_semcon(fp, input):
    fp.allow_unregistered(True)
    with open(input) as f:
        content = f.read()
    with open(input.replace(".doc", ".cmd")) as f:
        command = f.read()
    with open(input.replace("_input/", "_output/")) as f:
        result = envsubst(f.read())
    if len(content) > 0:
        command = "cat " + input + " | envsubst | " + command
    process = subprocess.run(command, shell=True, capture_output=True, text=True)
    assert process.returncode == 0
    if len(result) > 0:
        assert process.stdout.strip() == result.strip()

# export SEMCON_URL="http://192.168.178.60:3200"
# export SEMCON_URL="http://10.0.0.7:3200"
# export SC_COLLECTION_ID=13
# export SC_OBJECT_ID=14
#
# export SEMCON_URL="https://storage-oc3.data-container.net"
# export SC_COLLECTION_ID=236
# export SC_OBJECT_ID=239

# cat 06_input/01_create_col.doc | envsubst | curl -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/collection/
# cat 06_input/02_create_obj.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/object/
# cat 06_input/03_write_payload.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X PUT $GW_HOST/object/$SC_OBJECT_ID/write
# curl -s -H "Authorization: Bearer $USER_TOKEN" $GW_HOST/object/$SC_OBJECT_ID/read

