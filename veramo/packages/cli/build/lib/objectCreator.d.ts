/**
 * Creates objects from a configuration object and a set of pointers.
 *
 * Example:
 * ```ts
 * const { url } = createObjects({ "rpcUrl": "http://localhost:8545", }, { url: '/rpcUrl' })
 * ```
 *
 * The config can contain references (`$ref`) to other objects within using JSON pointers.
 * Example:
 * ```json
 * {
 *   "rpcUrl": "http://localhost:8545",
 *   "endpoint": {
 *     "url": {
 *       "$ref": "/rpcUrl"
 *     }
 *   }
 * }
 * ```
 *
 * The config object can also contain references to NPM modules using the `$require` property.
 * Example:
 * ```json
 * {
 *   "agent": {
 *     "$require": "@veramo/core#Agent",
 *     "$args": {
 *       "plugins": [
 *         { "$require": "@veramo/did-comm#DIDComm" },
 *       ]
 *     }
 *   }
 * }
 * ```
 *
 * Environment variables can also be specified using the `$env` property.
 *
 * @see Please see {@link https://veramo.io/docs/veramo_agent/configuration_internals | Configuration Internals} for
 *   more information.
 *
 * @param config - The configuration object
 * @param pointers - A map of JSON pointers to objects within that config that you wish to create
 *
 * @beta - This API may change without a major version bump
 */
export declare function createObjects(config: object, pointers: Record<string, string>): Promise<Record<string, any>>;
//# sourceMappingURL=objectCreator.d.ts.map