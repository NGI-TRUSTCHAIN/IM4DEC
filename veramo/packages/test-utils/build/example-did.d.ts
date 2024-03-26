import { IAgentContext, IIdentifier, IKey, IKeyManager, IService } from '@veramo/core-types';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
/**
 * A DID method that uses the information stored by the DID manager to resolve
 */
export declare class ExampleDidProvider extends AbstractIdentifierProvider {
    private defaultKms;
    constructor({ defaultKms }?: {
        defaultKms: string;
    });
    createIdentifier({ kms, alias, options }: {
        kms?: string;
        alias?: string;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<Omit<IIdentifier, 'provider'>>;
    updateIdentifier(args: {
        did: string;
        kms?: string | undefined;
        alias?: string | undefined;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<IIdentifier>;
    deleteIdentifier(identifier: IIdentifier, context: IAgentContext<IKeyManager>): Promise<boolean>;
    addKey({ identifier, key, options }: {
        identifier: IIdentifier;
        key: IKey;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<any>;
    addService({ identifier, service, options }: {
        identifier: IIdentifier;
        service: IService;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<any>;
    removeKey(args: {
        identifier: IIdentifier;
        kid: string;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<any>;
    removeService(args: {
        identifier: IIdentifier;
        id: string;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<any>;
}
//# sourceMappingURL=example-did.d.ts.map