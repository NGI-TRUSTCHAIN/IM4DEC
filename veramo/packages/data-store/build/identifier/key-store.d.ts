import { IKey, ManagedKeyInfo } from '@veramo/core-types';
import { AbstractKeyStore } from '@veramo/key-manager';
import { DataSource } from 'typeorm';
import { OrPromise } from "@veramo/utils";
/**
 * An implementation of {@link @veramo/key-manager#AbstractKeyStore | AbstractKeyStore} that uses a TypeORM database to
 * store the relationships between keys, their IDs, aliases and
 * {@link @veramo/key-manager#AbstractKeyManagementSystem | KMS implementations}, as they are known and managed by a
 * Veramo agent.
 *
 * An instance of this class can be used by {@link @veramo/key-manager#KeyManager} as the data storage layer.
 *
 * To make full use of this class, it should use the same database as the one used by
 * {@link @veramo/data-store#DIDStore | DIDStore}.
 *
 * @public
 */
export declare class KeyStore extends AbstractKeyStore {
    private dbConnection;
    constructor(dbConnection: OrPromise<DataSource>);
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