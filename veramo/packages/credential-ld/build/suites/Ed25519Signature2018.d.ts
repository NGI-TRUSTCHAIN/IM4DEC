import { RequiredAgentMethods, VeramoLdSignature } from '../ld-suites.js';
import { CredentialPayload, DIDDocument, IAgentContext, IKey, TKeyType } from '@veramo/core-types';
/**
 * Veramo wrapper for the Ed25519Signature2018 suite by Transmute Industries
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export declare class VeramoEd25519Signature2018 extends VeramoLdSignature {
    getSupportedVerificationType(): string;
    getSupportedVeramoKeyType(): TKeyType;
    getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): any;
    getSuiteForVerification(): any;
    preSigningCredModification(credential: CredentialPayload): void;
    preDidResolutionModification(didUrl: string, didDoc: DIDDocument): Promise<DIDDocument>;
}
//# sourceMappingURL=Ed25519Signature2018.d.ts.map