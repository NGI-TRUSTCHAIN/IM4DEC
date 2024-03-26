import { OpenAPIV3 } from 'openapi-types';
import { IAgent } from '@veramo/core-types';
/**
 * This method can be used to generate an OpenAPIv3 schema to describe how the methods of a Veramo agent can be called
 * remotely.
 *
 * @param agent - The agent whose schema needs to be interpreted.
 * @param basePath - The base URL
 * @param exposedMethods - The list of method names available through this schema
 * @param name - The name of the agent
 * @param version - The version of the agent
 *
 * @public
 */
export declare const getOpenApiSchema: (agent: IAgent, basePath: string, exposedMethods: Array<string>, name?: string, version?: string) => OpenAPIV3.Document;
//# sourceMappingURL=openApi.d.ts.map