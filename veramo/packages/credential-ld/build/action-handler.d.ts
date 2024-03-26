import { IAgentPlugin, IKey, VerifiableCredential, VerifiablePresentation } from '@veramo/core-types';
import { VeramoLdSignature } from './index.js';
import { OrPromise, RecordLike } from '@veramo/utils';
import { ContextDoc, ICreateVerifiableCredentialLDArgs, ICreateVerifiablePresentationLDArgs, ICredentialIssuerLD, IRequiredContext, IVerifyCredentialLDArgs, IVerifyPresentationLDArgs } from './types.js';
/**
 * A Veramo plugin that implements the {@link ICredentialIssuerLD} methods.
 *
 * @public
 */
export declare class CredentialIssuerLD implements IAgentPlugin {
    readonly methods: ICredentialIssuerLD;
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
    private ldCredentialModule;
    constructor(options: {
        contextMaps: RecordLike<OrPromise<ContextDoc>>[];
        suites: VeramoLdSignature[];
    });
    /** {@inheritdoc ICredentialIssuerLD.createVerifiablePresentationLD} */
    createVerifiablePresentationLD(args: ICreateVerifiablePresentationLDArgs, context: IRequiredContext): Promise<VerifiablePresentation>;
    /** {@inheritdoc ICredentialIssuerLD.createVerifiableCredentialLD} */
    createVerifiableCredentialLD(args: ICreateVerifiableCredentialLDArgs, context: IRequiredContext): Promise<VerifiableCredential>;
    /** {@inheritdoc ICredentialIssuerLD.verifyCredentialLD} */
    verifyCredentialLD(args: IVerifyCredentialLDArgs, context: IRequiredContext): Promise<boolean>;
    /** {@inheritdoc ICredentialIssuerLD.verifyPresentationLD} */
    verifyPresentationLD(args: IVerifyPresentationLDArgs, context: IRequiredContext): Promise<boolean>;
    private findSigningKeyWithId;
    /**
     * Returns true if the key is supported by any of the installed LD Signature suites
     * @param k - the key to verify
     *
     * @internal
     */
    matchKeyForLDSuite(k: IKey): Promise<boolean>;
}
//# sourceMappingURL=action-handler.d.ts.map