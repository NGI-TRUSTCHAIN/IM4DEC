import { IAgentPlugin, IKey, VerifiableCredential, VerifiablePresentation } from '@veramo/core-types';
import { ICreateVerifiableCredentialEIP712Args, ICreateVerifiablePresentationEIP712Args, ICredentialIssuerEIP712, IRequiredContext } from '../types/ICredentialEIP712';
/**
 * A Veramo plugin that implements the {@link ICredentialIssuerEIP712} methods.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class CredentialIssuerEIP712 implements IAgentPlugin {
    readonly methods: ICredentialIssuerEIP712;
    readonly schema: {
        components: {
            schemas: {
                ICreateVerifiableCredentialEIP712Args: {
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
                    };
                    required: string[];
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
                ICreateVerifiablePresentationEIP712Args: {
                    type: string;
                    properties: {
                        presentation: {
                            $ref: string;
                            description: string;
                        };
                        keyRef: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
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
                IVerifyCredentialEIP712Args: {
                    type: string;
                    properties: {
                        credential: {
                            $ref: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IVerifyPresentationEIP712Args: {
                    type: string;
                    properties: {
                        presentation: {
                            $ref: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
            };
            methods: {
                createVerifiableCredentialEIP712: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                createVerifiablePresentationEIP712: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                verifyCredentialEIP712: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                verifyPresentationEIP712: {
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
    constructor();
    /** {@inheritdoc ICredentialIssuerEIP712.createVerifiableCredentialEIP712} */
    createVerifiableCredentialEIP712(args: ICreateVerifiableCredentialEIP712Args, context: IRequiredContext): Promise<VerifiableCredential>;
    /** {@inheritdoc ICredentialIssuerEIP712.verifyCredentialEIP712} */
    private verifyCredentialEIP712;
    /** {@inheritdoc ICredentialIssuerEIP712.createVerifiablePresentationEIP712} */
    createVerifiablePresentationEIP712(args: ICreateVerifiablePresentationEIP712Args, context: IRequiredContext): Promise<VerifiablePresentation>;
    /** {@inheritdoc ICredentialIssuerEIP712.verifyPresentationEIP712} */
    private verifyPresentationEIP712;
    /**
     * Checks if a key is suitable for signing EIP712 payloads.
     * This relies on the metadata set by the key management system to determine if this key can sign EIP712 payloads.
     *
     * @param k - the key to check
     *
     * @internal
     */
    matchKeyForEIP712(k: IKey): Promise<boolean>;
}
//# sourceMappingURL=CredentialEIP712.d.ts.map