import { IAgentContext, IDIDManager, IKeyManager } from '@veramo/core-types';
import { IMediationManager, RecipientDid } from '@veramo/mediation-manager';
import { AbstractMessageHandler, Message } from '@veramo/message-handler';
import { IDIDComm } from '../types/IDIDComm.js';
import { IDIDCommMessage } from '../types/message-types.js';
type Context = IAgentContext<IDIDManager & IKeyManager & IDIDComm & IMediationManager>;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Represents the actions (add or remove) that can be taken on a recipient did
 *
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export declare enum UpdateAction {
    ADD = "add",
    REMOVE = "remove"
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Represents the result of an update action
 *
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export declare enum RecipientUpdateResult {
    SUCCESS = "success",
    NO_CHANGE = "no_change",
    CLIENT_ERROR = "client_error",
    SERVER_ERROR = "server_error"
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Parameter options for the CoordinateMediationV3MediatorMessageHandler {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export interface CoordinateMediationV3MediatorMessageHandlerOptions {
    isMediateDefaultGrantAll: boolean;
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Represents the structure of a specific update on RECIPIENT_UPDATE
 */
export interface Update {
    recipient_did: RecipientDid;
    action: UpdateAction;
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Represents an update response on RECIPIENT_UPDATE_RESPONSE
 */
export interface UpdateResult extends Update {
    result: RecipientUpdateResult;
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Represents the types of messages that can be sent and received by the Mediator Coordinator protocol
 *
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 * @see {@link @veramo/did-comm#CoordinateMediationRecipientMessageHandler}
 */
export declare enum CoordinateMediation {
    MEDIATE_REQUEST = "https://didcomm.org/coordinate-mediation/3.0/mediate-request",
    MEDIATE_GRANT = "https://didcomm.org/coordinate-mediation/3.0/mediate-grant",
    MEDIATE_DENY = "https://didcomm.org/coordinate-mediation/3.0/mediate-deny",
    RECIPIENT_UPDATE = "https://didcomm.org/coordinate-mediation/3.0/recipient-update",
    RECIPIENT_UPDATE_RESPONSE = "https://didcomm.org/coordinate-mediation/3.0/recipient-update-response",
    RECIPIENT_QUERY = "https://didcomm.org/coordinate-mediation/3.0/recipient-query",
    RECIPIENT_QUERY_RESPONSE = "https://didcomm.org/coordinate-mediation/3.0/recipient"
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare enum MessagePickup {
    STATUS_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/status-request",
    DELIVERY_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/delivery-request"
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare function createV3MediateGrantMessage(recipientDidUrl: string, mediatorDidUrl: string, thid: string): IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const createV3MediateDenyMessage: (recipientDidUrl: string, mediatorDidUrl: string, thid: string) => IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export declare function createV3RecipientUpdateResponseMessage(recipientDidUrl: string, mediatorDidUrl: string, thid: string, updates: UpdateResult[]): IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export declare const createV3RecipientQueryResponseMessage: (recipientDidUrl: string, mediatorDidUrl: string, thid: string, dids: Record<'recipient_did', RecipientDid>[]) => IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * @returns a structured message for the Mediator Coordinator protocol
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export declare function createV3MediateRequestMessage(recipientDidUrl: string, mediatorDidUrl: string): IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const createV3StatusRequestMessage: (recipientDidUrl: string, mediatorDidUrl: string) => IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * @returns a structured upate message for the Mediator Coordinator protocol
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export declare const createV3RecipientUpdateMessage: (recipientDidUrl: string, mediatorDidUrl: string, updates: Update[]) => IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * @returns a structured query message for the Mediator Coordinator protocol
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export declare const createV3RecipientQueryMessage: (recipientDidUrl: string, mediatorDidUrl: string) => IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const createV3DeliveryRequestMessage: (recipientDidUrl: string, mediatorDidUrl: string) => IDIDCommMessage;
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Mediator Coordinator messages for the mediator role.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class CoordinateMediationV3MediatorMessageHandler extends AbstractMessageHandler {
    constructor();
    private grantOrDenyMediation;
    private handleMediateRequest;
    /**
     * Used to notify the mediator of DIDs in use by the recipient
     **/
    private handleRecipientUpdate;
    /**
     * Query mediator for a list of DIDs registered for this connection
     **/
    private handleRecipientQuery;
    /**
     * Handles a Mediator Coordinator messages for the mediator role
     * https://didcomm.org/mediator-coordination/3.0/
     */
    handle(message: Message, context: Context): Promise<Message>;
}
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Mediator Coordinator messages for the recipient role.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class CoordinateMediationV3RecipientMessageHandler extends AbstractMessageHandler {
    constructor();
    /**
     * Handles a Mediator Coordinator messages for the recipient role
     * https://didcomm.org/mediator-coordination/2.0/
     */
    handle(message: Message, context: Context): Promise<Message>;
}
export {};
//# sourceMappingURL=coordinate-mediation-v3-message-handler.d.ts.map