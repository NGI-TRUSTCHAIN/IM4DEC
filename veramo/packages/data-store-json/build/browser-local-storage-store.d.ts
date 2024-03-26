import { IIdentifier, IMessage, ManagedKeyInfo } from '@veramo/core-types';
import { ManagedPrivateKey } from '@veramo/key-manager';
import { DiffCallback, ClaimTableEntry, CredentialTableEntry, PresentationTableEntry, VeramoJsonStore } from './types.js';
/**
 * Implementation of {@link VeramoJsonStore} that uses browser localStorage to store data.
 *
 * @example
 * ```
 * const dataStore = BrowserLocalStorageStore.fromLocalStorage('veramo-state')
 * const plugin = new DataStoreJson(dataStore)
 * ```
 *
 * @public
 */
export declare class BrowserLocalStorageStore implements VeramoJsonStore {
    private localStorageKey;
    notifyUpdate: DiffCallback;
    dids: Record<string, IIdentifier>;
    keys: Record<string, ManagedKeyInfo>;
    privateKeys: Record<string, ManagedPrivateKey>;
    credentials: Record<string, CredentialTableEntry>;
    claims: Record<string, ClaimTableEntry>;
    presentations: Record<string, PresentationTableEntry>;
    messages: Record<string, IMessage>;
    private constructor();
    static fromLocalStorage(localStorageKey: string): BrowserLocalStorageStore;
    private load;
    private save;
}
//# sourceMappingURL=browser-local-storage-store.d.ts.map