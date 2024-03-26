import { IAgentContext, IDIDManager, IKeyManager } from '@veramo/core-types';
import { AbstractMessageHandler, Message } from '@veramo/message-handler';
import { IDIDComm } from './types/IDIDComm.js';
type IContext = IAgentContext<IDIDManager & IKeyManager & IDIDComm>;
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that decrypts DIDComm messages.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class DIDCommMessageHandler extends AbstractMessageHandler {
    constructor();
    private handleDIDCommAlpha;
    /**
     * Handles a new packed DIDCommV2 Message (also Alpha support but soon deprecated).
     * - Tests whether raw message is a DIDCommV2 message
     * - Unpacks raw message (JWM/JWE/JWS, or plain JSON).
     * -
     */
    handle(message: Message, context: IContext): Promise<Message>;
}
export {};
//# sourceMappingURL=message-handler.d.ts.map