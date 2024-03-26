import { AccountId } from 'caip';
import { isValidNamespace, SECPK1_NAMESPACES } from './pkh-did-provider.js';
import Debug from 'debug';
const debug = Debug('veramo:pkh-did-resolver');
const DID_LD_JSON = 'application/did+ld+json';
const DID_JSON = 'application/did+json';
function toDidDoc(did, blockchainAccountId) {
    const { namespace } = AccountId.parse(blockchainAccountId)
        .chainId;
    const vmId = did + '#blockchainAccountId';
    const doc = {
        '@context': [
            'https://www.w3.org/ns/did/v1',
            {
                blockchainAccountId: 'https://w3id.org/security#blockchainAccountId',
                EcdsaSecp256k1RecoveryMethod2020: 'https://identity.foundation/EcdsaSecp256k1RecoverySignature2020#EcdsaSecp256k1RecoveryMethod2020',
            },
        ],
        id: did,
        verificationMethod: [
            {
                id: vmId,
                type: 'EcdsaSecp256k1RecoveryMethod2020',
                controller: did,
                blockchainAccountId,
            },
        ],
        authentication: [vmId],
        assertionMethod: [vmId],
    };
    if (!isValidNamespace(namespace)) {
        debug(`Invalid namespace '${namespace}'. Valid namespaces are: ${SECPK1_NAMESPACES}`);
        throw new Error(`illegal_argument: namespace '${namespace}' not supported. Valid namespaces are: ${SECPK1_NAMESPACES}`);
    }
    return doc;
}
/**
 * Creates a DID resolver that resolves PKH DIDs
 *
 * @public
 */
export function getResolver() {
    return {
        pkh: async (did, parsed, r, options) => {
            const contentType = options.accept || DID_JSON;
            const response = {
                didResolutionMetadata: { contentType },
                didDocument: null,
                didDocumentMetadata: {},
            };
            try {
                const doc = toDidDoc(did, parsed.id);
                if (contentType === DID_LD_JSON) {
                    response.didDocument = doc;
                }
                else if (contentType === DID_JSON) {
                    delete doc['@context'];
                    response.didDocument = doc;
                }
                else {
                    delete response.didResolutionMetadata.contentType;
                    response.didResolutionMetadata.error = 'representationNotSupported';
                }
            }
            catch (e) {
                response.didResolutionMetadata.error = 'invalidDid';
                response.didResolutionMetadata.message = e.message;
            }
            return response;
        },
    };
}
//# sourceMappingURL=resolver.js.map