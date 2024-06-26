## API Report File for "@veramo/credential-ld"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { CredentialPayload } from '@veramo/core-types';
import { DIDDocComponent } from '@veramo/core-types';
import { DIDDocument } from 'did-resolver';
import { DIDDocument as DIDDocument_2 } from '@veramo/core-types';
import { IAgentContext } from '@veramo/core-types';
import { IAgentPlugin } from '@veramo/core-types';
import { IDIDManager } from '@veramo/core-types';
import { IKey } from '@veramo/core-types';
import { IKeyManager } from '@veramo/core-types';
import { IPluginMethodMap } from '@veramo/core-types';
import { IResolver } from '@veramo/core-types';
import { OrPromise } from '@veramo/utils';
import { PresentationPayload } from '@veramo/core-types';
import { RecordLike } from '@veramo/utils';
import { TKeyType } from '@veramo/core-types';
import { VerifiableCredential } from '@veramo/core-types';
import { VerifiablePresentation } from '@veramo/core-types';

// @beta
export type ContextDoc = {
    '@context': Record<string, any>;
};

// @public
export class CredentialIssuerLD implements IAgentPlugin {
    constructor(options: {
        contextMaps: RecordLike<OrPromise<ContextDoc>>[];
        suites: VeramoLdSignature[];
    });
    // Warning: (ae-incompatible-release-tags) The symbol "createVerifiableCredentialLD" is marked as @public, but its signature references "ICreateVerifiableCredentialLDArgs" which is marked as @beta
    // Warning: (ae-incompatible-release-tags) The symbol "createVerifiableCredentialLD" is marked as @public, but its signature references "IRequiredContext" which is marked as @beta
    createVerifiableCredentialLD(args: ICreateVerifiableCredentialLDArgs, context: IRequiredContext): Promise<VerifiableCredential>;
    // Warning: (ae-incompatible-release-tags) The symbol "createVerifiablePresentationLD" is marked as @public, but its signature references "ICreateVerifiablePresentationLDArgs" which is marked as @beta
    // Warning: (ae-incompatible-release-tags) The symbol "createVerifiablePresentationLD" is marked as @public, but its signature references "IRequiredContext" which is marked as @beta
    createVerifiablePresentationLD(args: ICreateVerifiablePresentationLDArgs, context: IRequiredContext): Promise<VerifiablePresentation>;
    // @internal
    matchKeyForLDSuite(k: IKey): Promise<boolean>;
    // Warning: (ae-incompatible-release-tags) The symbol "methods" is marked as @public, but its signature references "ICredentialIssuerLD" which is marked as @beta
    //
    // (undocumented)
    readonly methods: ICredentialIssuerLD;
    // (undocumented)
    readonly schema: {
        components: {
            schemas: {
                ICreateVerifiableCredentialLDArgs: {
                    type: string;
                    properties: {
                        credential: {
                            $ref: string;
                            description: string;
                        };
                        keyRef: {
                            type: string;
                            description: string;
                        };
                        fetchRemoteContexts: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    additionalProperties: {
                        description: string;
                    };
                    description: string;
                };
                CredentialPayload: {
                    type: string;
                    properties: {
                        issuer: {
                            $ref: string;
                        };
                        credentialSubject: {
                            $ref: string;
                        };
                        type: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        "@context": {
                            $ref: string;
                        };
                        issuanceDate: {
                            $ref: string;
                        };
                        expirationDate: {
                            $ref: string;
                        };
                        credentialStatus: {
                            $ref: string;
                        };
                        id: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IssuerType: {
                    anyOf: ({
                        type: string;
                        properties: {
                            id: {
                                type: string;
                            };
                        };
                        required: string[];
                    } | {
                        type: string;
                        properties?: undefined;
                        required?: undefined;
                    })[];
                    description: string;
                };
                CredentialSubject: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                    };
                    description: string;
                };
                ContextType: {
                    anyOf: ({
                        type: string;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            anyOf: {
                                type: string;
                            }[];
                        };
                    })[];
                    description: string;
                };
                DateType: {
                    type: string;
                    description: string;
                };
                CredentialStatusReference: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                        type: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                VerifiableCredential: {
                    type: string;
                    properties: {
                        proof: {
                            $ref: string;
                        };
                        issuer: {
                            $ref: string;
                        };
                        credentialSubject: {
                            $ref: string;
                        };
                        type: {
                            anyOf: ({
                                type: string;
                                items: {
                                    type: string;
                                };
                            } | {
                                type: string;
                                items?: undefined;
                            })[];
                        };
                        "@context": {
                            $ref: string;
                        };
                        issuanceDate: {
                            type: string;
                        };
                        expirationDate: {
                            type: string;
                        };
                        credentialStatus: {
                            $ref: string;
                        };
                        id: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                ProofType: {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                        };
                    };
                    description: string;
                };
                ICreateVerifiablePresentationLDArgs: {
                    type: string;
                    properties: {
                        presentation: {
                            $ref: string;
                            description: string;
                        };
                        challenge: {
                            type: string;
                            description: string;
                        };
                        domain: {
                            type: string;
                            description: string;
                        };
                        keyRef: {
                            type: string;
                            description: string;
                        };
                        fetchRemoteContexts: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    additionalProperties: {
                        description: string;
                    };
                    description: string;
                };
                PresentationPayload: {
                    type: string;
                    properties: {
                        holder: {
                            type: string;
                        };
                        verifiableCredential: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        type: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        "@context": {
                            $ref: string;
                        };
                        verifier: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        issuanceDate: {
                            $ref: string;
                        };
                        expirationDate: {
                            $ref: string;
                        };
                        id: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                W3CVerifiableCredential: {
                    anyOf: {
                        $ref: string;
                    }[];
                    description: string;
                };
                CompactJWT: {
                    type: string;
                    description: string;
                };
                VerifiablePresentation: {
                    type: string;
                    properties: {
                        proof: {
                            $ref: string;
                        };
                        holder: {
                            type: string;
                        };
                        verifiableCredential: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        type: {
                            anyOf: ({
                                type: string;
                                items: {
                                    type: string;
                                };
                            } | {
                                type: string;
                                items?: undefined;
                            })[];
                        };
                        "@context": {
                            $ref: string;
                        };
                        verifier: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        issuanceDate: {
                            type: string;
                        };
                        expirationDate: {
                            type: string;
                        };
                        id: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IVerifyCredentialLDArgs: {
                    type: string;
                    properties: {
                        credential: {
                            $ref: string;
                            description: string;
                        };
                        fetchRemoteContexts: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    additionalProperties: {
                        description: string;
                    };
                    description: string;
                };
                IVerifyPresentationLDArgs: {
                    type: string;
                    properties: {
                        presentation: {
                            $ref: string;
                            description: string;
                        };
                        challenge: {
                            type: string;
                            description: string;
                        };
                        domain: {
                            type: string;
                            description: string;
                        };
                        fetchRemoteContexts: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    additionalProperties: {
                        description: string;
                    };
                    description: string;
                };
            };
            methods: {
                createVerifiableCredentialLD: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                createVerifiablePresentationLD: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                verifyCredentialLD: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                verifyPresentationLD: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
            };
        };
    };
    // Warning: (ae-incompatible-release-tags) The symbol "verifyCredentialLD" is marked as @public, but its signature references "IVerifyCredentialLDArgs" which is marked as @beta
    // Warning: (ae-incompatible-release-tags) The symbol "verifyCredentialLD" is marked as @public, but its signature references "IRequiredContext" which is marked as @beta
    verifyCredentialLD(args: IVerifyCredentialLDArgs, context: IRequiredContext): Promise<boolean>;
    // Warning: (ae-incompatible-release-tags) The symbol "verifyPresentationLD" is marked as @public, but its signature references "IVerifyPresentationLDArgs" which is marked as @beta
    // Warning: (ae-incompatible-release-tags) The symbol "verifyPresentationLD" is marked as @public, but its signature references "IRequiredContext" which is marked as @beta
    verifyPresentationLD(args: IVerifyPresentationLDArgs, context: IRequiredContext): Promise<boolean>;
}

// @beta
export interface ICreateVerifiableCredentialLDArgs {
    [x: string]: any;
    credential: CredentialPayload;
    fetchRemoteContexts?: boolean;
    keyRef?: string;
}

// @beta
export interface ICreateVerifiablePresentationLDArgs {
    [x: string]: any;
    challenge?: string;
    domain?: string;
    fetchRemoteContexts?: boolean;
    keyRef?: string;
    presentation: PresentationPayload;
}

// @beta
export interface ICredentialIssuerLD extends IPluginMethodMap {
    createVerifiableCredentialLD(args: ICreateVerifiableCredentialLDArgs, context: IRequiredContext): Promise<VerifiableCredential>;
    createVerifiablePresentationLD(args: ICreateVerifiablePresentationLDArgs, context: IRequiredContext): Promise<VerifiablePresentation>;
    // @internal
    matchKeyForLDSuite(key: IKey, context: IAgentContext<{}>): Promise<boolean>;
    verifyCredentialLD(args: IVerifyCredentialLDArgs, context: IRequiredContext): Promise<boolean>;
    verifyPresentationLD(args: IVerifyPresentationLDArgs, context: IRequiredContext): Promise<boolean>;
}

// @beta
export type IRequiredContext = IAgentContext<IResolver & Pick<IDIDManager, 'didManagerGet'> & Pick<IKeyManager, 'keyManagerGet' | 'keyManagerSign'>>;

// @beta
export interface IVerifyCredentialLDArgs {
    [x: string]: any;
    credential: VerifiableCredential;
    fetchRemoteContexts?: boolean;
}

// @beta
export interface IVerifyPresentationLDArgs {
    [x: string]: any;
    challenge?: string;
    domain?: string;
    fetchRemoteContexts?: boolean;
    presentation: VerifiablePresentation;
}

// @beta
export const LdDefaultContexts: Map<string, {
    "@context": {
        "@version": number;
        "@protected": boolean;
        id: string;
        type: string;
        VerifiableCredential: {
            "@id": string;
            "@context": {
                "@version": number;
                "@protected": boolean;
                id: string;
                type: string;
                cred: string;
                sec: string;
                xsd: string;
                credentialSchema: {
                    "@id": string;
                    "@type": string;
                    "@context": {
                        "@version": number;
                        "@protected": boolean;
                        id: string;
                        type: string;
                        cred: string;
                        JsonSchemaValidator2018: string;
                    };
                };
                credentialStatus: {
                    "@id": string;
                    "@type": string;
                };
                credentialSubject: {
                    "@id": string;
                    "@type": string;
                };
                evidence: {
                    "@id": string;
                    "@type": string;
                };
                expirationDate: {
                    "@id": string;
                    "@type": string;
                };
                holder: {
                    "@id": string;
                    "@type": string;
                };
                issued: {
                    "@id": string;
                    "@type": string;
                };
                issuer: {
                    "@id": string;
                    "@type": string;
                };
                issuanceDate: {
                    "@id": string;
                    "@type": string;
                };
                proof: {
                    "@id": string;
                    "@type": string;
                    "@container": string;
                };
                refreshService: {
                    "@id": string;
                    "@type": string;
                    "@context": {
                        "@version": number;
                        "@protected": boolean;
                        id: string;
                        type: string;
                        cred: string;
                        ManualRefreshService2018: string;
                    };
                };
                termsOfUse: {
                    "@id": string;
                    "@type": string;
                };
                validFrom: {
                    "@id": string;
                    "@type": string;
                };
                validUntil: {
                    "@id": string;
                    "@type": string;
                };
            };
        };
        VerifiablePresentation: {
            "@id": string;
            "@context": {
                "@version": number;
                "@protected": boolean;
                id: string;
                type: string;
                cred: string;
                sec: string;
                holder: {
                    "@id": string;
                    "@type": string;
                };
                proof: {
                    "@id": string;
                    "@type": string;
                    "@container": string;
                };
                verifiableCredential: {
                    "@id": string;
                    "@type": string;
                    "@container": string;
                };
            };
        };
        EcdsaSecp256k1Signature2019: {
            "@id": string;
            "@context": {
                "@version": number;
                "@protected": boolean;
                id: string;
                type: string;
                sec: string;
                xsd: string;
                challenge: string;
                created: {
                    "@id": string;
                    "@type": string;
                };
                domain: string;
                expires: {
                    "@id": string;
                    "@type": string;
                };
                jws: string;
                nonce: string;
                proofPurpose: {
                    "@id": string;
                    "@type": string;
                    "@context": {
                        "@version": number;
                        "@protected": boolean;
                        id: string;
                        type: string;
                        sec: string;
                        assertionMethod: {
                            "@id": string;
                            "@type": string;
                            "@container": string;
                        };
                        authentication: {
                            "@id": string;
                            "@type": string;
                            "@container": string;
                        };
                    };
                };
                proofValue: string;
                verificationMethod: {
                    "@id": string;
                    "@type": string;
                };
            };
        };
        EcdsaSecp256r1Signature2019: {
            "@id": string;
            "@context": {
                "@version": number;
                "@protected": boolean;
                id: string;
                type: string;
                sec: string;
                xsd: string;
                challenge: string;
                created: {
                    "@id": string;
                    "@type": string;
                };
                domain: string;
                expires: {
                    "@id": string;
                    "@type": string;
                };
                jws: string;
                nonce: string;
                proofPurpose: {
                    "@id": string;
                    "@type": string;
                    "@context": {
                        "@version": number;
                        "@protected": boolean;
                        id: string;
                        type: string;
                        sec: string;
                        assertionMethod: {
                            "@id": string;
                            "@type": string;
                            "@container": string;
                        };
                        authentication: {
                            "@id": string;
                            "@type": string;
                            "@container": string;
                        };
                    };
                };
                proofValue: string;
                verificationMethod: {
                    "@id": string;
                    "@type": string;
                };
            };
        };
        Ed25519Signature2018: {
            "@id": string;
            "@context": {
                "@version": number;
                "@protected": boolean;
                id: string;
                type: string;
                sec: string;
                xsd: string;
                challenge: string;
                created: {
                    "@id": string;
                    "@type": string;
                };
                domain: string;
                expires: {
                    "@id": string;
                    "@type": string;
                };
                jws: string;
                nonce: string;
                proofPurpose: {
                    "@id": string;
                    "@type": string;
                    "@context": {
                        "@version": number;
                        "@protected": boolean;
                        id: string;
                        type: string;
                        sec: string;
                        assertionMethod: {
                            "@id": string;
                            "@type": string;
                            "@container": string;
                        };
                        authentication: {
                            "@id": string;
                            "@type": string;
                            "@container": string;
                        };
                    };
                };
                proofValue: string;
                verificationMethod: {
                    "@id": string;
                    "@type": string;
                };
            };
        };
        RsaSignature2018: {
            "@id": string;
            "@context": {
                "@version": number;
                "@protected": boolean;
                challenge: string;
                created: {
                    "@id": string;
                    "@type": string;
                };
                domain: string;
                expires: {
                    "@id": string;
                    "@type": string;
                };
                jws: string;
                nonce: string;
                proofPurpose: {
                    "@id": string;
                    "@type": string;
                    "@context": {
                        "@version": number;
                        "@protected": boolean;
                        id: string;
                        type: string;
                        sec: string;
                        assertionMethod: {
                            "@id": string;
                            "@type": string;
                            "@container": string;
                        };
                        authentication: {
                            "@id": string;
                            "@type": string;
                            "@container": string;
                        };
                    };
                };
                proofValue: string;
                verificationMethod: {
                    "@id": string;
                    "@type": string;
                };
            };
        };
        proof: {
            "@id": string;
            "@type": string;
            "@container": string;
        };
    };
}>;

// @alpha
export class VeramoEcdsaSecp256k1RecoverySignature2020 extends VeramoLdSignature {
    // (undocumented)
    getContext(): string;
    // Warning: (ae-forgotten-export) The symbol "RequiredAgentMethods" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    getSuiteForSigning(key: IKey, did: string, verifiableMethodId: string, context: IAgentContext<RequiredAgentMethods>): any;
    // (undocumented)
    getSuiteForVerification(): any;
    // (undocumented)
    getSupportedVeramoKeyType(): TKeyType;
    // (undocumented)
    getSupportedVerificationType(): string;
    // (undocumented)
    preDidResolutionModification(didUrl: string, didDoc: DIDDocument_2): Promise<DIDDocument_2>;
    // (undocumented)
    preSigningCredModification(credential: CredentialPayload): void;
}

// @alpha
export class VeramoEd25519Signature2018 extends VeramoLdSignature {
    // (undocumented)
    getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): any;
    // (undocumented)
    getSuiteForVerification(): any;
    // (undocumented)
    getSupportedVeramoKeyType(): TKeyType;
    // (undocumented)
    getSupportedVerificationType(): string;
    // (undocumented)
    preDidResolutionModification(didUrl: string, didDoc: DIDDocument_2): Promise<DIDDocument_2>;
    // (undocumented)
    preSigningCredModification(credential: CredentialPayload): void;
}

// @alpha
export class VeramoEd25519Signature2020 extends VeramoLdSignature {
    // (undocumented)
    getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): Promise<any>;
    // (undocumented)
    getSuiteForVerification(): any;
    // (undocumented)
    getSupportedVeramoKeyType(): TKeyType;
    // (undocumented)
    getSupportedVerificationType(): string;
    // (undocumented)
    preDidResolutionModification(didUrl: string, doc: DIDDocument_2 | Exclude<string, DIDDocComponent>, context: IAgentContext<IResolver>): Promise<DIDDocument_2 | Exclude<string, DIDDocComponent>>;
    // (undocumented)
    preSigningCredModification(credential: CredentialPayload): void;
}

// @alpha
export class VeramoJsonWebSignature2020 extends VeramoLdSignature {
    // (undocumented)
    getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): Promise<any>;
    // (undocumented)
    getSuiteForVerification(): any;
    // (undocumented)
    getSupportedVeramoKeyType(): TKeyType;
    // (undocumented)
    getSupportedVerificationType(): 'JsonWebKey2020';
    // (undocumented)
    preDidResolutionModification(didUrl: string, didDoc: DIDDocument_2): Promise<DIDDocument_2>;
    // (undocumented)
    preSigningCredModification(credential: CredentialPayload): void;
}

// @alpha
export abstract class VeramoLdSignature {
    // (undocumented)
    abstract getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): any;
    // (undocumented)
    abstract getSuiteForVerification(): any;
    // (undocumented)
    abstract getSupportedVeramoKeyType(): TKeyType;
    // (undocumented)
    abstract getSupportedVerificationType(): string;
    // (undocumented)
    abstract preDidResolutionModification(didUrl: string, didDoc: DIDDocument | DIDDocComponent, context: IAgentContext<IResolver>): Promise<DIDDocument | DIDDocComponent>;
    // (undocumented)
    abstract preSigningCredModification(credential: CredentialPayload): void;
    // (undocumented)
    preSigningPresModification(presentation: PresentationPayload): void;
}

// Warnings were encountered during analysis:
//
// src/action-handler.ts:54:26 - (ae-incompatible-release-tags) The symbol "contextMaps" is marked as @public, but its signature references "ContextDoc" which is marked as @beta
// src/action-handler.ts:54:76 - (ae-incompatible-release-tags) The symbol "suites" is marked as @public, but its signature references "VeramoLdSignature" which is marked as @alpha

```
