import { IAgentContext, IDIDManager, IKeyManager, IDataStore } from '@veramo/core-types';
import { AbstractMessageHandler, Message } from '@veramo/message-handler';
import { IDIDComm } from '../types/IDIDComm.js';
import { IDIDCommMessage } from '../types/message-types.js';
type IContext = IAgentContext<IDIDManager & IKeyManager & IDIDComm & IDataStore>;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const MEDIATE_REQUEST_MESSAGE_TYPE = "https://didcomm.org/coordinate-mediation/2.0/mediate-request";
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const MEDIATE_GRANT_MESSAGE_TYPE = "https://didcomm.org/coordinate-mediation/2.0/mediate-grant";
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const MEDIATE_DENY_MESSAGE_TYPE = "https://didcomm.org/coordinate-mediation/2.0/mediate-deny";
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const STATUS_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/status-request";
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const DELIVERY_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/delivery-request";
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare function createMediateRequestMessage(recipientDidUrl: string, mediatorDidUrl: string): IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare function createMediateGrantMessage(recipientDidUrl: string, mediatorDidUrl: string, thid: string): IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare function createStatusRequestMessage(recipientDidUrl: string, mediatorDidUrl: string): IDIDCommMessage;
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare function createDeliveryRequestMessage(recipientDidUrl: string, mediatorDidUrl: string): IDIDCommMessage;
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Mediator Coordinator messages for the mediator role.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class CoordinateMediationMediatorMessageHandler extends AbstractMessageHandler {
    constructor();
    /**
     * Handles a Mediator Coordinator messages for the mediator role
     * https://didcomm.org/mediator-coordination/2.0/
     */
    handle(message: Message, context: IContext): Promise<Message>;
}
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Mediator Coordinator messages for the recipient role.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class CoordinateMediationRecipientMessageHandler extends AbstractMessageHandler {
    constructor();
    /**
     * Handles a Mediator Coordinator messages for the recipient role
     * https://didcomm.org/mediator-coordination/2.0/
     */
    handle(message: Message, context: IContext): Promise<Message>;
}
export {};
//# sourceMappingURL=coordinate-mediation-message-handler.d.ts.map