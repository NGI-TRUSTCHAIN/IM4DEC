import { IAgentContext, IIdentifier, IKey, IKeyManager, IService } from '@veramo/core-types';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
type IContext = IAgentContext<IKeyManager>;
export declare const SECPK1_NAMESPACES: readonly ["eip155"];
export declare const isValidNamespace: (x: string) => boolean;
/**
 * Options for creating a did:pkh
 * @beta
 */
export interface CreateDidPkhOptions {
    namespace: string;
    privateKey: string;
    /**
     * This can be hex encoded chain ID (string) or a chainId number
     *
     * If this is not specified, `1` is assumed.
     */
    chainId?: string | number;
}
/**
 * Helper method that can computes the ethereumAddress corresponding to a Secp256k1 public key.
 * @param hexPublicKey A hex encoded public key, optionally prefixed with `0x`
 */
export declare function toEthereumAddress(hexPublicKey: string): string;
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:pkh` identifiers
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class PkhDIDProvider extends AbstractIdentifierProvider {
    private defaultKms;
    private chainId;
    constructor(options: {
        defaultKms: string;
        chainId?: string;
    });
    createIdentifier({ kms, options }: {
        kms?: string;
        options?: CreateDidPkhOptions;
    }, context: IContext): Promise<Omit<IIdentifier, 'provider'>>;
    updateIdentifier(args: {
        did: string;
        kms?: string | undefined;
        alias?: string | undefined;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<IIdentifier>;
    deleteIdentifier(identifier: IIdentifier, context: IContext): Promise<boolean>;
    addKey({ identifier, key, options, }: {
        identifier: IIdentifier;
        key: IKey;
        options?: any;
    }, context: IContext): Promise<any>;
    addService({ identifier, service, options, }: {
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
//# sourceMappingURL=pkh-did-provider.d.ts.map