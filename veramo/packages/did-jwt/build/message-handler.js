import { AbstractMessageHandler } from '@veramo/message-handler';
import { verifyJWT, decodeJWT } from 'did-jwt';
import Debug from 'debug';
const debug = Debug('veramo:did-jwt:message-handler');
/**
 * A plugin for {@link @veramo/message-handler#MessageHandler} that finds and verifies a JWT in a message.
 * @public
 */
export class JwtMessageHandler extends AbstractMessageHandler {
    async handle(message, context) {
        if (message.raw) {
            try {
                const decoded = decodeJWT(message.raw);
                const audience = Array.isArray(decoded.payload.aud) ? decoded.payload.aud[0] : decoded.payload.aud;
                const resolver = { resolve: (didUrl) => context.agent.resolveDid({ didUrl }) };
                const result = await verifyJWT(message.raw, { resolver, audience });
                if (result.verified) {
                    debug('Message.raw is a valid JWT');
                    message.addMetaData({ type: decoded.header.typ || 'JWT', value: decoded.header.alg });
                    message.data = result.payload;
                }
                else {
                    debug(result);
                }
            }
            catch (e) {
                debug(e.message);
            }
        }
        return super.handle(message, context);
    }
}
//# sourceMappingURL=message-handler.js.map