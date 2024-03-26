import { CredentialPayload, DIDDocument, IAgentContext, IKey, TKeyType } from '@veramo/core-types';
import { RequiredAgentMethods, VeramoLdSignature } from '../ld-suites.js';
/**
 * Veramo wrapper for the JsonWebSignature2020 suite by Transmute Industries
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export declare class VeramoJsonWebSignature2020 extends VeramoLdSignature {
    getSupportedVerificationType(): 'JsonWebKey2020';
    getSupportedVeramoKeyType(): TKeyType;
    getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): Promise<any>;
    getSuiteForVerification(): any;
    preSigningCredModification(credential: CredentialPayload): void;
    preDidResolutionModification(didUrl: string, didDoc: DIDDocument): Promise<DIDDocument>;
}
//# sourceMappingURL=JsonWebSignature2020.d.ts.map