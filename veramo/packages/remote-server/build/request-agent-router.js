import { Router } from 'express';
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
export const RequestWithAgentRouter = (options) => {
    const router = Router();
    router.use(async (req, res, next) => {
        if (options.agent) {
            req.agent = options.agent;
        }
        else if (options.getAgentForRequest) {
            req.agent = await options.getAgentForRequest(req);
        }
        else {
            throw Error('[RequestWithAgentRouter] agent or getAgentForRequest is required');
        }
        next();
    });
    return router;
};
//# sourceMappingURL=request-agent-router.js.map