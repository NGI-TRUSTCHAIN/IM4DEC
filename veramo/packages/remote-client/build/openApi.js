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
export const getOpenApiSchema = (agent, basePath, exposedMethods, name, version) => {
    const agentSchema = agent.getSchema();
    const paths = {};
    const schemas = {};
    const xMethods = {};
    for (const method of exposedMethods) {
        const pathItemObject = {
            post: {
                operationId: method,
                description: agentSchema.components.methods[method].description,
                requestBody: {
                    content: {
                        'application/json': {
                            schema: agentSchema.components.methods[method].arguments,
                        },
                    },
                },
                responses: {
                    200: {
                        // TODO returnType description
                        description: agentSchema.components.methods[method].description,
                        content: {
                            'application/json; charset=utf-8': {
                                schema: agentSchema.components.methods[method].returnType,
                            },
                        },
                    },
                    400: {
                        description: 'Validation error',
                        content: {
                            'application/json; charset=utf-8': {
                                schema: agentSchema.components.schemas.ValidationError,
                            },
                        },
                    },
                },
            },
        };
        paths[basePath + '/' + method] = pathItemObject;
        xMethods[method] = agentSchema.components.methods[method];
    }
    const openApi = {
        openapi: '3.0.0',
        info: {
            title: name || 'DID Agent',
            version: version || '',
        },
        components: {
            schemas: agent.getSchema().components.schemas,
        },
        paths,
    };
    openApi['x-methods'] = xMethods;
    return openApi;
};
//# sourceMappingURL=openApi.js.map