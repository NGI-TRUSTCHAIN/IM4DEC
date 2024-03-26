import { IAgentContext, IIdentifier, IKey, IKeyManager, IService } from '@veramo/core-types';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
type IContext = IAgentContext<IKeyManager>;
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:key` identifiers
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class PeerDIDProvider extends AbstractIdentifierProvider {
    private defaultKms;
    constructor(options: {
        defaultKms: string;
    });
    createIdentifier({ kms, options }: {
        kms?: string;
        options?: any;
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
//# sourceMappingURL=peer-did-provider.d.ts.map