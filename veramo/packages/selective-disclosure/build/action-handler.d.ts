import { IAgentContext, IAgentPlugin, ICredentialIssuer, IDataStoreORM, IDIDManager, IKeyManager, VerifiablePresentation } from '@veramo/core-types';
import { ICreateProfileCredentialsArgs, ICreateSelectiveDisclosureRequestArgs, ICredentialsForSdr, IGetVerifiableCredentialsForSdrArgs, IPresentationValidationResult, ISelectiveDisclosure, IValidatePresentationAgainstSdrArgs } from './types.js';
/**
 * This class adds support for creating
 * {@link https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md | Selective Disclosure}
 * requests and interpret the responses received.
 *
 * This implementation of the uPort protocol uses
 * {@link https://www.w3.org/TR/vc-data-model/#presentations | W3C Presentation}
 * as the response encoding instead of a `shareReq`.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class SelectiveDisclosure implements IAgentPlugin {
    readonly methods: ISelectiveDisclosure;
    readonly schema: {
        components: {
            schemas: {
                ICreateProfileCredentialsArgs: {
                    type: string;
                    properties: {
                        holder: {
                            type: string;
                            description: string;
                        };
                        verifier: {
                            type: string;
                            description: string;
                        };
                        name: {
                            type: string;
                            description: string;
                        };
                        picture: {
                            type: string;
                            description: string;
                        };
                        url: {
                            type: string;
                            description: string;
                        };
                        save: {
                            type: string; /**
                             * This class adds support for creating
                             * {@link https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md | Selective Disclosure}
                             * requests and interpret the responses received.
                             *
                             * This implementation of the uPort protocol uses
                             * {@link https://www.w3.org/TR/vc-data-model/#presentations | W3C Presentation}
                             * as the response encoding instead of a `shareReq`.
                             *
                             * @beta This API may change without a BREAKING CHANGE notice.
                             */
                            description: string;
                        };
                        send: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
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
                                    type: string; /**
                                     * Creates a Selective disclosure request, encoded as a JWT.
                                     *
                                     * @remarks See
                                     *   {@link https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md | Selective Disclosure}
                                     *
                                     * @param args - The param object with the properties necessary to create the request. See
                                     *   {@link ISelectiveDisclosureRequest}
                                     * @param context - *RESERVED* This is filled by the framework when the method is called.
                                     *
                                     * @beta This API may change without a BREAKING CHANGE notice.
                                     */
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
                ProofType: {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                        };
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
                ICreateSelectiveDisclosureRequestArgs: {
                    type: string;
                    properties: {
                        data: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                ISelectiveDisclosureRequest: {
                    type: string;
                    properties: {
                        issuer: {
                            type: string;
                            description: string;
                        };
                        subject: {
                            type: string;
                            description: string;
                        };
                        replyUrl: {
                            type: string;
                            description: string;
                        };
                        tag: {
                            type: string;
                        };
                        claims: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        credentials: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                ICredentialRequestInput: {
                    type: string;
                    properties: {
                        reason: {
                            type: string;
                            description: string;
                        };
                        essential: {
                            type: string;
                            description: string;
                        };
                        credentialType: {
                            type: string;
                            description: string;
                        };
                        credentialContext: {
                            type: string;
                            description: string;
                        };
                        claimType: {
                            type: string;
                            description: string;
                        };
                        claimValue: {
                            type: string;
                            description: string;
                        };
                        issuers: {
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
                Issuer: {
                    type: string;
                    properties: {
                        did: {
                            type: string;
                            description: string;
                        };
                        url: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IGetVerifiableCredentialsForSdrArgs: {
                    type: string;
                    properties: {
                        sdr: {
                            type: string;
                            properties: {
                                subject: {
                                    type: string;
                                    description: string;
                                };
                                replyUrl: {
                                    type: string;
                                    description: string;
                                };
                                tag: {
                                    type: string;
                                };
                                claims: {
                                    type: string;
                                    items: {
                                        $ref: string;
                                    };
                                    description: string;
                                };
                                credentials: {
                                    type: string;
                                    items: {
                                        type: string;
                                    };
                                    description: string;
                                };
                            };
                            required: string[];
                            description: string;
                        };
                        did: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                ICredentialsForSdr: {
                    type: string;
                    properties: {
                        reason: {
                            type: string;
                            description: string;
                        };
                        essential: {
                            type: string;
                            description: string;
                        };
                        credentialType: {
                            type: string;
                            description: string;
                        };
                        credentialContext: {
                            type: string;
                            description: string;
                        };
                        claimType: {
                            type: string;
                            description: string;
                        };
                        claimValue: {
                            type: string;
                            description: string;
                        };
                        issuers: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        credentials: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    required: string[];
                    description: string;
                };
                UniqueVerifiableCredential: {
                    type: string;
                    properties: {
                        hash: {
                            type: string;
                        };
                        verifiableCredential: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IValidatePresentationAgainstSdrArgs: {
                    type: string;
                    properties: {
                        presentation: {
                            $ref: string;
                        };
                        sdr: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IPresentationValidationResult: {
                    type: string;
                    properties: {
                        valid: {
                            type: string;
                        };
                        claims: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    required: string[];
                    description: string;
                };
            };
            methods: {
                createProfilePresentation: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                createSelectiveDisclosureRequest: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                getVerifiableCredentialsForSdr: {
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
                validatePresentationAgainstSdr: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
            };
        };
    };
    constructor();
    /**
     * Creates a Selective disclosure request, encoded as a JWT.
     *
     * @remarks See
     *   {@link https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md | Selective Disclosure}
     *
     * @param args - The param object with the properties necessary to create the request. See
     *   {@link ISelectiveDisclosureRequest}
     * @param context - *RESERVED* This is filled by the framework when the method is called.
     *
     * @beta This API may change without a BREAKING CHANGE notice.
     */
    createSelectiveDisclosureRequest(args: ICreateSelectiveDisclosureRequestArgs, context: IAgentContext<IDIDManager & IKeyManager>): Promise<string>;
    /**
     * Gathers the required credentials necessary to fulfill a Selective Disclosure Request.
     * It uses a {@link @veramo/core-types#IDataStoreORM} plugin implementation to query the local database for
     * the required credentials.
     *
     * @param args - Contains the Request to be fulfilled and the DID of the subject
     * @param context - *RESERVED* This is filled by the framework when the method is called.
     *
     * @beta This API may change without a BREAKING CHANGE notice.
     */
    getVerifiableCredentialsForSdr(args: IGetVerifiableCredentialsForSdrArgs, context: IAgentContext<IDataStoreORM>): Promise<ICredentialsForSdr[]>;
    /**
     * Validates a
     * {@link https://github.com/uport-project/specs/blob/develop/flows/selectivedisclosure.md | Selective Disclosure response} encoded as a `Presentation`
     *
     * @param args - Contains the request and the response `Presentation` that needs to be checked.
     * @param context - *RESERVED* This is filled by the framework when the method is called.
     *
     * @beta This API may change without a BREAKING CHANGE notice.
     */
    validatePresentationAgainstSdr(args: IValidatePresentationAgainstSdrArgs, context: IAgentContext<{}>): Promise<IPresentationValidationResult>;
    /**
     * Creates profile credentials
     *
     * @beta This API may change without a BREAKING CHANGE notice.
     */
    createProfilePresentation(args: ICreateProfileCredentialsArgs, context: IAgentContext<ICredentialIssuer & IDIDManager>): Promise<VerifiablePresentation>;
}
//# sourceMappingURL=action-handler.d.ts.map