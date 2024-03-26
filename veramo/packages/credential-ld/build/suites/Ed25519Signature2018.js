import { bytesToBase64, concat, encodeJoseBlob, hexToBytes, stringToUtf8Bytes } from '@veramo/utils';
import { VeramoLdSignature } from '../ld-suites.js';
import { Ed25519Signature2018, Ed25519VerificationKey2018 } from '@transmute/ed25519-signature-2018';
/**
 * Veramo wrapper for the Ed25519Signature2018 suite by Transmute Industries
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export class VeramoEd25519Signature2018 extends VeramoLdSignature {
    getSupportedVerificationType() {
        return 'Ed25519VerificationKey2018';
    }
    getSupportedVeramoKeyType() {
        return 'Ed25519';
    }
    getSuiteForSigning(key, issuerDid, verificationMethodId, context) {
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
        const verificationKey = new Ed25519VerificationKey2018({
            id,
            controller,
            publicKey: hexToBytes(key.publicKeyHex),
            signer: () => signer,
            type: this.getSupportedVerificationType(),
        });
        // overwrite the signer since we're not passing the private key and transmute doesn't support that behavior
        verificationKey.signer = () => signer;
        return new Ed25519Signature2018({
            key: verificationKey,
            signer: signer,
        });
    }
    getSuiteForVerification() {
        return new Ed25519Signature2018();
    }
    preSigningCredModification(credential) {
        // nothing to do here
    }
    async preDidResolutionModification(didUrl, didDoc) {
        // nothing to do here
        return didDoc;
    }
}
//# sourceMappingURL=Ed25519Signature2018.js.map