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
# 04 - storage <- current

# requires
# $MASTER_TOKEN
gw_host = os.getenv('GW_HOST') or "http://localhost:3100"
os.environ["GW_HOST"] = gw_host

# configuration specific to tests
if gw_host == "http://localhost:3100":
    os.environ["COLLECTION_ID"] = "6"
    os.environ["OBJECT_ID"] = "7"
    os.environ["DEL_OBJECT_ID"] = "7"
    os.environ["USER_ID"] = "2"
else:
    os.environ["COLLECTION_ID"] = "142"
    os.environ["OBJECT_ID"] = "149"
    os.environ["DEL_OBJECT_ID"] = "147"
    os.environ["USER_ID"] = "23"

def envsubst(text):
    pattern = re.compile(r'\$({}?|[a-zA-Z_]\w*)'.format('|'.join(map(re.escape, os.environ.keys()))))
    return pattern.sub(lambda m: os.getenv(m.group(1)), text)

cwd = os.getcwd()
@pytest.mark.parametrize('input',  sorted(glob.glob(cwd+'/04_input/*.doc')))
def test_storage(fp, input):
    fp.allow_unregistered(True)
    with open(input) as f:
        content = f.read()
    with open(input.replace(".doc", ".cmd")) as f:
        command = f.read()
    with open(input.replace("_input/", "_output/")) as f:
        result = envsubst(f.read())
    if len(content) > 0:
        command = "cat " + input + " | envsubst | " + command
    sys.stdout.write(command + '\n')
    process = subprocess.run(command, shell=True, capture_output=True, text=True)
    if len(result) > 0:
        assert process.stdout.strip() == result.strip()
    else:
        assert process.returncode == 0

# export COLLECTION_ID=6
# export OBJECT_ID=7
# export USER_ID=2
#
# export COLLECTION_ID=142
# export OBJECT_ID=147
# export USER_ID=23

# cat 04_input/01_create_col.doc | envsubst | curl -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/collection/
# cat 04_input/02_create_obj.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/object/
# cat 04_input/03_update_obj.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X PUT $GW_HOST/object/$OBJECT_ID

# cat 04_input/08_delete_obj.doc | envsubst



