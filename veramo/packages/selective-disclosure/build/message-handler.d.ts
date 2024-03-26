import { IAgentContext, IMessageHandler } from '@veramo/core-types';
import { Message, AbstractMessageHandler } from '@veramo/message-handler';
/**
 * Identifies a {@link @veramo/core-types#IMessage} that represents a Selective Disclosure Request
 *
 * @remarks See {@link https://github.com/uport-project/specs/blob/develop/messages/sharereq.md | Selective Disclosure Request}
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare const MessageTypes: {
    sdr: string;
};
/**
 * A Veramo message handler plugin that can decode an incoming Selective Disclosure Response
 * into the internal Message representation.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class SdrMessageHandler extends AbstractMessageHandler {
    handle(message: Message, context: IAgentContext<IMessageHandler>): Promise<Message>;
    private timestampToDate;
}
//# sourceMappingURL=message-handler.d.ts.map