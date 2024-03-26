import Debug from 'debug';
const debug = Debug('veramo:message-handler');
export const unsupportedMessageTypeError = new Error('Unsupported message type');
/**
 * An abstract class for creating {@link @veramo/message-handler#MessageHandler} plugins
 * @public
 */
export class AbstractMessageHandler {
    nextMessageHandler;
    setNext(messageHandler) {
        this.nextMessageHandler = messageHandler;
        return messageHandler;
    }
    async handle(message, context) {
        if (this.nextMessageHandler)
            return this.nextMessageHandler.handle(message, context);
        debug("can't handle message: ", message);
        return Promise.reject(unsupportedMessageTypeError);
    }
}
//# sourceMappingURL=abstract-message-handler.js.map