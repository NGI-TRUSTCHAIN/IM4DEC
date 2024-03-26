import { IAgentPlugin, ICreateVerifiableCredentialArgs, ICreateVerifiablePresentationArgs, ICredentialPlugin, IIdentifier, IKey, IssuerAgentContext, IVerifyCredentialArgs, IVerifyPresentationArgs, IVerifyResult, ProofFormat, VerifiableCredential, VerifiablePresentation, VerifierAgentContext } from '@veramo/core-types';
/**
 * A Veramo plugin that implements the {@link @veramo/core-types#ICredentialPlugin | ICredentialPlugin} methods.
 *
 * @public
 */
export declare class CredentialPlugin implements IAgentPlugin {
    readonly methods: ICredentialPlugin;
    readonly schema: {
        components: {
            schemas: {
                IVerifyCredentialArgs: {
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
                        policies: {
                            $ref: string;
                            description: string;
                        };
                    };
                    required: string[];
                    additionalProperties: {
                        description: string;
                    };
                    description: string;
                };
                W3CVerifiableCredential: {
                    anyOf: {
                        $ref: string;
                    }[];
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
                CompactJWT: {
                    type: string;
                    description: string;
                };
                VerificationPolicies: {
                    type: string;
                    properties: {
                        now: {
                            type: string;
                            description: string;
                        };
                        issuanceDate: {
                            type: string;
                            description: string;
                        };
                        expirationDate: {
                            type: string;
                            description: string;
                        };
                        audience: {
                            type: string;
                            description: string;
                        };
                        credentialStatus: {
                            type: string;
                            description: string;
                        };
                    };
                    additionalProperties: {
                        description: string;
                    };
                    description: string;
                };
                IVerifyResult: {
                    type: string;
                    properties: {
                        verified: {
                            type: string;
                            description: string;
                        };
                        error: {
                            $ref: string;
                            description: string;
                        };
                    };
                    required: string[];
                    additionalProperties: {
                        description: string;
                    };
                    description: string;
                };
                IError: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                            description: string;
                        };
                        errorCode: {
                            type: string;
                            description: string;
                        };
                    };
                    description: string;
                };
                IVerifyPresentationArgs: {
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
                        policies: {
                            $ref: string;
                            description: string;
                        };
                    };
                    required: string[];
                    additionalProperties: {
                        description: string;
                    };
                    description: string;
                };
                W3CVerifiablePresentation: {
                    anyOf: {
                        $ref: string;
                    }[];
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
                ICreateVerifiableCredentialArgs: {
                    type: string;
                    properties: {
                        credential: {
                            $ref: string;
                            description: string;
                        };
                        save: {
                            type: string;
                            description: string;
                            deprecated: string;
                        };
                        proofFormat: {
                            $ref: string;
                            description: string;
                        };
                        removeOriginalFields: {
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
                DateType: {
                    type: string;
                    description: string;
                };
                ProofFormat: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                ICreateVerifiablePresentationArgs: {
                    type: string;
                    properties: {
                        presentation: {
                            $ref: string;
                            description: string;
                        };
                        save: {
                            type: string;
                            description: string;
                            deprecated: string;
                        };
                        challenge: {
                            type: string;
                            description: string;
                        };
                        domain: {
                            type: string;
                            description: string;
                        };
                        proofFormat: {
                            $ref: string;
                            description: string;
                        };
                        removeOriginalFields: {
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
                IIdentifier: {
                    type: string;
                    properties: {
                        did: {
                            type: string;
                            description: string;
                        };
                        alias: {
                            type: string;
                            description: string;
                        };
                        provider: {
                            type: string;
                            description: string;
                        };
                        controllerKeyId: {
                            type: string;
                            description: string;
                        };
                        keys: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        services: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IKey: {
                    type: string;
                    properties: {
                        kid: {
                            type: string;
                            description: string;
                        };
                        kms: {
                            type: string;
                            description: string;
                        };
                        type: {
                            $ref: string;
                            description: string;
                        };
                        publicKeyHex: {
                            type: string;
                            description: string;
                        };
                        privateKeyHex: {
                            type: string;
                            description: string;
                        };
                        meta: {
                            anyOf: ({
                                $ref: string;
                                type?: undefined;
                            } | {
                                type: string;
                                $ref?: undefined;
                            })[];
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                TKeyType: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                KeyMetadata: {
                    type: string;
                    properties: {
                        algorithms: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    description: string;
                };
                TAlg: {
                    type: string;
                    description: string;
                };
                IService: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        type: {
                            type: string;
                            description: string;
                        };
                        serviceEndpoint: {
                            anyOf: ({
                                $ref: string;
                                type?: undefined;
                                items?: undefined;
                            } | {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                                $ref?: undefined;
                            })[];
                            description: string;
                        };
                        description: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IServiceEndpoint: {
                    anyOf: {
                        type: string;
                    }[];
                    description: string;
                };
            };
            methods: {
                verifyCredential: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                verifyPresentation: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                createVerifiableCredential: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                createVerifiablePresentation: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                listUsableProofFormats: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
            };
        };
    };
    constructor();
    /** {@inheritdoc @veramo/core-types#ICredentialIssuer.createVerifiablePresentation} */
    createVerifiablePresentation(args: ICreateVerifiablePresentationArgs, context: IssuerAgentContext): Promise<VerifiablePresentation>;
    /** {@inheritdoc @veramo/core-types#ICredentialIssuer.createVerifiableCredential} */
    createVerifiableCredential(args: ICreateVerifiableCredentialArgs, context: IssuerAgentContext): Promise<VerifiableCredential>;
    /** {@inheritdoc @veramo/core-types#ICredentialVerifier.verifyCredential} */
    verifyCredential(args: IVerifyCredentialArgs, context: VerifierAgentContext): Promise<IVerifyResult>;
    /** {@inheritdoc @veramo/core-types#ICredentialVerifier.verifyPresentation} */
    verifyPresentation(args: IVerifyPresentationArgs, context: VerifierAgentContext): Promise<IVerifyResult>;
    /**
     * Checks if a key is suitable for signing JWT payloads.
     * @param key
     * @param context
     *
     * @internal
     */
    matchKeyForJWT(key: IKey, context: IssuerAgentContext): Promise<boolean>;
    listUsableProofFormats(did: IIdentifier, context: IssuerAgentContext): Promise<ProofFormat[]>;
}
//# sourceMappingURL=action-handler.d.ts.map