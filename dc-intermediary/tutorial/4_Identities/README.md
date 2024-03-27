# Identity Management with `did:oyd`

*last update: 22 January 2024*  

Welcome to our comprehensive tutorial on utilizing Decentralized Identifiers (DIDs) to empower your digital identity management! In this hands-on guide, we will delve into the core concepts and advantages of the `did:oyd` method, and demonstrate step-by-step how to create, authenticate, and manage your own decentralized identifiers. By the end of this tutorial, you will have gained valuable insights into the world of decentralized identity management and possess the skills to harness its potential for your projects, applications, and personal use. Refer to the [Tutorial-Overview](https://github.com/OwnYourData/dc-intermediary/tree/main/tutorial) for other aspects of the OwnYourData Intermediary.

### Content

[0 - Prerequisites](#0---prerequisites)  
[1 - Creating a DID](#1---creating-a-did)  
[2 - Resolving a DID](#2---resolving-a-did)  
[3 - DID Lifecycle](#3---did-lifecycle)  
[4 - Delegation](#4---delegation)  
[5 - Rotation](#5---rotation)  
[6 - Verifiable Credentials & Verifiable Presentations](#5---verifiable-credentials--verifiable-presentations)  

&nbsp;

## 0 - Prerequisites

### On the Command Line  
To execute commands in the steps below make sure to have the following tools installed:    
* `oydid`: download and installation instructions [available here](https://github.com/OwnYourData/oydid/tree/main/cli)    
* `curl`: download and installation instructions [available here](https://curl.se/download.html)
* `jq`: download and installation instructions [available here](https://stedolan.github.io/jq/download/)    

Alternatively, you can use a ready-to-use Docker image with all tools pre-installed:    
[https://hub.docker.com/r/oydeu/oydid-cli](https://hub.docker.com/r/oydeu/oydid-cli) 

> Use the following command to start the image:    
> 
> ```console
> docker run -it --rm -v ~/.oydid:/home/user oydeu/oydid-cli
> ```
> 
> *Note:* since it makes sense to keep data beyond a Docker session, a directory is mounted in the container to persist files; create this local directory with the command `mkdir ~/.oydid`

### Using a Web Service
To manage DIDs beyond the command line, i.e., when you want to integrate `did:oyd` into your application, it is also possible to access all functions via an API. As the de-facto standard the DIF [Uniresolver](https://resolver.identity.foundation/) and [Uniregistrar](https://uniregistrar.io/) have specified the relevant endpoints and `did:oyd` is fully compliant (see also the relevant [Swagger documentation here](https://oydid.ownyourdata.eu/api-docs/index.html)).

### OYDID Repository
For `did:oyd` the DID document and associated logs are stored in a repository. In this tutorial we use the default OYDID repo (https://oydid.ownyourdata.eu). Read more about [deployment options for OYDID repositories here](https://github.com/OwnYourData/oydid/tree/main/tutorial#deployment).

[back to top](#)

## 1 - Creating a DID

The most simple DID without any services can be created with the following command:

```bash=
echo '' | oydid create
```

Here you specify an empty input `echo ''`, use the default repository for publishing (https://oydid.ownyourdata.eu), and cryptographic material is stored in your local directory (`ls zQm*`). Similarily you can create a simple DID with the following API call:

```bash=
echo '' | curl -H "Content-Type: application/json" -d @- -X POST https://oydid.ownyourdata.eu/1.0/create
```

*Note:* in the above example no private keys were included in the input and therefore random keys were generated and returned in the response

A number of options (either on the command line or via the JSON input of the API call) are available to specify specific aspects of the DID creation process. Among the most frequent options on the command line are:  
* `-l`: choose a repository
* `--doc-pwd` and `-rev-pwd`: use a passphrase as input for the document and revocation key
* `-z`: us a specific timestamp (instead of the current time) for DID creation to have a reproducible output

Either run `oydid --help` to see all available options on the command line or find a description for the [inputs for API calls here](https://github.com/OwnYourData/oydid/tree/main/uni-registrar-driver-did-oyd#driver-input-options).

In the next sections we are using a DID created with the following command:

* on the command line:  
  ```bash=
  echo '{"service":{"serviceEndpoint":"https://babelfish.data-container.net/list"}}' | \
  oydid create --doc-pwd pwd1 --rev-pwd pwd2 -z 1 -s
  ```

* or via API:
  ```bash=
  echo '{
    "options": {
      "ts": 1
    },
    "secret": {
      "doc_pwd": "pwd1",
      "rev_pwd": "pwd2"
    },
    "didDocument": {
       "service": {
         "serviceEndpoint":"https://babelfish.data-container.net/list"
      }
    }
  }' | curl -H "Content-Type: application/json" -d @- -X POST https://oydid.ownyourdata.eu/1.0/create
  ```

Both commands create the DID: [`did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud`](https://resolver.identity.foundation/#did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud)

[back to top](#)

## 2 - Resolving a DID

Resolving a DID can be performed on the command line with `oydid read`:

```bash
oydid read did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud
```

The response of this command is a JSON object with the internal representation of the DID Document:  
* `doc`: the payload
* `key`: public keys
* `log`: reference to the associated log

```json
{
  "doc": {
    "service": {
      "serviceEndpoint": "https://babelfish.data-container.net/list"
    }
  },
  "key": "z6MuvWooepYBxXLdYggPjxfEZCW3DqDhapLCnYDxnQjkoShA:z6Mv2CANJwu6QJfowhyqeFp5VoZUL4RyNZDwRcpgNrLVc5dh",
  "log": "zQmTjbVKvYJnDzkyEU7xd5uhiGfGcAi9hhckKScAacAfm8o"
}
```

To show the DID in the W3C-conform representation use the `--w3c-did` option:
```console
oydid read --w3c-did did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud
```

and retrieve as output a JSON-LD document:  
```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud",
  "verificationMethod": [
    {
      "id": "did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud#doc-key",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud",
      "publicKeyMultibase": "z6MuvWooepYBxXLdYggPjxfEZCW3DqDhapLCnYDxnQjkoShA"
    },
    {
      "id": "did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud#rev-key",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud",
      "publicKeyMultibase": "z6Mv2CANJwu6QJfowhyqeFp5VoZUL4RyNZDwRcpgNrLVc5dh"
    }
  ],
  "service": [
    {
      "id": "did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud#payload",
      "type": "Custom",
      "serviceEndpoint": "https://babelfish.data-container.net/list"
    }
  ]
}
```

Using the API endpoint `GET /1.0/identifiers` always returns the W3C format:

```bash
curl https://oydid.ownyourdata.eu/1.0/identifiers/did%3Aoyd%3AzQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud
```

And you can always use the [Uniresolver web service](https://uniresolver.io) to display the DID document in your web browser:  
https://resolver.identity.foundation/#did:oyd:zQmZ12f8p68XN4tRsWQY8evKBwNdEiCuWzgSm6ZACifebud

[back to top](#)

## 3 - DID Lifecycle

Managing a DID also involves the basic operations of updating and deactivating:

* Update a DID
  ```bash
  # create DID: did:oyd:zQmRGSK8cpgCPBAzHDZzDkMyJuNeXH9NBo1mHVHvxj2mFt9
  echo '{"did":"new"}' | oydid create --doc-pwd pwd1 --rev-pwd pwd2 -z 1 -s

  # update
  echo '{"did":"updated"}' | oydid update --doc-pwd pwd3 --rev-pwd pwd4 --old-doc-pwd pwd1 --old-rev-pwd pwd2 -z 2 -s did:oyd:zQmRGSK8cpgCPBAzHDZzDkMyJuNeXH9NBo1mHVHvxj2mFt9
  ```

* Revoke
  ```bash
  # revoke DID from above
  oydid revoke --doc-pwd pwd3 --rev-pwd pwd4 did:oyd:zQmaRujAgFCfSQ3v6utQG5yUCtMhbgX5xaEEXoJ5eC6KFzR
  ```

*Note:* you cannot resolve a revoked DID (output: `Error: cannot resolve DID (on reading DID)`) but the logs are still available:
```bash
oydid logs did:oyd:zQmaRujAgFCfSQ3v6utQG5yUCtMhbgX5xaEEXoJ5eC6KFzR
```

[back to top](#)

## 4 - Delegation

The process of delegation involves publishing a public key by an actor and confirming this delegation capability by the DID controller. Based on the architecture of the `did:oyd` method there are 2 keys for managing the DID: a `document key` to be used for any operations performed with the DID (e.g., working with Credentials) and a `revocation key` for publishing updates of the DID itself.

We use the following DID for the examples below:
```bash
echo '{"example":"delegate"}' | oydid create --doc-pwd pwd1 --rev-pwd pwd2 -z 1 -s
# created did:oyd:zQmc5pWjZxFsvaTupL7p3cUzZvrPp86TQMxPerzF3tjzDHB
```

**Publishing a delegation key**  
Delegation for the document key:
```bash
oydid delegate --doc-pwd my-doc-delegate-key -z 2 did:oyd:zQmc5pWjZxFsvaTupL7p3cUzZvrPp86TQMxPerzF3tjzDHB
# delegate log record zQmQBXznhmgfEqTY45knDswHoGxhvV5AHDPajwE6Hu1MPst
```

Delegation for the revocation key:
```bash
oydid delegate --rev-pwd my-rev-delegate-key -z 2 did:oyd:zQmc5pWjZxFsvaTupL7p3cUzZvrPp86TQMxPerzF3tjzDHB
# delegate log record zQmRjpjU3je6uLY5qKV7B1F235ZEzPvo5xRNKJbzv72ygQV
```

*Note:* it is not necessary that the delegator discloses the private key to anyone - only the public key is registered as request for confirmation in the DIDs DAG


**Confirming delegation records**  
For a delegation to become active it is required that the controller of the DID "confirms" delegation requests:

```bash
echo '["zQmQBXznhmgfEqTY45knDswHoGxhvV5AHDPajwE6Hu1MPst","zQmRjpjU3je6uLY5qKV7B1F235ZEzPvo5xRNKJbzv72ygQV"]' | oydid confirm --old-doc-pwd pwd1 --old-rev-pwd pwd2 --doc-pwd pwd3 --rev-pwd pwd4 -z 3 -s did:oyd:zQmc5pWjZxFsvaTupL7p3cUzZvrPp86TQMxPerzF3tjzDHB
```

*Note:* the input for `oydid confirm` is an array of log record references and since it is actually an upate to the DID it requires the same information (old and new document and revocation keys)

**Listing available delegations**
To list currently active keys use the `pubkeys` operation:
```bash
# list document keys
oydid pubkeys did:oyd:zQmc5pWjZxFsvaTupL7p3cUzZvrPp86TQMxPerzF3tjzDHB

# list revocation keys
oydid pubkeys --revocation did:oyd:zQmc5pWjZxFsvaTupL7p3cUzZvrPp86TQMxPerzF3tjzDHB
```

[back to top](#)


## 5 - Rotation  
DID Rotation refers to the process of updating or changing a Decentralized Identifier (DID) while maintaining the continuity and integrity of the digital identity it signifies.

**Create original `did:oyd` DID**  
We create a DID that should be later rotated to another DID method.
```bash
echo '' | oydid create --doc-pwd doc-rot --rev-pwd rev-rot -z 1
```
*Note:* with the above parameters the following DID is created: [`did:oyd:zQmZ7wwgCxkExNeXHm9XLxAKs7Y7pubTKCHQLTxRrA3Fz51`](https://dev.uniresolver.io/#did:oyd:zQmZ7wwgCxkExNeXHm9XLxAKs7Y7pubTKCHQLTxRrA3Fz51) 

**Create new `did:ebsi` DID (for rotation)**  
Using [DanubeTech's GoDiddy](https://godiddy.com/) service and the [EBSI Users Onboarding Service](https://app-pilot.ebsi.eu/users-onboarding/v2) we can set the follwoing to environment variables:
* `GoDIDDY_TOKEN` from https://godiddy.com/dashboard > API Keys
* `EBSI_TOKEN` from https://app-pilot.ebsi.eu/users-onboarding/v2
```bash
echo '{"didDocument": {"@context":["https//www.w3.org/ns/did/v1"],"service": [],"verificationMethod": []}}' | \
jq --arg ebsi_token "$EBSI_TOKEN" '. += {"secret": {"token": $ebsi_token}}' | \
curl -H "Authorization: Bearer $GODIDDY_TOKEN" \
     -H "Content-Type: application/json" -d @- \
     -X POST "https://api.godiddy.com/0.1.0/universal-registrar/create?method=ebsi"
```
Afterwards:
* set `DID_EBSI` to newly created did:ebsi
    ```bash=
    curl -H "Authorization: Bearer $GODIDDY_TOKEN" \
      "https://api.godiddy.com/0.1.0/wallet-service/keys?controller=$DID_EBSI"
    ```
* set `KEY_ID` to `id` in response
    ```bash=
    curl -H "Authorization: Bearer $GODIDDY_TOKEN" \
      "https://api.godiddy.com/0.1.0/wallet-service/keys/$KEY_ID?exportPrivate=true"
    ```
*Note:* the DID created in our example is `did:ebsi:zg1rJyVu5sUdVAc14X3e5ob`

**Add `alsoKnownAs` to original DID pointing to new DID**  
With `DID_OYD` and `DID_EBSI` from above, run on the command line:
```bash=
echo "{\"alsoKnownAs\": \"$DID_EBSI\"}" | \
oydid update $DID_OYD -z 2 \
    --old-doc-pwd doc-rot --doc-pwd doc-rot2 \
    --old-rev-pwd rev-rot --rev-pwd rev-rot2
```

*Note:* the updated DID is now [`did:oyd:zQmaC996sgjL7puygD1TNpWFzgB3Z8tpydYGApxtoP54nRN`](https://dev.uniresolver.io/#did:oyd:zQmaC996sgjL7puygD1TNpWFzgB3Z8tpydYGApxtoP54nRN)

**Deactivate original DID**  
Command line:
```bash=
oydid revoke $DID_OYD --doc-pwd doc-rot2 --rev-pwd rev-rot2
```

**Update new DID with reference (`alsoKnownAs`) to original DID**  
In the last step we add the final pointer in the new DID Document:
```bash
curl https://dev.uniresolver.io/#$DID_EBSI | \
jq --arg did_oyd "$DID_OYD" '. += {"alsoKnownAs": $did_oyd}' | \
jq --arg ebsi_token "$EBSI_TOKEN" '. += {"secret": {"token": $ebsi_token}}' | \
curl -H "Authorization: Bearer $GODIDDY_TOKEN" \
     -H "Content-Type: application/json" -d @- \
     -X POST "https://api.godiddy.com/0.1.0/universal-registrar/update?method=ebsi"
```

The DID Rotation is now complete and rotates [`did:oyd:zQmZ7wwgCxkExNeXHm9XLxAKs7Y7pubTKCHQLTxRrA3Fz51`](https://dev.uniresolver.io/#did:oyd:zQmZ7wwgCxkExNeXHm9XLxAKs7Y7pubTKCHQLTxRrA3Fz51) to [`did:ebsi:zg1rJyVu5sUdVAc14X3e5ob`](https://dev.uniresolver.io/#did:ebsi:zg1rJyVu5sUdVAc14X3e5ob).  
Read more about DID Rotation in our [accompanying blog post](https://www.ownyourdata.eu/en/did-rotation/.

[back to top](#)


## 6 - Verifiable Credentials & Verifiable Presentations

An important application for DIDs is creating an attestation. With OYDID you can create standard-conform Verifiable Credentials and Verifiable Presentations. We use the following DIDs for the examples below:
```bash
echo '{"role":"issuer"}' | oydid create --doc-pwd pwd1 --rev-pwd pwd2 -z 1 -s
# created did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi
echo '{"role":"holder"}' | oydid create --doc-pwd pwd1 --rev-pwd pwd2 -z 1 -s
# created did:oyd:zQmaYFdoySUGip6YX5nueoKn5ATQoAjoj3RFSqbrXCZE21y
```


* Creating a Verifiable Credential  
  provide as input the `credentialSubject`  
  ```bash
  echo '{"sky":"blue"}' | oydid vc --issuer did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi  --doc-pwd pwd1 --holder did:oyd:zQmaYFdoySUGip6YX5nueoKn5ATQoAjoj3RFSqbrXCZE21y
  ```
  Output:
  ```json-ld
  {
    "@context": [
      "https://www.w3.org/ns/credentials/v2"
    ],
    "type": [
      "VerifiableCredential"
    ],
    "issuer": "did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi",
    "issuanceDate": "2023-05-06T23:04:50Z",
    "credentialSubject": {
      "id": "did:oyd:zQmaYFdoySUGip6YX5nueoKn5ATQoAjoj3RFSqbrXCZE21y",
      "sky": "blue"
    },
    "proof": {
      "type": "Ed25519Signature2020",
      "verificationMethod": "did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi",
      "proofPurpose": "assertionMethod",
      "proofValue": "z56MucJgHbDaxsyw41RpEZKJwpphTT2GMPLZBJLyxbZox3LSsVWu75i321cqnFZTCw4qh37UKuLRYVGBiqf9VxoSB"
    },
    "identifier": "zQmZYbxt96d2p6UJCt28GL6i3Fuzcc2n21RNJoRqoZoYGdh"
  }
  ```

* creating only the proof for a Verifiable Credential  
  in case you want to build a Verifiable Credentials with multiple issuers (e.g., for a Data Agreement to be signed by multiple parties) you can also create only the proof section for a given `credentialSubject`:  
  ```bash
  echo '{"sky":"blue"}' | oydid vc-proof --issuer did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi  --doc-pwd pwd1 --holder did:oyd:zQmaYFdoySUGip6YX5nueoKn5ATQoAjoj3RFSqbrXCZE21y
  ```
  Output:
  ```json-ld
  {
    "type": "Ed25519Signature2020",
    "verificationMethod": "did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi",
    "proofPurpose": "assertionMethod",
    "proofValue": "z56MucJgHbDaxsyw41RpEZKJwpphTT2GMPLZBJLyxbZox3LSsVWu75i321cqnFZTCw4qh37UKuLRYVGBiqf9VxoSB"
  }
  ```

* creating a Verifiable Presentation
  Use the following command for the Holder to counter-sign a Verifiable Credential and publish it as Verifiable Presentation:
  ```bash
  echo '{"sky":"blue"}' | oydid vc --issuer did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi  --doc-pwd pwd1 --holder did:oyd:zQmaYFdoySUGip6YX5nueoKn5ATQoAjoj3RFSqbrXCZE21y | \
  oydid vp --doc-pwd pwd1 --holder did:oyd:zQmaYFdoySUGip6YX5nueoKn5ATQoAjoj3RFSqbrXCZE21y
  ```
  Output:
  ```json-ld
  {
    "@context": [
      "https://www.w3.org/ns/credentials/v2"
    ],
    "type": [
      "VerifiablePresentation"
    ],
    "verifiableCredential": [
      {
        "@context": [
          "https://www.w3.org/ns/credentials/v2"
        ],
        "type": [
          "VerifiableCredential"
        ],
        "issuer": "did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi",
        "issuanceDate": "2023-05-06T23:15:59Z",
        "credentialSubject": {
          "id": "did:oyd:zQmaYFdoySUGip6YX5nueoKn5ATQoAjoj3RFSqbrXCZE21y",
          "sky": "blue"
        },
        "proof": {
          "type": "Ed25519Signature2020",
          "verificationMethod": "did:oyd:zQmcNqEN5AJBM4pkfNaqaGvEJWRC99RvwWzLZKa4fruyQhi",
          "proofPurpose": "assertionMethod",
          "proofValue": "z56MucJgHbDaxsyw41RpEZKJwpphTT2GMPLZBJLyxbZox3LSsVWu75i321cqnFZTCw4qh37UKuLRYVGBiqf9VxoSB"
        },
        "identifier": "zQmPMtZMaic8uJTq79eXtuiWysLgXN9pWaokcJ1ce7XQmHo"
      }
    ],
    "proof": {
      "type": "Ed25519Signature2020",
      "created": "2023-05-06T23:15:59Z",
      "verificationMethod": "did:oyd:zQmaYFdoySUGip6YX5nueoKn5ATQoAjoj3RFSqbrXCZE21y",
      "proofPurpose": "authentication",
      "proofValue": "z5fhtrRrV1SvonjxysGofhuG5YnEBCDCTsH4ZGXzpBWyayemLEZ8HNJw74aarcHifZJBxbMVpjFoHwhrnVUrzoUvR"
    },
    "identifier": "zQmXwvFvFkqRwZQq95fLxjBfmXo8XWbs7pGHCtTH8nC9aS2"
  }
  ```

[back to top](#)


&nbsp;

## About  

<img align="right" src="https://raw.githubusercontent.com/OwnYourData/dc-intermediary/main/res/logo-ngi-trustchain-positive.png" height="100">This project has received funding from the European Union’s Horizon 2020 research and innovation program through the [NGI ONTOCHAIN program](https://ontochain.ngi.eu/) under cascade funding agreement No 957338 and the [NGI TRUSTCHAIN program](https://trustchain.ngi.eu/) under cascade funding agreement No 101093274.

<br clear="both" />

## License

[MIT License 2043 - OwnYourData.eu](https://raw.githubusercontent.com/OwnYourData/dc-intermediary/main/LICENSE)
