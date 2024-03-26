import type { IAgentContext, IAgentPlugin, IDIDManager, IKeyManager, IMessage, IMessageHandler, IResolver } from '@veramo/core-types';
import { IDIDComm, IPackDIDCommMessageArgs, ISendDIDCommMessageArgs, ISendDIDCommMessageResponse, IUnpackDIDCommMessageArgs } from './types/IDIDComm.js';
import { DIDCommHttpTransport, IDIDCommTransport } from './transports/transports.js';
import { DIDCommMessageMediaType, IPackedDIDCommMessage, IUnpackedDIDCommMessage } from './types/message-types.js';
/**
 * @deprecated Please use {@link IDIDComm.sendDIDCommMessage} instead. This will be removed in Veramo 4.0.
 * Input arguments for {@link IDIDComm.sendMessageDIDCommAlpha1}
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export interface ISendMessageDIDCommAlpha1Args {
    url?: string;
    save?: boolean;
    data: {
        id?: string;
        from: string;
        to: string;
        type: string;
        body: object | string;
    };
    headers?: Record<string, string>;
}
/**
 * The config for the {@link DIDComm} DIDComm plugin.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export interface DIDCommConfig<T extends IDIDCommTransport = DIDCommHttpTransport> {
    transports?: T[];
}
/**
 * DID Comm plugin for {@link @veramo/core#Agent}
 *
 * This plugin provides a method of creating an encrypted message according to the initial
 * {@link https://github.com/decentralized-identifier/DIDComm-js | DIDComm-js} implementation.
 *
 * @remarks Be advised that this spec is still not final and that this protocol may need to change.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class DIDComm implements IAgentPlugin {
    readonly transports: IDIDCommTransport[];
    /** Plugin methods */
    readonly methods: IDIDComm;
    readonly schema: {
        components: {
            schemas: {
                IPackedDIDCommMessage: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                DIDCommMessageMediaType: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                IPackDIDCommMessageArgs: {
                    type: string;
                    properties: {
                        message: {
                            $ref: string;
                        };
                        packing: {
                            $ref: string;
                        };
                        keyRef: {
                            type: string;
                        };
                        options: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDIDCommMessage: {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                        };
                        from: {
                            type: string;
                        };
                        to: {
                            type: string;
                        };
                        thid: {
                            type: string;
                        };
                        pthid: {
                            type: string;
                        };
                        id: {
                            type: string;
                        };
                        expires_time: {
                            type: string;
                        };
                        created_time: {
                            type: string;
                        };
                        next: {
                            type: string;
                        };
                        from_prior: {
                            type: string;
                        };
                        body: {};
                        attachments: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        return_route: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDIDCommMessageAttachment: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                        description: {
                            type: string;
                        };
                        filename: {
                            type: string;
                        };
                        media_type: {
                            type: string;
                        };
                        format: {
                            type: string;
                        };
                        lastmod_time: {
                            type: string;
                        };
                        byte_count: {
                            type: string;
                        };
                        data: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDIDCommMessageAttachmentData: {
                    type: string;
                    properties: {
                        jws: {};
                        hash: {
                            type: string;
                        };
                        links: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        base64: {
                            type: string;
                        };
                        json: {};
                    };
                    description: string;
                };
                DIDCommMessagePacking: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                IDIDCommOptions: {
                    type: string;
                    properties: {
                        bcc: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                        recipientKids: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                        enc: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                        alg: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                    };
                    description: string;
                };
                ISendDIDCommMessageArgs: {
                    type: string;
                    properties: {
                        packedMessage: {
                            $ref: string;
                        };
                        messageId: {
                            type: string;
                        };
                        returnTransportId: {
                            type: string;
                        };
                        recipientDidUrl: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                ISendDIDCommMessageResponse: {
                    type: string;
                    properties: {
                        transportId: {
                            type: string;
                        };
                        returnMessage: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IMessage: {
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
                        createdAt: {
                            type: string;
                            description: string;
                        };
                        expiresAt: {
                            type: string;
                            description: string;
                        };
                        threadId: {
                            type: string;
                            description: string;
                        };
                        raw: {
                            type: string;
                            description: string;
                        };
                        data: {
                            anyOf: {
                                type: string;
                            }[];
                            description: string;
                        };
                        replyTo: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                        replyUrl: {
                            type: string;
                            description: string;
                        };
                        from: {
                            type: string;
                            description: string;
                        };
                        to: {
                            type: string;
                            description: string;
                        };
                        metaData: {
                            anyOf: ({
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            } | {
                                type: string;
                                items?: undefined;
                            })[];
                            description: string;
                        };
                        credentials: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        presentations: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        attachments: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        returnRoute: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IMetaData: {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
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
                            /** {@inheritdoc IDIDComm.getDIDCommMessageMediaType} */
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
                IMessageAttachment: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                        description: {
                            type: string;
                        };
                        filename: {
                            type: string;
                        };
                        media_type: {
                            type: string;
                        };
                        format: {
                            type: string;
                        };
                        lastmod_time: {
                            type: string;
                        };
                        byte_count: {
                            type: string;
                        };
                        data: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IMessageAttachmentData: {
                    type: string;
                    properties: {
                        jws: {};
                        hash: {
                            type: string;
                        };
                        links: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        base64: {
                            type: string;
                        };
                        json: {};
                    };
                    description: string;
                };
                ISendMessageDIDCommAlpha1Args: {
                    type: string;
                    properties: {
                        url: {
                            type: string;
                        };
                        save: {
                            type: string;
                        };
                        data: {
                            type: string;
                            properties: {
                                id: {
                                    type: string;
                                };
                                from: {
                                    type: string;
                                };
                                to: {
                                    type: string;
                                };
                                type: {
                                    type: string;
                                };
                                body: {
                                    anyOf: {
                                        type: string;
                                    }[];
                                };
                            };
                            required: string[];
                        };
                        headers: {
                            type: string;
                            additionalProperties: {
                                type: string;
                            };
                        };
                    };
                    required: string[];
                    deprecated: string;
                };
                IUnpackDIDCommMessageArgs: {
                    $ref: string;
                    description: string;
                };
                IUnpackedDIDCommMessage: {
                    type: string;
                    properties: {
                        metaData: {
                            $ref: string;
                        };
                        message: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDIDCommMessageMetaData: {
                    type: string;
                    properties: {
                        packing: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
            };
            methods: {
                getDIDCommMessageMediaType: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                packDIDCommMessage: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                sendDIDCommMessage: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                sendMessageDIDCommAlpha1: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                unpackDIDCommMessage: {
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
    /**
     * Constructor that takes a list of {@link IDIDCommTransport} objects.
     * @param transports - A list of {@link IDIDCommTransport} objects. Defaults to
     *   {@link @veramo/did-comm#DIDCommHttpTransport | DIDCommHttpTransport}
     */
    constructor({ transports }?: DIDCommConfig);
    /** {@inheritdoc IDIDComm.packDIDCommMessage} */
    packDIDCommMessage(args: IPackDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver>): Promise<IPackedDIDCommMessage>;
    private packDIDCommMessageJWS;
    private packDIDCommMessageJWE;
    /** {@inheritdoc IDIDComm.getDIDCommMessageMediaType} */
    getDidCommMessageMediaType({ message }: IPackedDIDCommMessage): Promise<DIDCommMessageMediaType>;
    /** {@inheritdoc IDIDComm.unpackDIDCommMessage} */
    unpackDIDCommMessage(args: IUnpackDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver & IMessageHandler>): Promise<IUnpackedDIDCommMessage>;
    private unpackDIDCommMessageJWS;
    private unpackDIDCommMessageJWE;
    private decodeMessageAndMediaType;
    private findPreferredDIDCommService;
    private wrapDIDCommForwardMessage;
    /** {@inheritdoc IDIDComm.sendDIDCommMessage} */
    sendDIDCommMessage(args: ISendDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver & IMessageHandler>): Promise<ISendDIDCommMessageResponse>;
    /** {@inheritdoc IDIDComm.sendMessageDIDCommAlpha1} */
    sendMessageDIDCommAlpha1(args: ISendMessageDIDCommAlpha1Args, context: IAgentContext<IDIDManager & IKeyManager & IResolver & IMessageHandler>): Promise<IMessage>;
}
//# sourceMappingURL=didcomm.d.ts.map