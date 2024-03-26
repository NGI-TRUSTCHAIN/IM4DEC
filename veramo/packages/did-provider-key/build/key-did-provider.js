import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { hexToBytes, bytesToMultibase } from '@veramo/utils';
import { SigningKey } from 'ethers';
import Debug from 'debug';
const debug = Debug('veramo:did-key:identifier-provider');
const keyCodecs = {
    Ed25519: 'ed25519-pub',
    X25519: 'x25519-pub',
    Secp256k1: 'secp256k1-pub',
};
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:key` identifiers
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class KeyDIDProvider extends AbstractIdentifierProvider {
    defaultKms;
    constructor(options) {
        super();
        this.defaultKms = options.defaultKms;
    }
    async createIdentifier({ kms, options }, context) {
        const keyType = (options?.keyType && keyCodecs[options?.keyType] && options.keyType) || 'Ed25519';
        const key = await this.importOrGenerateKey({
            kms: kms || this.defaultKms,
            options: {
                keyType,
                ...(options?.privateKeyHex && { privateKeyHex: options.privateKeyHex }),
            },
        }, context);
        const publicKeyHex = key.type === 'Secp256k1' ? SigningKey.computePublicKey('0x' + key.publicKeyHex, true) : key.publicKeyHex;
        const methodSpecificId = bytesToMultibase(hexToBytes(publicKeyHex), 'base58btc', keyCodecs[keyType]);
        const identifier = {
            did: 'did:key:' + methodSpecificId,
            controllerKeyId: key.kid,
            keys: [key],
            services: [],
        };
        debug('Created', identifier.did);
        return identifier;
    }
    async updateIdentifier(args, context) {
        throw new Error('KeyDIDProvider updateIdentifier not supported yet.');
    }
    async deleteIdentifier(identifier, context) {
        for (const { kid } of identifier.keys) {
            await context.agent.keyManagerDelete({ kid });
        }
        return true;
    }
    async addKey({ identifier, key, options }, context) {
        throw Error('KeyDIDProvider addKey not supported');
    }
    async addService({ identifier, service, options }, context) {
        throw Error('KeyDIDProvider addService not supported');
    }
    async removeKey(args, context) {
        throw Error('KeyDIDProvider removeKey not supported');
    }
    async removeService(args, context) {
        throw Error('KeyDIDProvider removeService not supported');
    }
    async importOrGenerateKey(args, context) {
        if (args.options.privateKeyHex) {
            return context.agent.keyManagerImport({
                kms: args.kms || this.defaultKms,
                type: args.options.keyType,
                privateKeyHex: args.options.privateKeyHex,
            });
        }
        return context.agent.keyManagerCreate({
            kms: args.kms || this.defaultKms,
            type: args.options.keyType,
        });
    }
}
//# sourceMappingURL=key-did-provider.js.map