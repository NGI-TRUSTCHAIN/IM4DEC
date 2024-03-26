import { IAgentContext } from '@veramo/core-types';
import { Message, AbstractMessageHandler } from '@veramo/message-handler';
/**
 * An implementation of {@link @veramo/message-handler#AbstractMessageHandler | AbstractMessageHandler} that can
 * extract a message from a URL.
 *
 * @public
 */
export declare class UrlMessageHandler extends AbstractMessageHandler {
    handle(message: Message, context: IAgentContext<{}>): Promise<Message>;
}
//# sourceMappingURL=message-handler.d.ts.map