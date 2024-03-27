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
# 11 - SCM Storage Provisioning
# 12 - SCM Storage Disclosure <- current

# requires
mk_host = os.getenv('MK_HOST') or "https://market-oc3.data-container.net"
os.environ["MK_HOST"] = mk_host

# configuration specific to tests
if mk_host == "https://market-oc3.data-container.net":
    os.environ["OBJECT_ID"] = "14"
else:
    os.environ["OBJECT_ID"] = "2"

def envsubst(text):
    pattern = re.compile(r'\$({}?|[a-zA-Z_]\w*)'.format('|'.join(map(re.escape, os.environ.keys()))))
    return pattern.sub(lambda m: os.getenv(m.group(1)), text)

cwd = os.getcwd()
@pytest.mark.parametrize('input',  sorted(glob.glob(cwd+'/12_input/*.doc')))
def test_scm_disclosure(fp, input):
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

