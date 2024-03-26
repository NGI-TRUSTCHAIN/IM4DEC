import { IIdentifier, IKey, IService, IAgentContext, IKeyManager } from '@veramo/core-types';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
type IContext = IAgentContext<IKeyManager>;
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:web` identifiers
 * @public
 */
export declare class WebDIDProvider extends AbstractIdentifierProvider {
    private defaultKms;
    constructor(options: {
        defaultKms: string;
    });
    createIdentifier({ kms, alias, options }: {
        kms?: string;
        alias?: string;
        options: any;
    }, context: IContext): Promise<Omit<IIdentifier, 'provider'>>;
    updateIdentifier(args: {
        did: string;
        kms?: string | undefined;
        alias?: string | undefined;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<IIdentifier>;
    deleteIdentifier(identifier: IIdentifier, context: IContext): Promise<boolean>;
    addKey({ identifier, key, options }: {
        identifier: IIdentifier;
        key: IKey;
        options?: any;
    }, context: IContext): Promise<any>;
    addService({ identifier, service, options }: {
        identifier: IIdentifier;
        service: IService;
        options?: any;
    }, context: IContext): Promise<any>;
    removeKey(args: {
        identifier: IIdentifier;
        kid: string;
        options?: any;
    }, context: IContext): Promise<any>;
    removeService(args: {
        identifier: IIdentifier;
        id: string;
        options?: any;
    }, context: IContext): Promise<any>;
}
export {};
//# sourceMappingURL=web-did-provider.d.ts.map