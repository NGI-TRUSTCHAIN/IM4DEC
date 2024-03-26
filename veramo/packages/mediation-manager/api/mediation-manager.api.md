## API Report File for "@veramo/mediation-manager"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { IAgentPlugin } from '@veramo/core-types';
import { IPluginMethodMap } from '@veramo/core-types';
import type { KeyValueStore } from '@veramo/kv-store';

// @beta
export interface IMediationGetArgs {
    // (undocumented)
    requesterDid: RequesterDid;
}

// @beta
export interface IMediationManager extends IPluginMethodMap {
    isMediateDefaultGrantAll(): Promise<boolean>;
    mediationManagerAddRecipientDid(args: IMediationManagerAddRecipientDidArgs): Promise<RequesterDid>;
    mediationManagerGetAllMediations(): Promise<Record<RequesterDid, MediationResponse>>;
    mediationManagerGetMediation(args: IMediationGetArgs): Promise<MediationResponse | null>;
    mediationManagerGetMediationPolicy(args: IMediationManagerGetMediationPolicyArgs): Promise<PreMediationRequestPolicy | null>;
    mediationManagerGetRecipientDid(args: IMediationManagerRecipientDidArgs): Promise<RequesterDid | null>;
    mediationManagerIsMediationGranted(args: IMediationManagerRecipientDidArgs): Promise<boolean>;
    mediationManagerListMediationPolicies(): Promise<Record<string, PreMediationRequestPolicy>>;
    mediationManagerListRecipientDids(args: IMediationManagerListRecipientDidsArgs): Promise<RecipientDid[]>;
    mediationManagerRemoveMediation(args: IMediationGetArgs): Promise<boolean>;
    mediationManagerRemoveMediationPolicy(args: IMediationManagerRemoveMediationPolicyArgs): Promise<boolean>;
    mediationManagerRemoveRecipientDid(args: IMediationManagerRecipientDidArgs): Promise<boolean>;
    mediationManagerSaveMediation(args: IMediationManagerSaveMediationArgs): Promise<RequesterDid>;
    mediationManagerSaveMediationPolicy(args: IMediationManagerSaveMediationPolicyArgs): Promise<RequesterDid>;
}

// @beta
export interface IMediationManagerAddRecipientDidArgs {
    // (undocumented)
    recipientDid: RecipientDid;
    // (undocumented)
    requesterDid: RequesterDid;
}

// @beta
export interface IMediationManagerGetMediationPolicyArgs {
    // (undocumented)
    requesterDid: RequesterDid;
}

// @beta
export interface IMediationManagerListRecipientDidsArgs {
    // (undocumented)
    requesterDid: RequesterDid;
}

// @beta
export interface IMediationManagerRecipientDidArgs {
    // (undocumented)
    recipientDid: RecipientDid;
}

// @beta
export interface IMediationManagerRemoveMediationPolicyArgs {
    // (undocumented)
    requesterDid: RequesterDid;
}

// @beta
export interface IMediationManagerSaveMediationArgs {
    // (undocumented)
    requesterDid: RequesterDid;
    // (undocumented)
    status: MediationResponse;
}

// @beta
export interface IMediationManagerSaveMediationPolicyArgs {
    // (undocumented)
    policy: PreMediationRequestPolicy;
    // (undocumented)
    requesterDid: RequesterDid;
}

// @beta
export class MediationManagerPlugin implements IAgentPlugin {
    // Warning: (ae-forgotten-export) The symbol "PreRequestPolicyStore" needs to be exported by the entry point index.d.ts
    // Warning: (ae-forgotten-export) The symbol "MediationResponseStore" needs to be exported by the entry point index.d.ts
    // Warning: (ae-forgotten-export) The symbol "RecipientDidStore" needs to be exported by the entry point index.d.ts
    constructor(isMediateDefaultGrantAll: boolean | undefined, preRequestPolicyStore: PreRequestPolicyStore, mediationResponseStore: MediationResponseStore, recipientDidStore: RecipientDidStore);
    // (undocumented)
    mediationManagerAddRecipientDid({ recipientDid, requesterDid, }: IMediationManagerAddRecipientDidArgs): Promise<RequesterDid>;
    // (undocumented)
    mediationManagerGetAllMediations(): Promise<Record<string, MediationResponse>>;
    // (undocumented)
    mediationManagerGetMediation({ requesterDid, }: IMediationGetArgs): Promise<MediationResponse | null>;
    // (undocumented)
    mediationManagerGetMediationPolicy({ requesterDid, }: IMediationManagerGetMediationPolicyArgs): Promise<PreMediationRequestPolicy | null>;
    // (undocumented)
    mediationManagerGetRecipientDid({ recipientDid, }: IMediationManagerRecipientDidArgs): Promise<RequesterDid | null>;
    // (undocumented)
    mediationManagerIsMediationGranted({ recipientDid, }: IMediationManagerRecipientDidArgs): Promise<boolean>;
    // (undocumented)
    mediationManagerListMediationPolicies(): Promise<Record<string, PreMediationRequestPolicy>>;
    // (undocumented)
    mediationManagerListRecipientDids({ requesterDid, }: IMediationManagerListRecipientDidsArgs): Promise<RecipientDid[]>;
    // (undocumented)
    mediationManagerRemoveMediation({ requesterDid }: IMediationGetArgs): Promise<boolean>;
    // (undocumented)
    mediationManagerRemoveMediationPolicy({ requesterDid, }: IMediationManagerRemoveMediationPolicyArgs): Promise<boolean>;
    // (undocumented)
    mediationManagerRemoveRecipientDid({ recipientDid, }: IMediationManagerRecipientDidArgs): Promise<boolean>;
    // (undocumented)
    mediationManagerSaveMediation({ requesterDid, status, }: IMediationManagerSaveMediationArgs): Promise<MediationResponse>;
    // (undocumented)
    mediationManagerSaveMediationPolicy({ requesterDid, policy, }: IMediationManagerSaveMediationPolicyArgs): Promise<RequesterDid>;
    // (undocumented)
    readonly methods: IMediationManager;
}

// @beta
export type MediationResponse = 'GRANTED' | 'DENIED';

// @beta
export type Mediations = Record<RequesterDid, MediationResponse>;

// @beta
export type PreMediationRequestPolicy = 'ALLOW' | 'DENY';

// @beta
export type RecipientDid = string;

// @beta
export type RequesterDid = string;

```