import { IAgentContext, IDIDManager, IKeyManager, IDataStore, IDataStoreORM } from '@veramo/core-types';
import { IMediationManager } from '@veramo/mediation-manager';
import { AbstractMessageHandler, Message } from '@veramo/message-handler';
import { IDIDComm } from '../types/IDIDComm.js';
type IContext = IAgentContext<IDIDManager & IKeyManager & IDIDComm & IDataStore & IDataStoreORM & IMediationManager>;
export declare const FORWARD_MESSAGE_TYPE = "https://didcomm.org/routing/2.0/forward";
export declare const QUEUE_MESSAGE_TYPE = "https://didcomm.org/routing/2.0/forward/queue-message";
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles forward messages for the Routing
 * protocol.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class RoutingMessageHandler extends AbstractMessageHandler {
    constructor();
    private isV2MediationGranted;
    private isV3MediationGranted;
    /**
     * Handles forward messages for Routing protocol
     * https://didcomm.org/routing/2.0/
     */
    handle(message: Message, context: IContext): Promise<Message>;
}
export {};
//# sourceMappingURL=routing-message-handler.d.ts.map