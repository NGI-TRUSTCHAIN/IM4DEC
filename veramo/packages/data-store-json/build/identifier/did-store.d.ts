import { IIdentifier } from '@veramo/core-types';
import { AbstractDIDStore } from '@veramo/did-manager';
import { VeramoJsonStore } from '../types.js';
/**
 * An implementation of {@link @veramo/did-manager#AbstractDIDStore | AbstractDIDStore} that uses a JSON object to
 * store the relationships between DIDs, their providers and controllers and their keys and services as they are known
 * and managed by a Veramo agent.
 *
 * An instance of this class can be used by {@link @veramo/did-manager#DIDManager} as the data storage layer.
 *
 * This class must be initialized with a {@link VeramoJsonStore}, which serves as the JSON object storing data in
 * memory as well as providing an update notification callback to persist this data.
 * For correct usage, this MUST use the same {@link VeramoJsonStore} instance as the one used by
 * {@link @veramo/key-manager#KeyManager | KeyManager}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class DIDStoreJson extends AbstractDIDStore {
    private readonly cacheTree;
    private readonly notifyUpdate;
    constructor(jsonStore: VeramoJsonStore);
    getDID({ did, alias, provider, }: {
        did?: string;
        alias?: string;
        provider?: string;
    }): Promise<IIdentifier>;
    deleteDID({ did }: {
        did: string;
    }): Promise<boolean>;
    importDID(args: IIdentifier): Promise<boolean>;
    listDIDs(args: {
        alias?: string;
        provider?: string;
    }): Promise<IIdentifier[]>;
}
//# sourceMappingURL=did-store.d.ts.map