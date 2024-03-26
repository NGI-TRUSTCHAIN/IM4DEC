## API Report File for "@veramo/did-comm"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AbstractMessageHandler } from '@veramo/message-handler';
import { IAgentContext } from '@veramo/core-types';
import type { IAgentPlugin } from '@veramo/core-types';
import { IDataStore } from '@veramo/core-types';
import { IDataStoreORM } from '@veramo/core-types';
import { IDIDManager } from '@veramo/core-types';
import { IKeyManager } from '@veramo/core-types';
import { IMediationManager } from '@veramo/mediation-manager';
import { IMessage } from '@veramo/core-types';
import { IMessageHandler } from '@veramo/core-types';
import { IPluginMethodMap } from '@veramo/core-types';
import { IResolver } from '@veramo/core-types';
import { JWE } from 'did-jwt';
import { Message } from '@veramo/message-handler';
import { RecipientDid } from '@veramo/mediation-manager';

// @beta
export abstract class AbstractDIDCommTransport implements IDIDCommTransport {
    constructor(id?: string);
    // (undocumented)
    id: string;
    abstract isServiceSupported(service: any): boolean;
    abstract send(service: any, message: string): Promise<IDIDCommTransportResult>;
}

// @beta
export enum CoordinateMediation {
    // (undocumented)
    MEDIATE_DENY = "https://didcomm.org/coordinate-mediation/3.0/mediate-deny",
    // (undocumented)
    MEDIATE_GRANT = "https://didcomm.org/coordinate-mediation/3.0/mediate-grant",
    // (undocumented)
    MEDIATE_REQUEST = "https://didcomm.org/coordinate-mediation/3.0/mediate-request",
    // (undocumented)
    RECIPIENT_QUERY = "https://didcomm.org/coordinate-mediation/3.0/recipient-query",
    // (undocumented)
    RECIPIENT_QUERY_RESPONSE = "https://didcomm.org/coordinate-mediation/3.0/recipient",
    // (undocumented)
    RECIPIENT_UPDATE = "https://didcomm.org/coordinate-mediation/3.0/recipient-update",
    // (undocumented)
    RECIPIENT_UPDATE_RESPONSE = "https://didcomm.org/coordinate-mediation/3.0/recipient-update-response"
}

// @beta
export class CoordinateMediationMediatorMessageHandler extends AbstractMessageHandler {
    constructor();
    // Warning: (ae-forgotten-export) The symbol "IContext_5" needs to be exported by the entry point index.d.ts
    handle(message: Message, context: IContext_5): Promise<Message>;
}

// @beta
export class CoordinateMediationRecipientMessageHandler extends AbstractMessageHandler {
    constructor();
    handle(message: Message, context: IContext_5): Promise<Message>;
}

// @beta
export class CoordinateMediationV3MediatorMessageHandler extends AbstractMessageHandler {
    constructor();
    // Warning: (ae-forgotten-export) The symbol "Context" needs to be exported by the entry point index.d.ts
    handle(message: Message, context: Context): Promise<Message>;
}

// @beta
export interface CoordinateMediationV3MediatorMessageHandlerOptions {
    // (undocumented)
    isMediateDefaultGrantAll: boolean;
}

// @beta
export class CoordinateMediationV3RecipientMessageHandler extends AbstractMessageHandler {
    constructor();
    handle(message: Message, context: Context): Promise<Message>;
}

// @beta
export function createDeliveryRequestMessage(recipientDidUrl: string, mediatorDidUrl: string): IDIDCommMessage;

// @beta
export function createMediateGrantMessage(recipientDidUrl: string, mediatorDidUrl: string, thid: string): IDIDCommMessage;

// @beta
export function createMediateRequestMessage(recipientDidUrl: string, mediatorDidUrl: string): IDIDCommMessage;

// @beta
export function createStatusRequestMessage(recipientDidUrl: string, mediatorDidUrl: string): IDIDCommMessage;

// @beta
export const createV3DeliveryRequestMessage: (recipientDidUrl: string, mediatorDidUrl: string) => IDIDCommMessage;

// @beta
export const createV3MediateDenyMessage: (recipientDidUrl: string, mediatorDidUrl: string, thid: string) => IDIDCommMessage;

// @beta
export function createV3MediateGrantMessage(recipientDidUrl: string, mediatorDidUrl: string, thid: string): IDIDCommMessage;

// @beta
export function createV3MediateRequestMessage(recipientDidUrl: string, mediatorDidUrl: string): IDIDCommMessage;

// @beta
export const createV3RecipientQueryMessage: (recipientDidUrl: string, mediatorDidUrl: string) => IDIDCommMessage;

// @beta
export const createV3RecipientQueryResponseMessage: (recipientDidUrl: string, mediatorDidUrl: string, thid: string, dids: Record<'recipient_did', RecipientDid>[]) => IDIDCommMessage;

// @beta
export const createV3RecipientUpdateMessage: (recipientDidUrl: string, mediatorDidUrl: string, updates: Update[]) => IDIDCommMessage;

// @beta
export function createV3RecipientUpdateResponseMessage(recipientDidUrl: string, mediatorDidUrl: string, thid: string, updates: UpdateResult[]): IDIDCommMessage;

// @beta
export const createV3StatusRequestMessage: (recipientDidUrl: string, mediatorDidUrl: string) => IDIDCommMessage;

// @beta
export const DELIVERY_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/delivery-request";

// @beta
export class DIDComm implements IAgentPlugin {
    constructor({ transports }?: DIDCommConfig);
    getDidCommMessageMediaType({ message }: IPackedDIDCommMessage): Promise<DIDCommMessageMediaType>;
    readonly methods: IDIDComm;
    packDIDCommMessage(args: IPackDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver>): Promise<IPackedDIDCommMessage>;
    // (undocumented)
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
    sendDIDCommMessage(args: ISendDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver & IMessageHandler>): Promise<ISendDIDCommMessageResponse>;
    // (undocumented)
    sendMessageDIDCommAlpha1(args: ISendMessageDIDCommAlpha1Args, context: IAgentContext<IDIDManager & IKeyManager & IResolver & IMessageHandler>): Promise<IMessage>;
    // (undocumented)
    readonly transports: IDIDCommTransport[];
    unpackDIDCommMessage(args: IUnpackDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver & IMessageHandler>): Promise<IUnpackedDIDCommMessage>;
}

// @beta
export interface DIDCommConfig<T extends IDIDCommTransport = DIDCommHttpTransport> {
    // (undocumented)
    transports?: T[];
}

// @internal
export type _DIDCommEncryptedMessage = JWE;

// @beta
export class DIDCommHttpTransport extends AbstractDIDCommTransport {
    constructor(httpMethod?: 'post' | 'get');
    httpMethod: 'post' | 'get';
    isServiceSupported(service: any): any;
    send(service: any, message: string): Promise<IDIDCommTransportResult>;
}

// @beta
export class DIDCommMessageHandler extends AbstractMessageHandler {
    constructor();
    // Warning: (ae-forgotten-export) The symbol "IContext" needs to be exported by the entry point index.d.ts
    handle(message: Message, context: IContext): Promise<Message>;
}

// @beta
export enum DIDCommMessageMediaType {
    ENCRYPTED = "application/didcomm-encrypted+json",
    PLAIN = "application/didcomm-plain+json",
    SIGNED = "application/didcomm-signed+json"
}

// @beta
export type DIDCommMessagePacking = 'authcrypt' | 'anoncrypt' | 'jws' | 'none' | 'anoncrypt+authcrypt' | 'anoncrypt+jws';

// @internal
export type _DIDCommPlainMessage = IDIDCommMessage & {
    typ: DIDCommMessageMediaType.PLAIN;
};

// @internal
export type _DIDCommSignedMessage = _FlattenedJWS | _GenericJWS;

// @internal
export type _FlattenedJWS = {
    payload: string;
    protected?: string;
    header?: Record<string, any>;
    signature: string;
};

// @internal
export type _GenericJWS = {
    payload: string;
    signatures: [{
        protected?: string;
        header?: Record<string, any>;
        signature: string;
    }];
};

// @beta
export interface IDIDComm extends IPluginMethodMap {
    getDIDCommMessageMediaType(args: IPackedDIDCommMessage): Promise<DIDCommMessageMediaType>;
    packDIDCommMessage(args: IPackDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver>): Promise<IPackedDIDCommMessage>;
    sendDIDCommMessage(args: ISendDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver & IMessageHandler>): Promise<ISendDIDCommMessageResponse>;
    // @deprecated (undocumented)
    sendMessageDIDCommAlpha1(args: ISendMessageDIDCommAlpha1Args, context: IAgentContext<IDIDManager & IKeyManager & IResolver & IMessageHandler>): Promise<IMessage>;
    unpackDIDCommMessage(args: IUnpackDIDCommMessageArgs, context: IAgentContext<IDIDManager & IKeyManager & IResolver>): Promise<IUnpackedDIDCommMessage>;
}

// @beta
export interface IDIDCommMessage {
    // (undocumented)
    attachments?: IDIDCommMessageAttachment[];
    // (undocumented)
    body: any;
    // (undocumented)
    created_time?: string;
    // (undocumented)
    expires_time?: string;
    // (undocumented)
    from?: string;
    // (undocumented)
    from_prior?: string;
    // (undocumented)
    id: string;
    // (undocumented)
    next?: string;
    // (undocumented)
    pthid?: string;
    // (undocumented)
    return_route?: string;
    // (undocumented)
    thid?: string;
    // (undocumented)
    to: string;
    // (undocumented)
    type: string;
}

// @beta
export interface IDIDCommMessageAttachment {
    // (undocumented)
    byte_count?: number;
    // (undocumented)
    data: IDIDCommMessageAttachmentData;
    // (undocumented)
    description?: string;
    // (undocumented)
    filename?: string;
    // (undocumented)
    format?: string;
    // (undocumented)
    id?: string;
    // (undocumented)
    lastmod_time?: string;
    // (undocumented)
    media_type?: string;
}

// @beta
export interface IDIDCommMessageAttachmentData {
    // (undocumented)
    base64?: string;
    // (undocumented)
    hash?: string;
    // (undocumented)
    json?: any;
    // (undocumented)
    jws?: any;
    // (undocumented)
    links?: string[];
}

// @beta
export interface IDIDCommMessageMetaData {
    // (undocumented)
    packing: DIDCommMessagePacking;
}

// @beta
export interface IDIDCommOptions {
    alg?: 'ECDH-ES+A256KW' | 'ECDH-1PU+A256KW' | 'ECDH-ES+XC20PKW' | 'ECDH-1PU+XC20PKW';
    bcc?: string[];
    enc?: 'XC20P' | 'A256GCM' | 'A256CBC-HS512';
    recipientKids?: string[];
}

// @beta
export interface IDIDCommTransport {
    id: string;
    isServiceSupported(service: any): boolean;
    send(service: any, message: string): Promise<IDIDCommTransportResult>;
}

// @beta
export interface IDIDCommTransportResult {
    // (undocumented)
    error?: string;
    // (undocumented)
    result?: string;
    // (undocumented)
    returnMessage?: string;
}

// @beta
export interface IPackDIDCommMessageArgs {
    // (undocumented)
    keyRef?: string;
    // (undocumented)
    message: IDIDCommMessage;
    // (undocumented)
    options?: IDIDCommOptions;
    // (undocumented)
    packing: DIDCommMessagePacking;
}

// @beta
export interface IPackedDIDCommMessage {
    // (undocumented)
    message: string;
}

// @beta
export interface ISendDIDCommMessageArgs {
    // (undocumented)
    messageId: string;
    // (undocumented)
    packedMessage: IPackedDIDCommMessage;
    // (undocumented)
    recipientDidUrl: string;
    // (undocumented)
    returnTransportId?: string;
}

// @beta
export interface ISendDIDCommMessageResponse {
    // (undocumented)
    returnMessage?: IMessage;
    // (undocumented)
    transportId: string;
}

// @beta @deprecated (undocumented)
export interface ISendMessageDIDCommAlpha1Args {
    // (undocumented)
    data: {
        id?: string;
        from: string;
        to: string;
        type: string;
        body: object | string;
    };
    // (undocumented)
    headers?: Record<string, string>;
    // (undocumented)
    save?: boolean;
    // (undocumented)
    url?: string;
}

// @beta
export type IUnpackDIDCommMessageArgs = IPackedDIDCommMessage;

// @beta
export interface IUnpackedDIDCommMessage {
    // (undocumented)
    message: IDIDCommMessage;
    // (undocumented)
    metaData: IDIDCommMessageMetaData;
}

// @beta
export const MEDIATE_DENY_MESSAGE_TYPE = "https://didcomm.org/coordinate-mediation/2.0/mediate-deny";

// @beta
export const MEDIATE_GRANT_MESSAGE_TYPE = "https://didcomm.org/coordinate-mediation/2.0/mediate-grant";

// @beta
export const MEDIATE_REQUEST_MESSAGE_TYPE = "https://didcomm.org/coordinate-mediation/2.0/mediate-request";

// @beta
export enum MessagePickup {
    // (undocumented)
    DELIVERY_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/delivery-request",
    // (undocumented)
    STATUS_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/status-request"
}

// @beta
export class PickupMediatorMessageHandler extends AbstractMessageHandler {
    constructor();
    // Warning: (ae-forgotten-export) The symbol "IContext_4" needs to be exported by the entry point index.d.ts
    handle(message: Message, context: IContext_4): Promise<Message>;
}

// @beta
export class PickupRecipientMessageHandler extends AbstractMessageHandler {
    constructor();
    handle(message: Message, context: IContext_4): Promise<Message>;
}

// @beta
export enum RecipientUpdateResult {
    // (undocumented)
    CLIENT_ERROR = "client_error",
    // (undocumented)
    NO_CHANGE = "no_change",
    // (undocumented)
    SERVER_ERROR = "server_error",
    // (undocumented)
    SUCCESS = "success"
}

// @beta
export class RoutingMessageHandler extends AbstractMessageHandler {
    constructor();
    // Warning: (ae-forgotten-export) The symbol "IContext_3" needs to be exported by the entry point index.d.ts
    handle(message: Message, context: IContext_3): Promise<Message>;
}

// @beta
export const STATUS_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/status-request";

// @beta
export class TrustPingMessageHandler extends AbstractMessageHandler {
    constructor();
    // Warning: (ae-forgotten-export) The symbol "IContext_2" needs to be exported by the entry point index.d.ts
    handle(message: Message, context: IContext_2): Promise<Message>;
}

// @beta
export interface Update {
    // (undocumented)
    action: UpdateAction;
    // (undocumented)
    recipient_did: RecipientDid;
}

// @beta
export enum UpdateAction {
    // (undocumented)
    ADD = "add",
    // (undocumented)
    REMOVE = "remove"
}

// @beta
export interface UpdateResult extends Update {
    // (undocumented)
    result: RecipientUpdateResult;
}

```