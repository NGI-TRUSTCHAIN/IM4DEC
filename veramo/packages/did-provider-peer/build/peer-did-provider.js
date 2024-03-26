import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { bytesToBase64url, bytesToMultibase, hexToBytes, stringToUtf8Bytes } from '@veramo/utils';
import Debug from 'debug';
const debug = Debug('veramo:did-peer:identifier-provider');
const ServiceReplacements = {
    type: 't',
    DIDCommMessaging: 'dm',
    serviceEndpoint: 's',
    routingKeys: 'r',
    accept: 'a',
};
const encodeService = (service) => {
    let encoded = JSON.stringify(service);
    Object.values(ServiceReplacements).forEach((v, idx) => {
        encoded = encoded.replace(Object.keys(ServiceReplacements)[idx], v);
    });
    return bytesToBase64url(stringToUtf8Bytes(encoded));
};
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:key` identifiers
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class PeerDIDProvider extends AbstractIdentifierProvider {
    defaultKms;
    constructor(options) {
        super();
        this.defaultKms = options.defaultKms;
    }
    async createIdentifier({ kms, options }, context) {
        if (options.num_algo == 0) {
            const key = await context.agent.keyManagerCreate({ kms: kms || this.defaultKms, type: 'Ed25519' });
            const methodSpecificId = bytesToMultibase(hexToBytes(key.publicKeyHex), 'base58btc', 'ed25519-pub');
            const identifier = {
                did: 'did:peer:0' + methodSpecificId,
                controllerKeyId: key.kid,
                keys: [key],
                services: [],
            };
            debug('Created', identifier.did);
            return identifier;
        }
        else if (options.num_algo == 1) {
            throw new Error(`'PeerDIDProvider num algo ${options.num_algo} not supported yet.'`);
        }
        else if (options.num_algo == 2) {
            const authKey = await context.agent.keyManagerCreate({ kms: kms || this.defaultKms, type: 'Ed25519' });
            const agreementKey = await context.agent.keyManagerCreate({
                kms: kms || this.defaultKms,
                type: 'X25519',
            });
            const authKeyText = bytesToMultibase(hexToBytes(authKey.publicKeyHex), 'base58btc', 'ed25519-pub');
            const agreementKeyText = bytesToMultibase(hexToBytes(agreementKey.publicKeyHex), 'base58btc', 'x25519-pub');
            const ServiceEncoded = encodeService(options.service);
            const identifier = {
                did: `did:peer:2.E${agreementKeyText}.V${authKeyText}.S${ServiceEncoded}`,
                controllerKeyId: authKey.kid,
                keys: [authKey, agreementKey],
                services: [options.service],
            };
            debug('Created', identifier.did);
            return identifier;
        }
        else {
            throw new Error(`'PeerDIDProvider num algo ${options.num_algo} not supported yet.'`);
        }
    }
    async updateIdentifier(args, context) {
        throw new Error('PeerDIDProvider updateIdentifier not supported yet.');
    }
    async deleteIdentifier(identifier, context) {
        for (const { kid } of identifier.keys) {
            await context.agent.keyManagerDelete({ kid });
        }
        return true;
    }
    async addKey({ identifier, key, options }, context) {
        throw Error('PeerDIDProvider addKey not supported');
    }
    async addService({ identifier, service, options }, context) {
        throw Error('PeerDIDProvider addService not supported');
    }
    async removeKey(args, context) {
        throw Error('PeerDIDProvider removeKey not supported');
    }
    async removeService(args, context) {
        throw Error('PeerDIDProvider removeService not supported');
    }
}
//# sourceMappingURL=peer-did-provider.js.map