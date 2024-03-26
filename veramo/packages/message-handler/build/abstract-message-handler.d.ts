import { IAgentContext } from '@veramo/core-types';
import { Message } from './message.js';
export declare const unsupportedMessageTypeError: Error;
/**
 * An abstract class for creating {@link @veramo/message-handler#MessageHandler} plugins
 * @public
 */
export declare abstract class AbstractMessageHandler {
    nextMessageHandler?: AbstractMessageHandler;
    setNext(messageHandler: AbstractMessageHandler): AbstractMessageHandler;
    handle(message: Message, context: IAgentContext<{}>): Promise<Message>;
}
//# sourceMappingURL=abstract-message-handler.d.ts.map