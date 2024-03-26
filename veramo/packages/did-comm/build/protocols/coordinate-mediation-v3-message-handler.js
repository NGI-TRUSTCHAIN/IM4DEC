import { AbstractMessageHandler } from '@veramo/message-handler';
import Debug from 'debug';
import { v4 } from 'uuid';
import { DIDCommMessageMediaType } from '../types/message-types.js';
const debug = Debug('veramo:did-comm:coordinate-mediation-message-handler');
const GRANTED = 'GRANTED';
const DENIED = 'DENIED';
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Represents the actions (add or remove) that can be taken on a recipient did
 *
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export var UpdateAction;
(function (UpdateAction) {
    UpdateAction["ADD"] = "add";
    UpdateAction["REMOVE"] = "remove";
})(UpdateAction || (UpdateAction = {}));
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Represents the result of an update action
 *
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export var RecipientUpdateResult;
(function (RecipientUpdateResult) {
    RecipientUpdateResult["SUCCESS"] = "success";
    RecipientUpdateResult["NO_CHANGE"] = "no_change";
    RecipientUpdateResult["CLIENT_ERROR"] = "client_error";
    RecipientUpdateResult["SERVER_ERROR"] = "server_error";
})(RecipientUpdateResult || (RecipientUpdateResult = {}));
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * Represents the types of messages that can be sent and received by the Mediator Coordinator protocol
 *
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 * @see {@link @veramo/did-comm#CoordinateMediationRecipientMessageHandler}
 */
export var CoordinateMediation;
(function (CoordinateMediation) {
    CoordinateMediation["MEDIATE_REQUEST"] = "https://didcomm.org/coordinate-mediation/3.0/mediate-request";
    CoordinateMediation["MEDIATE_GRANT"] = "https://didcomm.org/coordinate-mediation/3.0/mediate-grant";
    CoordinateMediation["MEDIATE_DENY"] = "https://didcomm.org/coordinate-mediation/3.0/mediate-deny";
    CoordinateMediation["RECIPIENT_UPDATE"] = "https://didcomm.org/coordinate-mediation/3.0/recipient-update";
    CoordinateMediation["RECIPIENT_UPDATE_RESPONSE"] = "https://didcomm.org/coordinate-mediation/3.0/recipient-update-response";
    CoordinateMediation["RECIPIENT_QUERY"] = "https://didcomm.org/coordinate-mediation/3.0/recipient-query";
    CoordinateMediation["RECIPIENT_QUERY_RESPONSE"] = "https://didcomm.org/coordinate-mediation/3.0/recipient";
})(CoordinateMediation || (CoordinateMediation = {}));
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export var MessagePickup;
(function (MessagePickup) {
    MessagePickup["STATUS_REQUEST_MESSAGE_TYPE"] = "https://didcomm.org/messagepickup/3.0/status-request";
    MessagePickup["DELIVERY_REQUEST_MESSAGE_TYPE"] = "https://didcomm.org/messagepickup/3.0/delivery-request";
})(MessagePickup || (MessagePickup = {}));
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export function createV3MediateGrantMessage(recipientDidUrl, mediatorDidUrl, thid) {
    return {
        type: CoordinateMediation.MEDIATE_GRANT,
        from: mediatorDidUrl,
        to: recipientDidUrl,
        id: v4(),
        thid: thid,
        body: { routing_did: [mediatorDidUrl] },
        created_time: new Date().toISOString(),
    };
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export const createV3MediateDenyMessage = (recipientDidUrl, mediatorDidUrl, thid) => {
    return {
        type: CoordinateMediation.MEDIATE_DENY,
        from: mediatorDidUrl,
        to: recipientDidUrl,
        id: v4(),
        thid: thid,
        created_time: new Date().toISOString(),
        body: null,
    };
};
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export function createV3RecipientUpdateResponseMessage(recipientDidUrl, mediatorDidUrl, thid, updates) {
    return {
        type: CoordinateMediation.RECIPIENT_UPDATE_RESPONSE,
        from: mediatorDidUrl,
        to: recipientDidUrl,
        id: v4(),
        thid: thid,
        body: { updates },
        created_time: new Date().toISOString(),
    };
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export const createV3RecipientQueryResponseMessage = (recipientDidUrl, mediatorDidUrl, thid, dids) => {
    return {
        type: CoordinateMediation.RECIPIENT_QUERY_RESPONSE,
        from: mediatorDidUrl,
        to: recipientDidUrl,
        id: v4(),
        thid: thid,
        body: { dids },
        created_time: new Date().toISOString(),
    };
};
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * @returns a structured message for the Mediator Coordinator protocol
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export function createV3MediateRequestMessage(recipientDidUrl, mediatorDidUrl) {
    return {
        type: CoordinateMediation.MEDIATE_REQUEST,
        from: recipientDidUrl,
        to: mediatorDidUrl,
        id: v4(),
        created_time: new Date().toISOString(),
        body: {},
    };
}
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export const createV3StatusRequestMessage = (recipientDidUrl, mediatorDidUrl) => {
    return {
        id: v4(),
        type: MessagePickup.STATUS_REQUEST_MESSAGE_TYPE,
        to: mediatorDidUrl,
        from: recipientDidUrl,
        return_route: 'all',
        body: {},
    };
};
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * @returns a structured upate message for the Mediator Coordinator protocol
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export const createV3RecipientUpdateMessage = (recipientDidUrl, mediatorDidUrl, updates) => {
    return {
        type: CoordinateMediation.RECIPIENT_UPDATE,
        from: recipientDidUrl,
        to: mediatorDidUrl,
        id: v4(),
        created_time: new Date().toISOString(),
        body: { updates },
        return_route: 'all',
    };
};
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 *
 * @returns a structured query message for the Mediator Coordinator protocol
 * @see {@link @veramo/did-comm#CoordinateMediationV3MediatorMessageHandler}
 */
export const createV3RecipientQueryMessage = (recipientDidUrl, mediatorDidUrl) => {
    return {
        type: CoordinateMediation.RECIPIENT_QUERY,
        from: recipientDidUrl,
        to: mediatorDidUrl,
        id: v4(),
        created_time: new Date().toISOString(),
        body: {},
    };
};
/**
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export const createV3DeliveryRequestMessage = (recipientDidUrl, mediatorDidUrl) => {
    return {
        id: v4(),
        type: MessagePickup.DELIVERY_REQUEST_MESSAGE_TYPE,
        to: mediatorDidUrl,
        from: recipientDidUrl,
        return_route: 'all',
        body: { limit: 2 },
    };
};
/**
 * Handler Type Guards
 */
const isMediateRequest = (message) => {
    if (message.type !== CoordinateMediation.MEDIATE_REQUEST)
        return false;
    if (!message.from)
        throw new Error('invalid_argument: MediateRequest received without `from` set');
    if (!message.from)
        throw new Error('invalid_argument: MediateRequest received without `to` set');
    return true;
};
const isRecipientUpdate = (message) => {
    if (message.type !== CoordinateMediation.RECIPIENT_UPDATE)
        return false;
    if (!message.from)
        throw new Error('invalid_argument: RecipientUpdate received without `from` set');
    if (!message.to)
        throw new Error('invalid_argument: RecipientUpdate received without `to` set');
    if (!('data' in message))
        throw new Error('invalid_argument: RecipientUpdate received without `body` set');
    if (!message.data || !message.data.updates) {
        throw new Error('invalid_argument: RecipientUpdate received without `updates` set');
    }
    return true;
};
const isRecipientQuery = (message) => {
    if (message.type !== CoordinateMediation.RECIPIENT_QUERY)
        return false;
    if (!message.from)
        throw new Error('invalid_argument: RecipientQuery received without `from` set');
    if (!message.to)
        throw new Error('invalid_argument: RecipientQuery received without `to` set');
    return true;
};
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Mediator Coordinator messages for the mediator role.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class CoordinateMediationV3MediatorMessageHandler extends AbstractMessageHandler {
    constructor() {
        super();
    }
    async grantOrDenyMediation({ from: requesterDid }, context) {
        if (!requesterDid)
            return DENIED;
        const policy = await context.agent.mediationManagerGetMediationPolicy({ requesterDid });
        if (await context.agent.isMediateDefaultGrantAll()) {
            return policy === 'DENY' ? DENIED : GRANTED;
        }
        else {
            return policy === 'ALLOW' ? GRANTED : DENIED;
        }
    }
    async handleMediateRequest(message, context) {
        try {
            debug('MediateRequest Message Received');
            const requesterDid = message.from;
            const status = await this.grantOrDenyMediation(message, context);
            await context.agent.mediationManagerSaveMediation({ status, requesterDid });
            const getResponse = status === GRANTED ? createV3MediateGrantMessage : createV3MediateDenyMessage;
            const response = getResponse(message.from, message.to, message.id);
            const packedResponse = await context.agent.packDIDCommMessage({
                message: response,
                packing: 'authcrypt',
            });
            const returnResponse = {
                id: response.id,
                message: packedResponse.message,
                contentType: DIDCommMessageMediaType.ENCRYPTED,
            };
            message.addMetaData({ type: 'ReturnRouteResponse', value: JSON.stringify(returnResponse) });
            // Save message to track recipients
            await context.agent.dataStoreSaveMessage({
                message: {
                    type: response.type,
                    from: response.from,
                    to: response.to,
                    id: response.id,
                    threadId: response.thid,
                    data: response.body,
                    createdAt: response.created_time,
                },
            });
        }
        catch (error) {
            debug(error);
        }
        return message;
    }
    /**
     * Used to notify the mediator of DIDs in use by the recipient
     **/
    async handleRecipientUpdate(message, context) {
        try {
            debug('MediateRecipientUpdate Message Received');
            const updates = message.data.updates;
            const applyUpdate = async (requesterDid, update) => {
                const { recipient_did: recipientDid } = update;
                try {
                    if (update.action === UpdateAction.ADD) {
                        await context.agent.mediationManagerAddRecipientDid({ requesterDid, recipientDid });
                        return { ...update, result: RecipientUpdateResult.SUCCESS };
                    }
                    else if (update.action === UpdateAction.REMOVE) {
                        const result = await context.agent.mediationManagerRemoveRecipientDid({ recipientDid });
                        if (result)
                            return { ...update, result: RecipientUpdateResult.SUCCESS };
                        return { ...update, result: RecipientUpdateResult.NO_CHANGE };
                    }
                    return { ...update, result: RecipientUpdateResult.CLIENT_ERROR };
                }
                catch (ex) {
                    debug(ex);
                    return { ...update, result: RecipientUpdateResult.SERVER_ERROR };
                }
            };
            const updated = await Promise.all(updates.map(async (u) => await applyUpdate(message.from, u)));
            const response = createV3RecipientUpdateResponseMessage(message.from, message.to, message.id, updated);
            const packedResponse = await context.agent.packDIDCommMessage({
                message: response,
                packing: 'authcrypt',
            });
            const returnResponse = {
                id: response.id,
                message: packedResponse.message,
                contentType: DIDCommMessageMediaType.ENCRYPTED,
            };
            message.addMetaData({ type: 'ReturnRouteResponse', value: JSON.stringify(returnResponse) });
            await context.agent.dataStoreSaveMessage({
                message: {
                    type: response.type,
                    from: response.from,
                    to: response.to,
                    id: response.id,
                    threadId: response.thid,
                    data: response.body,
                    createdAt: response.created_time,
                },
            });
        }
        catch (error) {
            debug(error);
        }
        return message;
    }
    /**
     * Query mediator for a list of DIDs registered for this connection
     **/
    async handleRecipientQuery(message, context) {
        try {
            const dids = await context.agent.mediationManagerListRecipientDids({ requesterDid: message.from });
            const response = createV3RecipientQueryResponseMessage(message.from, message.to, message.id, dids.map((did) => ({ recipient_did: did })));
            const packedResponse = await context.agent.packDIDCommMessage({
                message: response,
                packing: 'authcrypt',
            });
            const returnResponse = {
                id: response.id,
                message: packedResponse.message,
                contentType: DIDCommMessageMediaType.ENCRYPTED,
            };
            message.addMetaData({ type: 'ReturnRouteResponse', value: JSON.stringify(returnResponse) });
            await context.agent.dataStoreSaveMessage({
                message: {
                    type: response.type,
                    from: response.from,
                    to: response.to,
                    id: response.id,
                    threadId: response.thid,
                    data: response.body,
                    createdAt: response.created_time,
                },
            });
        }
        catch (error) {
            debug(error);
        }
        return message;
    }
    /**
     * Handles a Mediator Coordinator messages for the mediator role
     * https://didcomm.org/mediator-coordination/3.0/
     */
    async handle(message, context) {
        if (isMediateRequest(message))
            return this.handleMediateRequest(message, context);
        if (isRecipientUpdate(message))
            return this.handleRecipientUpdate(message, context);
        if (isRecipientQuery(message))
            return this.handleRecipientQuery(message, context);
        return super.handle(message, context);
    }
}
/**
 * A plugin for the {@link @veramo/message-handler#MessageHandler} that handles Mediator Coordinator messages for the recipient role.
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class CoordinateMediationV3RecipientMessageHandler extends AbstractMessageHandler {
    constructor() {
        super();
    }
    /**
     * Handles a Mediator Coordinator messages for the recipient role
     * https://didcomm.org/mediator-coordination/2.0/
     */
    async handle(message, context) {
        if (message.type === CoordinateMediation.MEDIATE_GRANT) {
            debug('MediateGrant Message Received');
            try {
                const { from, to, data, threadId } = message;
                if (!from) {
                    throw new Error('invalid_argument: MediateGrant received without `from` set');
                }
                if (!to) {
                    throw new Error('invalid_argument: MediateGrant received without `to` set');
                }
                if (!threadId) {
                    throw new Error('invalid_argument: MediateGrant received without `thid` set');
                }
                if (!data.routing_did || data.routing_did.length === 0) {
                    throw new Error('invalid_argument: MediateGrant received with invalid routing_did');
                }
                // If mediate request was previously sent, add service to DID document
                const prevRequestMsg = await context.agent.dataStoreGetMessage({ id: threadId });
                if (prevRequestMsg.from === to && prevRequestMsg.to === from) {
                    const service = {
                        id: 'didcomm-mediator',
                        type: 'DIDCommMessaging',
                        serviceEndpoint: [
                            {
                                uri: data.routing_did[0],
                            },
                        ],
                    };
                    await context.agent.didManagerAddService({
                        did: to,
                        service: service,
                    });
                    message.addMetaData({ type: 'DIDCommMessagingServiceAdded', value: JSON.stringify(service) });
                }
            }
            catch (ex) {
                debug(ex);
            }
            return message;
        }
        else if (message.type === CoordinateMediation.MEDIATE_DENY) {
            debug('MediateDeny Message Received');
            try {
                const { from, to } = message;
                if (!from) {
                    throw new Error('invalid_argument: MediateGrant received without `from` set');
                }
                if (!to) {
                    throw new Error('invalid_argument: MediateGrant received without `to` set');
                }
                // Delete service if it exists
                const did = await context.agent.didManagerGet({
                    did: to,
                });
                const existingService = did.services.find((s) => s.serviceEndpoint === from ||
                    (Array.isArray(s.serviceEndpoint) && s.serviceEndpoint.includes(from)));
                if (existingService) {
                    await context.agent.didManagerRemoveService({ did: to, id: existingService.id });
                }
            }
            catch (ex) {
                debug(ex);
            }
        }
        return super.handle(message, context);
    }
}
//# sourceMappingURL=coordinate-mediation-v3-message-handler.js.map