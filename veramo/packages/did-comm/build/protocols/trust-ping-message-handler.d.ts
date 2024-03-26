import { IAgentContext, IDIDManager, IKeyManager } from '@veramo/core-types';
import { AbstractMessageHandler, Message } from '@veramo/message-handler';
import { IDIDComm } from '../types/IDIDComm.js';
import { IDIDCommMessage } from '../types/message-types.js';
type IContext = IAgentContext<IDIDManager & IKeyManager & IDIDComm>;
export declare function createTrustPingMessage(senderDidUrl: string, recipientDidUrl: string): IDIDCommMessage;
export declare function createTrustPingResponse(senderDidUrl: string, recipientDidUrl: string, pingId: string): IDIDCommMessage;
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Trust Ping messages.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class TrustPingMessageHandler extends AbstractMessageHandler {
    constructor();
    /**
     * Handles a Trust Ping Message
     * https://identity.foundation/didcomm-messaging/spec/#trust-ping-protocol-10
     */
    handle(message: Message, context: IContext): Promise<Message>;
}
export {};
//# sourceMappingURL=trust-ping-message-handler.d.ts.map