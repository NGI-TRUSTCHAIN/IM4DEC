import { VeramoLdSignature } from '../ld-suites.js';
import { JsonWebKey, JsonWebSignature } from '@transmute/json-web-signature';
import { asArray, bytesToBase64, bytesToBase64url, concat, encodeJoseBlob, hexToBytes, stringToUtf8Bytes, } from '@veramo/utils';
/**
 * Veramo wrapper for the JsonWebSignature2020 suite by Transmute Industries
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export class VeramoJsonWebSignature2020 extends VeramoLdSignature {
    getSupportedVerificationType() {
        return 'JsonWebKey2020';
    }
    getSupportedVeramoKeyType() {
        return 'Ed25519';
    }
    async getSuiteForSigning(key, issuerDid, verificationMethodId, context) {
        const controller = issuerDid;
        // DID Key ID
        let id = verificationMethodId;
        const signer = {
            // returns a JWS detached
            sign: async (args) => {
                const header = {
                    alg: 'EdDSA',
                    b64: false,
                    crit: ['b64'],
                };
                const headerString = encodeJoseBlob(header);
                const messageBuffer = concat([stringToUtf8Bytes(`${headerString}.`), args.data]);
                const messageString = bytesToBase64(messageBuffer);
                const signature = await context.agent.keyManagerSign({
                    keyRef: key.kid,
                    algorithm: 'EdDSA',
                    data: messageString,
                    encoding: 'base64',
                });
                return `${headerString}..${signature}`;
            },
        };
        const verificationKey = await JsonWebKey.from({
            id: id,
            type: this.getSupportedVerificationType(),
            controller: controller,
            publicKeyJwk: {
                kty: 'OKP',
                crv: 'Ed25519',
                x: bytesToBase64url(hexToBytes(key.publicKeyHex)),
            },
        });
        verificationKey.signer = () => signer;
        const suite = new JsonWebSignature({
            key: verificationKey,
        });
        suite.ensureSuiteContext = ({ document }) => {
            document['@context'] = [
                ...asArray(document['@context'] || []),
                'https://w3id.org/security/suites/jws-2020/v1',
            ];
        };
        return suite;
    }
    getSuiteForVerification() {
        return new JsonWebSignature();
    }
    preSigningCredModification(credential) {
        // nop
    }
    async preDidResolutionModification(didUrl, didDoc) {
        // do nothing
        return didDoc;
    }
}
//# sourceMappingURL=JsonWebSignature2020.js.map