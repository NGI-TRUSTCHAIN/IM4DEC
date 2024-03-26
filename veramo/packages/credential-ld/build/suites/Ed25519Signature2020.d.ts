import { RequiredAgentMethods, VeramoLdSignature } from '../ld-suites.js';
import { CredentialPayload, DIDDocComponent, DIDDocument, IAgentContext, IKey, IResolver, TKeyType } from '@veramo/core-types';
/**
 * Veramo wrapper for the Ed25519Signature2020 suite by digitalcredentials
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export declare class VeramoEd25519Signature2020 extends VeramoLdSignature {
    getSupportedVerificationType(): string;
    getSupportedVeramoKeyType(): TKeyType;
    getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): Promise<any>;
    getSuiteForVerification(): any;
    preSigningCredModification(credential: CredentialPayload): void;
    preDidResolutionModification(didUrl: string, doc: DIDDocument | Exclude<string, DIDDocComponent>, context: IAgentContext<IResolver>): Promise<DIDDocument | Exclude<string, DIDDocComponent>>;
    private transformVerificationMethod;
}
//# sourceMappingURL=Ed25519Signature2020.d.ts.map