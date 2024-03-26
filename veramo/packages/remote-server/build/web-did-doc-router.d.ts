import { Router } from 'express';
import { ServiceEndpoint } from 'did-resolver';
/**
 * The URL path to the DID document, used by did:web when the identifier is a hostname.
 *
 * @public
 */
export declare const didDocEndpoint = "/.well-known/did.json";
/**
 * @public
 */
export interface WebDidDocRouterOptions {
    services?: ServiceEndpoint[];
}
/**
 * Creates a router that serves `did:web` DID Documents
 *
 * @param options - Initialization option
 * @returns Expressjs router
 *
 * @public
 */
export declare const WebDidDocRouter: (options: WebDidDocRouterOptions) => Router;
//# sourceMappingURL=web-did-doc-router.d.ts.map