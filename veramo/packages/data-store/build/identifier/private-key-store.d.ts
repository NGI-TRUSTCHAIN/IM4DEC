import { AbstractPrivateKeyStore, AbstractSecretBox, ImportablePrivateKey, ManagedPrivateKey } from '@veramo/key-manager';
import { DataSource } from 'typeorm';
import { OrPromise } from '@veramo/utils';
/**
 * An implementation of {@link @veramo/key-manager#AbstractPrivateKeyStore | AbstractPrivateKeyStore} that uses a
 * TypeORM database connection to store private key material.
 *
 * The keys can be encrypted while at rest if this class is initialized with an
 * {@link @veramo/key-manager#AbstractSecretBox | AbstractSecretBox} implementation.
 *
 * @public
 */
export declare class PrivateKeyStore extends AbstractPrivateKeyStore {
    private dbConnection;
    private secretBox?;
    constructor(dbConnection: OrPromise<DataSource>, secretBox?: AbstractSecretBox | undefined);
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