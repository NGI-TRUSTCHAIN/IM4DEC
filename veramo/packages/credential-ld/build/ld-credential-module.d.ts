import { CredentialPayload, IAgentContext, IKey, IResolver, PresentationPayload, VerifiableCredential, VerifiablePresentation } from '@veramo/core-types';
import { LdContextLoader } from './ld-context-loader.js';
import { LdSuiteLoader } from './ld-suite-loader.js';
import { RequiredAgentMethods } from './ld-suites.js';
export declare class LdCredentialModule {
    /**
     * TODO: General Implementation Notes
     * - (SOLVED) EcdsaSecp256k1Signature2019 (Signature) and EcdsaSecp256k1VerificationKey2019 (Key)
     * are not useable right now, since they are not able to work with blockChainId and ECRecover.
     * - DID Fragment Resolution.
     * - Key Manager and Verification Methods: Veramo currently implements no link between those.
     */
    private ldContextLoader;
    ldSuiteLoader: LdSuiteLoader;
    constructor(options: {
        ldContextLoader: LdContextLoader;
        ldSuiteLoader: LdSuiteLoader;
    });
    getDocumentLoader(context: IAgentContext<IResolver>, attemptToFetchContexts?: boolean): any;
    issueLDVerifiableCredential(credential: CredentialPayload, issuerDid: string, key: IKey, verificationMethodId: string, options: any, context: IAgentContext<RequiredAgentMethods>): Promise<VerifiableCredential>;
    signLDVerifiablePresentation(presentation: PresentationPayload, holderDid: string, key: IKey, verificationMethodId: string, challenge: string | undefined, domain: string | undefined, options: any, context: IAgentContext<RequiredAgentMethods>): Promise<VerifiablePresentation>;
    verifyCredential(credential: VerifiableCredential, fetchRemoteContexts: boolean | undefined, options: any, context: IAgentContext<IResolver>): Promise<boolean>;
    verifyPresentation(presentation: VerifiablePresentation, challenge: string | undefined, domain: string | undefined, fetchRemoteContexts: boolean | undefined, options: any, context: IAgentContext<IResolver>): Promise<boolean>;
}
//# sourceMappingURL=ld-credential-module.d.ts.map