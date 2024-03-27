import pytest
import os
import re
import sys
import glob
import requests
import subprocess
from pathlib import Path

# test groups
# 01 - general <- current

# requires
# $MASTER_TOKEN
sc_host = os.getenv('SC_HOST') or "http://localhost:3600"
os.environ["SC_HOST"] = sc_host

# configuration specific to tests
# if gw_host == "http://localhost:3500":

# else:

def envsubst(text):
    pattern = re.compile(r'\$({}?|[a-zA-Z_]\w*)'.format('|'.join(map(re.escape, os.environ.keys()))))
    return pattern.sub(lambda m: os.getenv(m.group(1)), text)

cwd = os.getcwd()
@pytest.mark.parametrize('input',  sorted(glob.glob(cwd+'/02_input/*.doc')))
def test_01_organisations(fp, input):
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
