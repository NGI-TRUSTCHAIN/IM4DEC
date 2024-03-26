/**
 * A DID Discovery provider that throws an error for a particular query, used to test error handling.
 */
export class BrokenDiscoveryProvider {
    name = 'broken-discovery';
    async discoverDid(args, context) {
        if (args.query.match(/broken/)) {
            throw new Error(`test_error: let's see how the plugin handles provider errors`);
        }
        return { matches: [], provider: this.name };
    }
}
//# sourceMappingURL=broken-did-discovery.js.map