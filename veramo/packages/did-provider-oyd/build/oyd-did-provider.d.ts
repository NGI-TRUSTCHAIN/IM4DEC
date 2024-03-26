import { IIdentifier, IKey, IService, IAgentContext, IKeyManager } from '@veramo/core-types';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
import type { OydCreateIdentifierOptions } from './types/oyd-provider-types.js';
type IContext = IAgentContext<IKeyManager>;
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:oyd` identifiers
 * @public
 */
export declare class OydDIDProvider extends AbstractIdentifierProvider {
    private defaultKms;
    constructor(options: {
        defaultKms: string;
    });
    createIdentifier({ kms, options }: {
        kms?: string;
        options: OydCreateIdentifierOptions;
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
    private holdKeys;
}
export {};
//# sourceMappingURL=oyd-did-provider.d.ts.map