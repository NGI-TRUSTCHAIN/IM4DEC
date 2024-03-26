import { IAgent } from '@veramo/core-types';
import { Request, Router } from 'express';
export interface RequestWithAgent extends Request {
    agent?: IAgent;
}
/**
 * @public
 */
export interface RequestWithAgentRouterOptions {
    /**
     * Optional. Pre-configured agent
     */
    agent?: IAgent;
    /**
     * Optional. Function that returns a Promise that resolves to a configured agent for specific request
     */
    getAgentForRequest?: (req: Request) => Promise<IAgent>;
}
/**
 * Creates an expressjs router that adds a Veramo agent to the request object.
 *
 * This is needed by all other routers provided by this package to be able to perform their functions.
 *
 * @param options - Initialization option
 * @returns Expressjs router
 *
 * @public
 */
export declare const RequestWithAgentRouter: (options: RequestWithAgentRouterOptions) => Router;
//# sourceMappingURL=request-agent-router.d.ts.map