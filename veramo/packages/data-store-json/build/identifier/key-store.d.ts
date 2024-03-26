import { IKey, ManagedKeyInfo } from '@veramo/core-types';
import { AbstractKeyStore } from '@veramo/key-manager';
import { VeramoJsonStore } from '../types.js';
/**
 * An implementation of {@link @veramo/key-manager#AbstractKeyStore | AbstractKeyStore} that uses a JSON object to
 * store the relationships between keys, their IDs, aliases and
 * {@link @veramo/key-manager#AbstractKeyManagementSystem | KMS implementations}, as they are known and managed by a
 * Veramo agent.
 *
 * An instance of this class can be used by {@link @veramo/key-manager#KeyManager} as the data storage layer.
 *
 * This class must be initialized with a {@link VeramoJsonStore}, which serves as the JSON object storing data in
 * memory as well as providing an update notification callback to persist this data.
 * For correct usage, this MUST use the same {@link VeramoJsonStore} instance as the one used by
 * {@link @veramo/did-manager#DIDManager | DIDManager}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class KeyStoreJson extends AbstractKeyStore {
    private readonly cacheTree;
    private readonly notifyUpdate;
    /**
     * @param jsonStore - Serves as the JSON object storing data in memory as well as providing an update notification
     *   callback to persist this data. For correct usage, this MUST use the same {@link VeramoJsonStore} instance as the
     *   one used by {@link @veramo/did-manager#DIDManager | DIDManager}.
     */
    constructor(jsonStore: VeramoJsonStore);
    getKey({ kid }: {
        kid: string;
    }): Promise<IKey>;
    deleteKey({ kid }: {
        kid: string;
    }): Promise<boolean>;
    importKey(args: IKey): Promise<boolean>;
    listKeys(args?: {}): Promise<ManagedKeyInfo[]>;
}
//# sourceMappingURL=key-store.d.ts.map