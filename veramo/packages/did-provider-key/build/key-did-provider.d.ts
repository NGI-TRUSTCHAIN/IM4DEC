import { IAgentContext, IIdentifier, IKey, IKeyManager, IService } from '@veramo/core-types';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
type IContext = IAgentContext<IKeyManager>;
type CreateKeyDidOptions = {
    keyType?: keyof typeof keyCodecs;
    privateKeyHex?: string;
};
declare const keyCodecs: {
    readonly Ed25519: "ed25519-pub";
    readonly X25519: "x25519-pub";
    readonly Secp256k1: "secp256k1-pub";
};
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:key` identifiers
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class KeyDIDProvider extends AbstractIdentifierProvider {
    private defaultKms;
    constructor(options: {
        defaultKms: string;
    });
    createIdentifier({ kms, options }: {
        kms?: string;
        options?: CreateKeyDidOptions;
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
    private importOrGenerateKey;
}
export {};
//# sourceMappingURL=key-did-provider.d.ts.map