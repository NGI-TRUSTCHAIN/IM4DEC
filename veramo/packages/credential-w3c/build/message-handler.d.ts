import { IAgentContext, ICredentialVerifier, IResolver } from '@veramo/core-types';
import { AbstractMessageHandler, Message } from '@veramo/message-handler';
/**
 * These types are used by `@veramo/data-store` when storing Verifiable Credentials and Presentations
 *
 * @internal
 */
export declare const MessageTypes: {
    /** Represents a Verifiable Credential */
    vc: string;
    /** Represents a Verifiable Presentation */
    vp: string;
};
/**
 * Represents the requirements that this plugin has.
 * The agent that is using this plugin is expected to provide these methods.
 *
 * This interface can be used for static type checks, to make sure your application is properly initialized.
 */
export type IContext = IAgentContext<IResolver & ICredentialVerifier>;
/**
 * An implementation of the {@link @veramo/message-handler#AbstractMessageHandler}.
 *
 * This plugin can handle incoming W3C Verifiable Credentials and Presentations and prepare them
 * for internal storage as {@link @veramo/message-handler#Message} types.
 *
 * The current version can only handle `JWT` encoded
 *
 * @remarks {@link @veramo/core-types#IDataStore | IDataStore }
 *
 * @public
 */
export declare class W3cMessageHandler extends AbstractMessageHandler {
    handle(message: Message, context: IContext): Promise<Message>;
}
//# sourceMappingURL=message-handler.d.ts.map