import { parse as parseDidUrl } from 'did-resolver';
import Debug from 'debug';
import { bytesToHex, decodeJoseBlob, extractPublicKeyHex, hexToBytes, isDefined, mapIdentifierKeysToDoc, resolveDidOrThrow, } from '@veramo/utils';
import { x25519 } from '@noble/curves/ed25519';
const debug = Debug('veramo:did-comm:action-handler');
export function createEcdhWrapper(secretKeyRef, context) {
    return async (theirPublicKey) => {
        if (theirPublicKey.length !== 32) {
            throw new Error('invalid_argument: incorrect publicKey key length for X25519');
        }
        const publicKey = { type: 'X25519', publicKeyHex: bytesToHex(theirPublicKey) };
        const shared = await context.agent.keyManagerSharedSecret({ secretKeyRef, publicKey });
        return hexToBytes(shared);
    };
}
export async function extractSenderEncryptionKey(jwe, context) {
    let senderKey = null;
    const protectedHeader = decodeJoseBlob(jwe.protected);
    if (typeof protectedHeader.skid === 'string') {
        const senderDoc = await resolveDidOrThrow(protectedHeader.skid, context);
        const sKey = (await context.agent.getDIDComponentById({
            didDocument: senderDoc,
            didUrl: protectedHeader.skid,
            section: 'keyAgreement',
        }));
        if (![
            'Ed25519VerificationKey2018',
            'X25519KeyAgreementKey2019',
            'JsonWebKey2020',
            'Ed25519VerificationKey2020',
            'X25519KeyAgreementKey2020',
        ].includes(sKey.type)) {
            throw new Error(`not_supported: sender key of type ${sKey.type} is not supported`);
        }
        let publicKeyHex = extractPublicKeyHex(sKey, true);
        senderKey = hexToBytes(publicKeyHex);
    }
    return senderKey;
}
export async function extractManagedRecipients(jwe, context) {
    const parsedDIDs = (jwe.recipients || [])
        .map((recipient) => {
        const kid = recipient?.header?.kid;
        const did = parseDidUrl(kid || '')?.did;
        if (kid && did) {
            return { recipient, kid, did };
        }
        else {
            return null;
        }
    })
        .filter(isDefined);
    let managedRecipients = (await Promise.all(parsedDIDs.map(async ({ recipient, kid, did }) => {
        try {
            const identifier = await context.agent.didManagerGet({ did });
            return { recipient, kid, identifier };
        }
        catch (e) {
            // identifier not found, skip it
            return null;
        }
    }))).filter(isDefined);
    return managedRecipients;
}
export async function mapRecipientsToLocalKeys(managedKeys, context) {
    const potentialKeys = await Promise.all(managedKeys.map(async ({ recipient, kid, identifier }) => {
        // TODO: use caching, since all recipients are supposed to belong to the same identifier
        const identifierKeys = await mapIdentifierKeysToDoc(identifier, 'keyAgreement', context);
        const localKey = identifierKeys.find((key) => key.meta.verificationMethod.id === kid);
        if (localKey) {
            return { localKeyRef: localKey.kid, recipient };
        }
        else {
            return null;
        }
    }));
    const localKeys = potentialKeys.filter(isDefined);
    return localKeys;
}
/**
 * Generate private-public x25519 key pair
 */
export function generateX25519KeyPair() {
    const secretKey = x25519.utils.randomPrivateKey();
    return generateX25519KeyPairFromSeed(secretKey);
}
/**
 * Generate private-public x25519 key pair from a 32 byte secret.
 */
export function generateX25519KeyPairFromSeed(seed) {
    if (seed.length !== 32) {
        throw new Error(`x25519: seed must be 32 bytes`);
    }
    return {
        publicKey: x25519.getPublicKey(seed),
        secretKey: seed,
    };
}
//# sourceMappingURL=utils.js.map