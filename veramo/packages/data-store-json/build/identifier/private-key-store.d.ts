import { AbstractSecretBox, AbstractPrivateKeyStore } from '@veramo/key-manager';
import { ImportablePrivateKey, ManagedPrivateKey } from '@veramo/key-manager';
import { VeramoJsonStore } from '../types.js';
/**
 * An implementation of {@link @veramo/key-manager#AbstractPrivateKeyStore | AbstractPrivateKeyStore} that uses a JSON
 * object to store the private key material needed by {@link @veramo/kms-local#KeyManagementSystem |
 * KeyManagementSystem}.
 *
 * This class must be initialized with a {@link VeramoJsonStore}, which serves as the JSON object storing data in
 * memory as well as providing an update notification callback to persist this data.
 * The JSON object does not have to be shared with other users of {@link VeramoJsonStore}, but it can be.
 *
 * If an {@link @veramo/key-manager#AbstractSecretBox | AbstractSecretBox} is used, then key material is encrypted,
 * even in memory.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class PrivateKeyStoreJson extends AbstractPrivateKeyStore {
    private secretBox?;
    private readonly cacheTree;
    private readonly notifyUpdate;
    /**
     * @param jsonStore - This serves as the JSON object storing data in memory as well as providing an update
     *   notification callback to persist this data. The JSON object does not have to be shared with other users of
     *   {@link VeramoJsonStore}, but it can be.
     * @param secretBox - If this is used, then key material is encrypted, even in memory.
     */
    constructor(jsonStore: VeramoJsonStore, secretBox?: AbstractSecretBox | undefined);
    getKey({ alias }: {
        alias: string;
    }): Promise<ManagedPrivateKey>;
    deleteKey({ alias }: {
        alias: string;
    }): Promise<boolean>;
    importKey(args: ImportablePrivateKey): Promise<ManagedPrivateKey>;
    listKeys(): Promise<Array<ManagedPrivateKey>>;
}
//# sourceMappingURL=private-key-store.d.ts.map