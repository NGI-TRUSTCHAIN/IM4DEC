import { computeAddress } from 'ethers';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
import Debug from 'debug';
const debug = Debug('veramo:pkh-did-provider');
const isIn = (values, value) => {
    return values.includes(value);
};
export const SECPK1_NAMESPACES = ['eip155'];
export const isValidNamespace = (x) => isIn(SECPK1_NAMESPACES, x);
/**
 * Helper method that can computes the ethereumAddress corresponding to a Secp256k1 public key.
 * @param hexPublicKey A hex encoded public key, optionally prefixed with `0x`
 */
export function toEthereumAddress(hexPublicKey) {
    const publicKey = hexPublicKey.startsWith('0x')
        ? hexPublicKey
        : '0x' + hexPublicKey;
    return computeAddress(publicKey);
}
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:pkh` identifiers
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class PkhDIDProvider extends AbstractIdentifierProvider {
    defaultKms;
    chainId;
    constructor(options) {
        super();
        this.defaultKms = options.defaultKms;
        this.chainId = options?.chainId ? options.chainId : '1';
    }
    async createIdentifier({ kms, options }, context) {
        const namespace = options?.namespace ? options.namespace : 'eip155';
        if (!isValidNamespace(namespace)) {
            debug(`invalid_namespace: '${namespace}'. valid namespaces are: ${SECPK1_NAMESPACES}`);
            throw new Error(`invalid_namespace: '${namespace}'. valid namespaces are: ${SECPK1_NAMESPACES}`);
        }
        let key;
        if (options?.privateKey !== undefined) {
            key = await context.agent.keyManagerImport({
                kms: kms || this.defaultKms,
                type: 'Secp256k1',
                privateKeyHex: options?.privateKey,
            });
        }
        else {
            key = await context.agent.keyManagerCreate({
                kms: kms || this.defaultKms,
                type: 'Secp256k1'
            });
        }
        const evmAddress = toEthereumAddress(key.publicKeyHex);
        if (key !== null) {
            const identifier = {
                did: 'did:pkh:' + namespace + ':' + this.chainId + ':' + evmAddress,
                controllerKeyId: key.kid,
                keys: [key],
                services: [],
            };
            return identifier;
        }
        else {
            debug('Could not create identifier due to some errors');
            throw new Error('unknown_error: could not create identifier due to errors creating or importing keys');
        }
    }
    async updateIdentifier(args, context) {
        throw new Error('illegal_operation: did:pkh update is not possible.');
    }
    async deleteIdentifier(identifier, context) {
        for (const { kid } of identifier.keys) {
            await context.agent.keyManagerDelete({ kid });
        }
        return true;
    }
    async addKey({ identifier, key, options, }, context) {
        throw Error('illegal_operation: did:pkh addKey is not possible.');
    }
    async addService({ identifier, service, options, }, context) {
        throw Error('illegal_operation: did:pkh addService is not possible.');
    }
    async removeKey(args, context) {
        throw Error('illegal_operation: did:pkh removeKey is not possible.');
    }
    async removeService(args, context) {
        throw Error('illegal_operation: did:pkh removeService is not possible.');
    }
}
//# sourceMappingURL=pkh-did-provider.js.map