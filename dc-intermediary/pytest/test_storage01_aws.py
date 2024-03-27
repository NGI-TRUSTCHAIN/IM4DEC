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
# 05 - AWS storage provider <- current

# requires
# $MASTER_TOKEN
gw_host = os.getenv('GW_HOST') or "http://localhost:3100"
os.environ["GW_HOST"] = gw_host

# configuration specific to tests
if gw_host == "http://localhost:3100":
    os.environ["AWS_COLLECTION_ID"] = "10"
    os.environ["AWS_OBJECT_ID"] = "11"
else:
    os.environ["AWS_COLLECTION_ID"] = "205"
    os.environ["AWS_OBJECT_ID"] = "210"

def envsubst(text):
    pattern = re.compile(r'\$({}?|[a-zA-Z_]\w*)'.format('|'.join(map(re.escape, os.environ.keys()))))
    return pattern.sub(lambda m: os.getenv(m.group(1)), text)

cwd = os.getcwd()
@pytest.mark.parametrize('input',  sorted(glob.glob(cwd+'/05_input/*.doc')))
def test_storage01_aws(fp, input):
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

# export AWS_COLLECTION_ID=10
# export AWS_OBJECT_ID=11
#
# export AWS_COLLECTION_ID=205
# export AWS_OBJECT_ID=210

# cat 05_input/01_create_col.doc | envsubst | curl -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/collection/
# cat 05_input/02_create_obj.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/object/
# cat 05_input/03_write_payload.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X PUT $GW_HOST/object/$AWS_OBJECT_ID/write
# curl -s -H "Authorization: Bearer $USER_TOKEN" $GW_HOST/object/$AWS_OBJECT_ID/read


