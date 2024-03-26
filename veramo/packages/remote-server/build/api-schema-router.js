import { Router } from 'express';
import { getOpenApiSchema } from '@veramo/remote-client';
/**
 * Creates a router that exposes {@link @veramo/core#Agent} OpenAPI schema
 *
 * @param options - Initialization option
 * @returns Expressjs router
 *
 * @public
 */
export const ApiSchemaRouter = (options) => {
    const router = Router();
    router.get('/', (req, res) => {
        if (req.agent) {
            const openApiSchema = getOpenApiSchema(req.agent, '', options.exposedMethods || req.agent?.availableMethods(), options.apiName, options.apiVersion);
            const url = (req.headers['x-forwarded-proto'] || req.protocol) + '://' + req.hostname + options.basePath;
            openApiSchema.servers = [{ url }];
            if (options.securityScheme && openApiSchema.components) {
                openApiSchema.components.securitySchemes = {
                    auth: { type: 'http', scheme: options.securityScheme },
                };
                openApiSchema.security = [{ auth: [] }];
            }
            res.json(openApiSchema);
        }
        else {
            res.status(500).json({ error: 'Agent not available' });
        }
    });
    return router;
};
//# sourceMappingURL=api-schema-router.js.map