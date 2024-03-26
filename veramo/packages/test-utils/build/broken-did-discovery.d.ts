import { IAgentContext } from '@veramo/core-types';
import { AbstractDidDiscoveryProvider, IDIDDiscoveryDiscoverDidArgs, IDIDDiscoveryProviderResult } from "@veramo/did-discovery";
/**
 * A DID Discovery provider that throws an error for a particular query, used to test error handling.
 */
export declare class BrokenDiscoveryProvider implements AbstractDidDiscoveryProvider {
    readonly name = "broken-discovery";
    discoverDid(args: IDIDDiscoveryDiscoverDidArgs, context: IAgentContext<any>): Promise<IDIDDiscoveryProviderResult>;
}
//# sourceMappingURL=broken-did-discovery.d.ts.map