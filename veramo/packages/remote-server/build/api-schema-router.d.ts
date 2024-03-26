import { Router } from 'express';
/**
 * @public
 */
export interface ApiSchemaRouterOptions {
    /**
     * List of exposed methods
     */
    exposedMethods?: Array<string>;
    /**
     * Base path
     */
    basePath: string;
    /**
     * Security scheme
     * @example
     * ```
     * 'bearer'
     * ```
     */
    securityScheme?: string;
    /**
     * Name used in OpenAPI schema
     */
    apiName?: string;
    /**
     * Version used in OpenAPI schema
     */
    apiVersion?: string;
}
/**
 * Creates a router that exposes {@link @veramo/core#Agent} OpenAPI schema
 *
 * @param options - Initialization option
 * @returns Expressjs router
 *
 * @public
 */
export declare const ApiSchemaRouter: (options: ApiSchemaRouterOptions) => Router;
//# sourceMappingURL=api-schema-router.d.ts.map