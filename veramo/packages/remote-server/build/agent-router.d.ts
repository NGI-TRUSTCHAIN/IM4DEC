import { Router } from 'express';
/**
 * @public
 */
export interface AgentRouterOptions {
    /**
     * List of exposed methods
     */
    exposedMethods: Array<string>;
}
/**
 * Creates a router that exposes {@link @veramo/core#Agent} methods remotely.
 *
 * This can be used by {@link @veramo/remote-client#AgentRestClient | AgentRestClient} to instantiate the methods of
 * this agent on the client.
 *
 * @param options - Initialization option
 * @returns Expressjs router
 *
 * @public
 */
export declare const AgentRouter: (options: AgentRouterOptions) => Router;
//# sourceMappingURL=agent-router.d.ts.map