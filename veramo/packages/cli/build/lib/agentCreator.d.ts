import { TAgent, IPluginMethodMap } from '@veramo/core-types';
/**
 * Creates a Veramo agent from a config object containing an `/agent` pointer.
 * @param config - The configuration object
 *
 * @see {@link https://veramo.io/docs/veramo_agent/configuration_internals | Configuration Internals} for details on
 *   the configuration options.
 *
 * @beta - This API may change without a major version bump
 */
export declare function createAgentFromConfig<T extends IPluginMethodMap>(config: object): Promise<TAgent<T>>;
//# sourceMappingURL=agentCreator.d.ts.map