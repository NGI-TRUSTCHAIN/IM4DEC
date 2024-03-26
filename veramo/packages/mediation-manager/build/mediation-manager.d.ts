import type { PreMediationRequestPolicy, IMediationManagerSaveMediationPolicyArgs, IMediationManagerRemoveMediationPolicyArgs, IMediationManagerGetMediationPolicyArgs, IMediationManager, IMediationGetArgs, MediationResponse, RequesterDid, IMediationManagerSaveMediationArgs, IMediationManagerRecipientDidArgs, IMediationManagerAddRecipientDidArgs, RecipientDid, IMediationManagerListRecipientDidsArgs } from './types/IMediationManager';
import type { IAgentPlugin } from '@veramo/core-types';
import type { KeyValueStore } from '@veramo/kv-store';
type PreRequestPolicyStore = KeyValueStore<PreMediationRequestPolicy>;
type MediationResponseStore = KeyValueStore<MediationResponse>;
type RecipientDidStore = KeyValueStore<RequesterDid>;
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
export declare class MediationManagerPlugin implements IAgentPlugin {
    private readonly preRequestPolicyStore;
    private readonly mediationResponseStore;
    private readonly recipientDidStore;
    readonly methods: IMediationManager;
    constructor(isMediateDefaultGrantAll: boolean | undefined, preRequestPolicyStore: PreRequestPolicyStore, mediationResponseStore: MediationResponseStore, recipientDidStore: RecipientDidStore);
    mediationManagerSaveMediationPolicy({ requesterDid, policy, }: IMediationManagerSaveMediationPolicyArgs): Promise<RequesterDid>;
    mediationManagerRemoveMediationPolicy({ requesterDid, }: IMediationManagerRemoveMediationPolicyArgs): Promise<boolean>;
    mediationManagerGetMediationPolicy({ requesterDid, }: IMediationManagerGetMediationPolicyArgs): Promise<PreMediationRequestPolicy | null>;
    mediationManagerListMediationPolicies(): Promise<Record<string, PreMediationRequestPolicy>>;
    mediationManagerGetMediation({ requesterDid, }: IMediationGetArgs): Promise<MediationResponse | null>;
    mediationManagerSaveMediation({ requesterDid, status, }: IMediationManagerSaveMediationArgs): Promise<MediationResponse>;
    mediationManagerRemoveMediation({ requesterDid }: IMediationGetArgs): Promise<boolean>;
    mediationManagerGetAllMediations(): Promise<Record<string, MediationResponse>>;
    mediationManagerAddRecipientDid({ recipientDid, requesterDid, }: IMediationManagerAddRecipientDidArgs): Promise<RequesterDid>;
    mediationManagerRemoveRecipientDid({ recipientDid, }: IMediationManagerRecipientDidArgs): Promise<boolean>;
    mediationManagerGetRecipientDid({ recipientDid, }: IMediationManagerRecipientDidArgs): Promise<RequesterDid | null>;
    mediationManagerListRecipientDids({ requesterDid, }: IMediationManagerListRecipientDidsArgs): Promise<RecipientDid[]>;
    mediationManagerIsMediationGranted({ recipientDid, }: IMediationManagerRecipientDidArgs): Promise<boolean>;
}
export {};
//# sourceMappingURL=mediation-manager.d.ts.map