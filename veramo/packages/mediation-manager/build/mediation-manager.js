/**
 * Mediation Manager Plugin for {@link @veramo/core#Agent}
 *
 * This plugin exposes methods pertaining to the {@link @veramo/core-types#IMediationManager} interface.
 *
 * @remarks be advised that the {@link @veramo/mediation-manager#IMediationManager} interface is for use with
 * {@link @veramo/did-comm#DIDComm | DIDCOmm} and specifically the V3 Coordinate Mediation Protocol implementation.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class MediationManagerPlugin {
    preRequestPolicyStore;
    mediationResponseStore;
    recipientDidStore;
    methods;
    constructor(isMediateDefaultGrantAll = true, preRequestPolicyStore, mediationResponseStore, recipientDidStore) {
        this.preRequestPolicyStore = preRequestPolicyStore;
        this.mediationResponseStore = mediationResponseStore;
        this.recipientDidStore = recipientDidStore;
        this.methods = {
            isMediateDefaultGrantAll: () => Promise.resolve(isMediateDefaultGrantAll),
            /* Mediation Policy Methods */
            mediationManagerSaveMediationPolicy: this.mediationManagerSaveMediationPolicy.bind(this),
            mediationManagerRemoveMediationPolicy: this.mediationManagerRemoveMediationPolicy.bind(this),
            mediationManagerGetMediationPolicy: this.mediationManagerGetMediationPolicy.bind(this),
            mediationManagerListMediationPolicies: this.mediationManagerListMediationPolicies.bind(this),
            /* Mediation Methods */
            mediationManagerSaveMediation: this.mediationManagerSaveMediation.bind(this),
            mediationManagerGetMediation: this.mediationManagerGetMediation.bind(this),
            mediationManagerRemoveMediation: this.mediationManagerRemoveMediation.bind(this),
            mediationManagerGetAllMediations: this.mediationManagerGetAllMediations.bind(this),
            /* Recipient Did Methods */
            mediationManagerAddRecipientDid: this.mediationManagerAddRecipientDid.bind(this),
            mediationManagerRemoveRecipientDid: this.mediationManagerRemoveRecipientDid.bind(this),
            mediationManagerGetRecipientDid: this.mediationManagerGetRecipientDid.bind(this),
            mediationManagerListRecipientDids: this.mediationManagerListRecipientDids.bind(this),
            mediationManagerIsMediationGranted: this.mediationManagerIsMediationGranted.bind(this),
        };
    }
    async mediationManagerSaveMediationPolicy({ requesterDid, policy, }) {
        const res = await this.preRequestPolicyStore.set(requesterDid, policy);
        if (!res || !res.value)
            throw new Error('mediation_manager: failed to save mediation policy');
        return requesterDid;
    }
    async mediationManagerRemoveMediationPolicy({ requesterDid, }) {
        return await this.preRequestPolicyStore.delete(requesterDid);
    }
    async mediationManagerGetMediationPolicy({ requesterDid, }) {
        return (await this.preRequestPolicyStore.get(requesterDid)) || null;
    }
    async mediationManagerListMediationPolicies() {
        const policies = {};
        for await (const [requesterDid, policy] of this.preRequestPolicyStore.getIterator()) {
            policies[requesterDid] = policy;
        }
        return policies;
    }
    async mediationManagerGetMediation({ requesterDid, }) {
        return (await this.mediationResponseStore.get(requesterDid)) || null;
    }
    async mediationManagerSaveMediation({ requesterDid, status, }) {
        const res = await this.mediationResponseStore.set(requesterDid, status);
        if (!res.value)
            throw new Error('mediation_manager: failed to save mediation');
        return res.value;
    }
    async mediationManagerRemoveMediation({ requesterDid }) {
        return await this.mediationResponseStore.delete(requesterDid);
    }
    async mediationManagerGetAllMediations() {
        const mediationResponses = {};
        for await (const [requesterDid, response] of this.mediationResponseStore.getIterator()) {
            mediationResponses[requesterDid] = response;
        }
        return mediationResponses;
    }
    async mediationManagerAddRecipientDid({ recipientDid, requesterDid, }) {
        const addResult = await this.recipientDidStore.set(recipientDid, requesterDid);
        if (!addResult || !addResult.value)
            throw new Error('mediation_manager: failed to add recipient did');
        return addResult.value;
    }
    async mediationManagerRemoveRecipientDid({ recipientDid, }) {
        return await this.recipientDidStore.delete(recipientDid);
    }
    async mediationManagerGetRecipientDid({ recipientDid, }) {
        return (await this.recipientDidStore.get(recipientDid)) || null;
    }
    async mediationManagerListRecipientDids({ requesterDid, }) {
        const recipientDids = [];
        for await (const [recipientDid, did] of this.recipientDidStore.getIterator()) {
            if (did === requesterDid)
                recipientDids.push(recipientDid);
        }
        return recipientDids;
    }
    async mediationManagerIsMediationGranted({ recipientDid, }) {
        return !!(await this.recipientDidStore.get(recipientDid));
    }
}
//# sourceMappingURL=mediation-manager.js.map