import { IAgentContext, IDIDManager, IKeyManager, IDataStore, IDataStoreORM, IMessageHandler } from '@veramo/core-types';
import { AbstractMessageHandler, Message } from '@veramo/message-handler';
import { IDIDComm } from '../types/IDIDComm.js';
type IContext = IAgentContext<IDIDManager & IKeyManager & IDIDComm & IDataStore & IDataStoreORM & IMessageHandler>;
export declare const STATUS_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/status-request";
export declare const STATUS_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/status";
export declare const DELIVERY_REQUEST_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/delivery-request";
export declare const DELIVERY_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/delivery";
export declare const MESSAGES_RECEIVED_MESSAGE_TYPE = "https://didcomm.org/messagepickup/3.0/messages-received";
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Pickup messages for the mediator role.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class PickupMediatorMessageHandler extends AbstractMessageHandler {
    constructor();
    /**
     * Handles messages for Pickup protocol and mediator role
     * https://didcomm.org/pickup/3.0/
     */
    handle(message: Message, context: IContext): Promise<Message>;
    private replyWithStatusMessage;
}
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Pickup messages for the mediator role.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class PickupRecipientMessageHandler extends AbstractMessageHandler {
    constructor();
    /**
     * Handles messages for Pickup protocol and recipient role
     * https://didcomm.org/pickup/3.0/
     */
    handle(message: Message, context: IContext): Promise<Message>;
}
export {};
//# sourceMappingURL=messagepickup-message-handler.d.ts.map