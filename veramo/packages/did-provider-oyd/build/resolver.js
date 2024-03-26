import fetch from 'cross-fetch';
const resolveDidOyd = async (didUrl, _parsed, _resolver, options) => {
    try {
        const baseUrl = 'https://oydid-resolver.data-container.net';
        // const didDoc = await axios.get(`${baseUrl}/1.0/identifiers/${didUrl}`);
        const response = await fetch(`${baseUrl}/1.0/identifiers/${didUrl}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const didDoc = await response.json();
        return didDoc;
    }
    catch (err) {
        return {
            didDocumentMetadata: {},
            didResolutionMetadata: { error: 'invalidDid', message: err.toString() },
            didDocument: null,
        };
    }
};
/**
 * Provides a mapping to a did:oyd resolver, usable by {@link did-resolver#Resolver}.
 *
 * @public
 */
export function getDidOydResolver() {
    return { oyd: resolveDidOyd };
}
//# sourceMappingURL=resolver.js.map