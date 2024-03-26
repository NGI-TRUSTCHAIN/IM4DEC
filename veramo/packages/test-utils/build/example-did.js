import { AbstractIdentifierProvider } from '@veramo/did-manager';
/**
 * A DID method that uses the information stored by the DID manager to resolve
 */
export class ExampleDidProvider extends AbstractIdentifierProvider {
    defaultKms;
    constructor({ defaultKms } = { defaultKms: 'local' }) {
        super();
        this.defaultKms = defaultKms;
    }
    async createIdentifier({ kms, alias, options }, context) {
        const key = await context.agent.keyManagerCreate({
            kms: kms || this.defaultKms,
            type: options?.type || 'Secp256k1',
        });
        const identifier = {
            did: 'did:example:' + alias,
            controllerKeyId: key.kid,
            keys: [key],
            services: [],
        };
        return identifier;
    }
    async updateIdentifier(args, context) {
        throw new Error('FakeDIDProvider updateIdentifier not supported yet.');
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
//# sourceMappingURL=example-did.js.map