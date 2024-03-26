import { encodeBase64url, decodeBase64url, isJWK } from '@veramo/utils';
function generateDidResolution(jwk, parsed) {
    return new Promise((resolve, reject) => {
        try {
            const sig = jwk.use === 'sig';
            const enc = jwk.use === 'enc';
            const did = `did:jwk:${encodeBase64url(JSON.stringify(jwk))}`;
            const didDocument = {
                id: did,
                '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/jws-2020/v1'],
                verificationMethod: [
                    {
                        id: `${did}#0`,
                        type: 'JsonWebKey2020',
                        controller: did,
                        publicKeyJwk: jwk,
                    },
                ],
                ...(sig && { assertionMethod: [`${did}#0`] }),
                ...(sig && { authentication: [`${did}#0`] }),
                ...(sig && { capabilityInvocation: [`${did}#0`] }),
                ...(sig && { capabilityDelegation: [`${did}#0`] }),
                ...(enc && { keyAgreement: [`${did}#0`] }),
            };
            resolve({
                didDocumentMetadata: {},
                didResolutionMetadata: {
                    contentType: 'application/did+ld+json',
                    pattern: '^(did:jwk:.+)$',
                    did: {
                        didString: did,
                        methodSpecificId: parsed.id,
                        method: 'jwk',
                    },
                },
                didDocument,
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
function parseDidJwkIdentifier(didIdentifier) {
    try {
        const jwk = JSON.parse(decodeBase64url(didIdentifier));
        if (!isJWK(jwk)) {
            throw new Error("illegal_argument: DID identifier doesn't contain a valid JWK");
        }
        return jwk;
    }
    catch (error) {
        throw new Error('illegal_argument: Invalid DID identifier');
    }
}
export const resolveDidJwk = async (did, parsed, resolver, options) => {
    try {
        if (parsed.method !== 'jwk')
            throw Error('illegal_argument: Invalid DID method');
        const didIdentifier = did.split('did:jwk:')[1];
        if (!didIdentifier)
            throw Error('illegal_argument: Invalid DID');
        const jwk = parseDidJwkIdentifier(didIdentifier);
        const didResolution = await generateDidResolution(jwk, parsed);
        return didResolution;
    }
    catch (err) {
        return {
            didDocumentMetadata: {},
            didResolutionMetadata: {
                error: err.message,
            },
            didDocument: null,
        };
    }
};
/**
 * Provides a mapping to a did:jwk resolver, usable by {@link did-resolver#Resolver}.
 *
 * @public
 */
export function getDidJwkResolver() {
    return { jwk: resolveDidJwk };
}
//# sourceMappingURL=resolver.js.map