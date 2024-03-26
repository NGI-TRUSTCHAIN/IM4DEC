import { AbstractIdentifierProvider } from '@veramo/did-manager';
import fetch from 'cross-fetch';
import Debug from 'debug';
const debug = Debug('veramo:oyd-did:identifier-provider');
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:oyd` identifiers
 * @public
 */
export class OydDIDProvider extends AbstractIdentifierProvider {
    defaultKms;
    constructor(options) {
        super();
        this.defaultKms = options.defaultKms;
    }
    async createIdentifier({ kms, options }, context) {
        const body = { options };
        const url = "https://oydid-registrar.data-container.net/1.0/createIdentifier";
        let didDoc;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            didDoc = await response.json();
        }
        catch (error) {
            throw new Error('There has been a problem with the fetch operation: ' + error.toString());
        }
        const keyType = options?.keyType || 'Ed25519';
        const key = await this.holdKeys({
            kms: kms || this.defaultKms,
            options: {
                keyType,
                kid: didDoc.did + "#key-doc",
                publicKeyHex: didDoc.keys[0].publicKeyHex,
                privateKeyHex: didDoc.keys[0].privateKeyHex,
            },
        }, context);
        const identifier = {
            did: didDoc.did,
            controllerKeyId: key.kid,
            keys: [key],
            services: [],
        };
        debug('Created', identifier.did);
        return identifier;
    }
    async updateIdentifier(args, context) {
        throw new Error('OydDIDProvider updateIdentifier not supported yet.');
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
    async holdKeys(args, context) {
        if (args.options.privateKeyHex) {
            return context.agent.keyManagerImport({
                kms: args.kms || this.defaultKms,
                type: args.options.keyType,
                kid: args.options.kid,
                privateKeyHex: args.options.privateKeyHex,
                meta: {
                    algorithms: ["Ed25519"]
                }
            });
        }
        return context.agent.keyManagerCreate({
            type: args.options.keyType,
            kms: args.kms || this.defaultKms,
            meta: {
                algorithms: ["Ed25519"]
            }
        });
    }
}
//# sourceMappingURL=oyd-did-provider.js.map