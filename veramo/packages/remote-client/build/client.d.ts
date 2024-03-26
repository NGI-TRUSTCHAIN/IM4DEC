import { IAgentPlugin, IPluginMethodMap, IAgentPluginSchema } from '@veramo/core-types';
/**
 * This plugin can be used to access the methods of a remote Veramo agent as if they were implemented locally.
 *
 * The remote agent should be provided by {@link @veramo/remote-server#AgentRouter | AgentRouter}, or a similar
 * implementation of this API.
 *
 * The schema of the remote agent is usually provided by {@link @veramo/remote-server#ApiSchemaRouter |
 * ApiSchemaRouter}.
 *
 * @public
 */
export declare class AgentRestClient implements IAgentPlugin {
    readonly methods: IPluginMethodMap;
    readonly schema?: IAgentPluginSchema;
    private url;
    constructor(options: {
        url: string;
        enabledMethods: string[];
        schema?: IAgentPluginSchema;
        headers?: Record<string, string>;
    });
}
//# sourceMappingURL=client.d.ts.map