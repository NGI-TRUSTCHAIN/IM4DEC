import { CredentialPayload, DIDDocComponent, IAgentContext, IKey, IKeyManager, IResolver, PresentationPayload, TKeyType } from '@veramo/core-types';
import { DIDDocument } from 'did-resolver';
export type RequiredAgentMethods = IResolver & Pick<IKeyManager, 'keyManagerGet' | 'keyManagerSign'>;
/**
 * Base class for Veramo adapters of LinkedDataSignature suites.
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export declare abstract class VeramoLdSignature {
    abstract getSupportedVerificationType(): string;
    abstract getSupportedVeramoKeyType(): TKeyType;
    abstract getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): any;
    abstract getSuiteForVerification(): any;
    abstract preDidResolutionModification(didUrl: string, didDoc: DIDDocument | DIDDocComponent, context: IAgentContext<IResolver>): Promise<DIDDocument | DIDDocComponent>;
    abstract preSigningCredModification(credential: CredentialPayload): void;
    preSigningPresModification(presentation: PresentationPayload): void;
}
//# sourceMappingURL=ld-suites.d.ts.map