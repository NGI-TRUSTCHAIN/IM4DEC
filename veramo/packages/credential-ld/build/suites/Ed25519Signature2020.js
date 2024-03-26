import { VeramoLdSignature } from '../ld-suites.js';
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020';
import { asArray, base64ToBytes, bytesToBase64, bytesToMultibase, extractPublicKeyHex, hexToBytes, } from '@veramo/utils';
import Debug from 'debug';
const debug = Debug('veramo:credential-ld:Ed25519Signature2020');
/**
 * Veramo wrapper for the Ed25519Signature2020 suite by digitalcredentials
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export class VeramoEd25519Signature2020 extends VeramoLdSignature {
    getSupportedVerificationType() {
        return 'Ed25519VerificationKey2020';
    }
    getSupportedVeramoKeyType() {
        return 'Ed25519';
    }
    getSuiteForSigning(key, issuerDid, verificationMethodId, context) {
        const controller = issuerDid;
        // DID Key ID
        let id = verificationMethodId;
        const signer = {
            // returns signatureBytes
            sign: async (args) => {
                const messageString = bytesToBase64(args.data);
                const signature = await context.agent.keyManagerSign({
                    keyRef: key.kid,
                    data: messageString,
                    encoding: 'base64',
                    algorithm: 'EdDSA',
                });
                return base64ToBytes(signature);
            },
        };
        const verificationKey = new Ed25519VerificationKey2020({
            id,
            controller,
            publicKeyMultibase: bytesToMultibase(hexToBytes(key.publicKeyHex), 'base58btc', 'ed25519-pub'),
            // signer: () => signer,
            // type: this.getSupportedVerificationType(),
        });
        // overwrite the signer since we're not passing the private key
        verificationKey.signer = () => signer;
        verificationKey.type = this.getSupportedVerificationType();
        return new Ed25519Signature2020({
            key: verificationKey,
            signer: signer,
        });
    }
    getSuiteForVerification() {
        return new Ed25519Signature2020();
    }
    preSigningCredModification(credential) {
        // nothing to do here
    }
    async preDidResolutionModification(didUrl, doc, context) {
        let document = doc;
        // The verification method (key) must contain "https://w3id.org/security/suites/ed25519-2020/v1" context.
        if (document.verificationMethod) {
            document.verificationMethod = asArray(document.verificationMethod)?.map(this.transformVerificationMethod);
        }
        // this signature suite requires the document loader to dereference the DID URL
        if (didUrl.includes('#') && didUrl !== document.id) {
            const contexts = document['@context'];
            try {
                let newDoc = (await context.agent.getDIDComponentById({
                    didDocument: document,
                    didUrl: didUrl,
                }));
                // other signature suites require the full DID document, so as a workaround
                // we'll only return the 2020 verification method, even if the 2018 would also be compatible
                if ([
                    'Ed25519VerificationKey2020',
                    // 'Ed25519VerificationKey2018',
                    // 'JsonWebKey2020'
                ].includes(newDoc.type)) {
                    newDoc['@context'] = [...new Set([...asArray(contexts), ...asArray(document['@context'])])];
                    document = newDoc;
                }
            }
            catch (e) {
                debug(`document loader could not locate DID component by fragment: ${didUrl}`);
            }
        }
        if (document.type === 'Ed25519VerificationKey2020') {
            document = this.transformVerificationMethod(document);
        }
        return document;
    }
    transformVerificationMethod(vm) {
        if (vm.type === 'Ed25519VerificationKey2020') {
            ;
            vm['@context'] = 'https://w3id.org/security/suites/ed25519-2020/v1';
            // publicKeyMultibase is required by this suite
            if (!vm.publicKeyMultibase) {
                const publicKeyHex = extractPublicKeyHex(vm);
                vm.publicKeyMultibase = bytesToMultibase(hexToBytes(publicKeyHex), 'base58btc', 'ed25519-pub');
            }
        }
        return vm;
    }
}
//# sourceMappingURL=Ed25519Signature2020.js.map