import { RequiredAgentMethods, VeramoLdSignature } from '../ld-suites.js';
import { CredentialPayload, DIDDocument, IAgentContext, IKey, TKeyType } from '@veramo/core-types';
/**
 * Veramo wrapper for the EcdsaSecp256k1RecoverySignature2020 suite by Transmute Industries
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export declare class VeramoEcdsaSecp256k1RecoverySignature2020 extends VeramoLdSignature {
    getSupportedVerificationType(): string;
    getSupportedVeramoKeyType(): TKeyType;
    getSuiteForSigning(key: IKey, did: string, verifiableMethodId: string, context: IAgentContext<RequiredAgentMethods>): any;
    getSuiteForVerification(): any;
    preSigningCredModification(credential: CredentialPayload): void;
    preDidResolutionModification(didUrl: string, didDoc: DIDDocument): Promise<DIDDocument>;
    getContext(): string;
}
//# sourceMappingURL=EcdsaSecp256k1RecoverySignature2020.d.ts.map