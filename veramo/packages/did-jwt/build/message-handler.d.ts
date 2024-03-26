import { IAgentContext, IResolver } from '@veramo/core-types';
import { AbstractMessageHandler, Message } from '@veramo/message-handler';
export type IContext = IAgentContext<IResolver>;
/**
 * A plugin for {@link @veramo/message-handler#MessageHandler} that finds and verifies a JWT in a message.
 * @public
 */
export declare class JwtMessageHandler extends AbstractMessageHandler {
    handle(message: Message, context: IContext): Promise<Message>;
}
//# sourceMappingURL=message-handler.d.ts.map