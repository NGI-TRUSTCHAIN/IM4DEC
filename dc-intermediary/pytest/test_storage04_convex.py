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
# 05 - AWS off-chain storage provider
# 06 - SemCon off-chain storage provider
# 07 - Bellecour on-chain storage provider
# 08 - Convex on-chain storage provider <- current

# requires
# $MASTER_TOKEN
gw_host = os.getenv('GW_HOST') or "http://localhost:3100"
os.environ["GW_HOST"] = gw_host

# configuration specific to tests
if gw_host == "http://localhost:3100":
    os.environ["CV_COLLECTION_ID"] = "19"
    os.environ["CV_OBJECT_ID"] = "20"
    os.environ["SEMCON_URL"] = "http://192.168.178.60:3200" # Vöslau
    # os.environ["SEMCON_URL"] = "http://10.0.0.7:3200" # Mönichwald
else:
    os.environ["CV_COLLECTION_ID"] = "273"
    os.environ["CV_OBJECT_ID"] = "305"

def envsubst(text):
    pattern = re.compile(r'\$({}?|[a-zA-Z_]\w*)'.format('|'.join(map(re.escape, os.environ.keys()))))
    return pattern.sub(lambda m: os.getenv(m.group(1)), text)

cwd = os.getcwd()
@pytest.mark.parametrize('input',  sorted(glob.glob(cwd+'/08_input/*.doc')))
def test_storage04_convex(fp, input):
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

# export CV_COLLECTION_ID=19
# export CV_OBJECT_ID=20
#
# export CV_COLLECTION_ID=273
# export CV_OBJECT_ID=307

# cat 08_input/01_create_col.doc | envsubst | curl -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/collection/
# cat 08_input/02_create_obj.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X POST $GW_HOST/object/
# cat 08_input/03_write_payload.doc | envsubst | curl -s -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d @- -X PUT $GW_HOST/object/$CV_OBJECT_ID/write
# curl -s -H "Authorization: Bearer $USER_TOKEN" $GW_HOST/object/$CV_OBJECT_ID/read
# curl -s -H "Authorization: Bearer $USER_TOKEN" $GW_HOST/object/$CV_OBJECT_ID/read/meta

# https://convex.world/testnet/account/48

# check transaction at https://convex.world/sandbox
# (get n/documents 3)

# curl -H "Authorization: Bearer $USER_TOKEN" https://babelfish.data-container.net/user/current
# echo '{"name":"admin", "meta":{"dlt":[{"type": "Convex", "account":"48", "seed":"7e4f674420a17067115cb26490351510cd25f0467795b725628e66d72d27ad4b"}]}}' | curl -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d @- -X PUT https://babelfish.data-container.net/user/23





# Convex notary function
# (def n
#      (deploy '(do

#                 (def trust
#                      (*registry*/cns-resolve 'convex.trust))
                
                
#                 (def documents

#                   ^{:doc {:description "Map of documents referenced by IDs."}}
                  
#                   {})
                
                
#                 (def next-id
                  
#                   ^{:doc {:description "Used for assigning a new ID and adding a document"}}
                  
#                   0)
                
                
#                 (defn validate-hash

#                   ^{:doc {:description "Helper function for validating a hash."}}
                
#                   [hash]
                
#                   (when (not (and (blob? hash)
#                                   (<= 2
#                                       (count hash)
#                                       32)))
#                     (fail :ARGUMENT
#                           "Hash must be a blob (between 2 and 32 bytes)")))
                
                
                
#                 (defn add-document
                
#                   ^{:callable? true
#                     :doc       {:description ["Adds a new document."
#                                               "Controller will be able to use `update-document` (defaults to current account)."
#                                               "Returns the ID of the new document."]}}
                
#                   ([hash]
                
#                    (add-document hash
#                                  nil))
                
#                   ([hash controller]
                
#                    (validate-hash hash)
#                    (let [id-new (inc next-id)]
#                      (def next-id
#                           id-new)
#                      (def documents
#                           (assoc documents
#                                  id-new
#                                  {:controller (or controller
#                                                   *caller*)
#                                   :log        [[*caller* :add hash]]}))
#                      id-new)))
                        
                  
                
#                 (defn update-document
                
#                   ^{:callable? true
#                     :doc       {:description ["Updates the hash of an existing document by ID."
#                                               "Only the controller of that document is authorized to do it."]}}
                
#                   [id hash]
                
#                   (validate-hash hash)
#                   (when-let [document (get documents
#                                            id)]
#                     (when-not (trust/trusted? (:controller document)
#                                               *caller*)
#                       (fail :TRUST
#                             "Caller is not trusted"))
#                     (def documents
#                          (assoc documents
#                                 id
#                                 (assoc document
#                                        :log
#                                        (conj (:log document)
#                                              [*caller* :update hash]))))
#                     id))
                
                
#                 (defn latest-hash

#                   ^{:doc {:description "Retrieves the latest hash of a document by ID."}}
                
#                   [id]
                
#                   (get (last (get-in documents
#                                      [id :log]))
#                        2)))))



# ;; This code will deploy an new actor (autonomous account) aliased as `n`.
# ;;
# ;; E.g.  (def id (call n (add-document 0x1122)))
# ;;       (get n/documents id)
# ;;       (n/latest-hash id)
# ;;       (call n (update-document id 0xffff))
