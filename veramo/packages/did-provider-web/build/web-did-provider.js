import { AbstractIdentifierProvider } from '@veramo/did-manager';
import Debug from 'debug';
const debug = Debug('veramo:web-did:identifier-provider');
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:web` identifiers
 * @public
 */
export class WebDIDProvider extends AbstractIdentifierProvider {
    defaultKms;
    constructor(options) {
        super();
        this.defaultKms = options.defaultKms;
    }
    async createIdentifier({ kms, alias, options }, context) {
        const keyType = options?.keyType || 'Secp256k1';
        const key = await context.agent.keyManagerCreate({ kms: kms || this.defaultKms, type: keyType });
        const identifier = {
            did: 'did:web:' + alias,
            controllerKeyId: key.kid,
            keys: [key],
            services: [],
        };
        debug('Created', identifier.did);
        return identifier;
    }
    async updateIdentifier(args, context) {
        throw new Error('WebDIDProvider updateIdentifier not supported yet.');
    }
    async deleteIdentifier(identifier, context) {
        for (const { kid } of identifier.keys) {
            await context.agent.keyManagerDelete({ kid });
        }
        return true;
    }
    async addKey({ identifier, key, options }, context) {
        return { success: true };
    }
    async addService({ identifier, service, options }, context) {
        return { success: true };
    }
    async removeKey(args, context) {
        return { success: true };
    }
    async removeService(args, context) {
        return { success: true };
    }
}
//# sourceMappingURL=web-did-provider.js.map