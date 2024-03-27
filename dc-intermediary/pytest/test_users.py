import pytest
import os
import sys
import glob
import requests
import subprocess
from pathlib import Path

# test groups
# 01 - organisations
# 02 - users <- current

# requires
# $MASTER_TOKEN
gw_host = os.getenv('GW_HOST') or "http://localhost:3100"
os.environ["GW_HOST"] = gw_host

# configuration specific to tests
if gw_host == "http://localhost:3100":
    os.environ["ORG_ID"] = "1"
else:
    os.environ["ORG_ID"] = "14"

def envsubst(text):
    pattern = re.compile(r'\$({}?|[a-zA-Z_]\w*)'.format('|'.join(map(re.escape, os.environ.keys()))))
    return pattern.sub(lambda m: os.getenv(m.group(1)), text)

cwd = os.getcwd()
@pytest.mark.parametrize('input',  sorted(glob.glob(cwd+'/02_input/*.doc')))
def test_users(fp, input):
    fp.allow_unregistered(True)
    with open(input) as f:
        content = f.read()
    with open(input.replace(".doc", ".cmd")) as f:
        command = f.read()
    with open(input.replace("_input/", "_output/")) as f:
        result = f.read()
    if len(content) > 0:
        command = "cat " + input + " | envsubst | " + command
    process = subprocess.run(command, shell=True, capture_output=True, text=True)
    assert process.returncode == 0
    if len(result) > 0:
        assert process.stdout.strip() == result.strip()

# export ORG_ID=14

# cat 02_input/02_create_user.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/user/