import { IAgentContext, IDataStoreORM } from '@veramo/core-types';
import { AbstractDidDiscoveryProvider, IDIDDiscoveryProviderResult, IDIDDiscoveryDiscoverDidArgs } from '@veramo/did-discovery';
/**
 * This implementation of {@link @veramo/did-discovery#AbstractDidDiscoveryProvider | AbstractDidDiscoveryProvider}
 * helps you discover DIDs based on data that is stored by a local plugin that implements
 * {@link @veramo/core-types#IDataStoreORM | IDataStoreORM}.
 *
 * DIDs can be discovered by partial matches of `name` from `Profile` credentials, by partial matches of `alias` of
 * managed DIDs as well as partial matches of DIDs that are issuer or subject of credentials.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class DataStoreDiscoveryProvider implements AbstractDidDiscoveryProvider {
    readonly name = "data-store-discovery";
    discoverDid(args: IDIDDiscoveryDiscoverDidArgs, context: IAgentContext<IDataStoreORM>): Promise<IDIDDiscoveryProviderResult>;
}
//# sourceMappingURL=did-discovery-provider.d.ts.map