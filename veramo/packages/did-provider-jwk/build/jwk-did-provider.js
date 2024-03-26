import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { encodeJoseBlob, generateJwkFromVerificationMethod } from '@veramo/utils';
import Debug from 'debug';
const debug = Debug('veramo:did-jwk:identifier-provider');
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:jwk` identifiers
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class JwkDIDProvider extends AbstractIdentifierProvider {
    defaultKms;
    constructor(options) {
        super();
        this.defaultKms = options.defaultKms;
    }
    async createIdentifier({ kms, options }, context) {
        const keyType = options?.keyType || 'Secp256k1';
        const key = await this.importOrGenerateKey({
            kms: kms || this.defaultKms,
            options: {
                keyType,
                ...(options?.privateKeyHex && { privateKeyHex: options.privateKeyHex }),
            },
        }, context);
        const jwk = generateJwkFromVerificationMethod(keyType, {
            publicKeyHex: key.publicKeyHex,
        }, options?.keyUse);
        const jwkBase64url = encodeJoseBlob(jwk);
        const identifier = {
            did: `did:jwk:${jwkBase64url}`,
            controllerKeyId: key.kid,
            keys: [key],
            services: [],
        };
        debug('Created', identifier.did);
        return identifier;
    }
    async updateIdentifier(args, context) {
        throw new Error('not_supported: JwkDIDProvider updateIdentifier not possible');
    }
    async deleteIdentifier(identifier, context) {
        for (const { kid } of identifier.keys) {
            await context.agent.keyManagerDelete({ kid });
        }
        return true;
    }
    async addKey({ identifier, key, options }, context) {
        throw Error('not_supported: JwkDIDProvider addKey not possible');
    }
    async addService({ identifier, service, options }, context) {
        throw Error('not_supported: JwkDIDProvider addService not possible');
    }
    async removeKey(args, context) {
        throw Error('not_supported: JwkDIDProvider removeKey not possible');
    }
    async removeService(args, context) {
        throw Error('not_supported: JwkDIDProvider removeService not possible');
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
//# sourceMappingURL=jwk-did-provider.js.map