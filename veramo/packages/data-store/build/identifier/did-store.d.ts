import { IIdentifier } from '@veramo/core-types';
import { AbstractDIDStore } from '@veramo/did-manager';
import { DataSource } from 'typeorm';
import { OrPromise } from "@veramo/utils";
/**
 * An implementation of {@link @veramo/did-manager#AbstractDIDStore | AbstractDIDStore} that uses a TypeORM database to
 * store the relationships between DIDs, their providers and controllers and their keys and services as they are known
 * and managed by a Veramo agent.
 *
 * An instance of this class can be used by {@link @veramo/did-manager#DIDManager} as the data storage layer.
 *
 * To make full use of this class, it should use the same database as the one used by
 * {@link @veramo/data-store#KeyStore | KeyStore}.
 *
 * @public
 */
export declare class DIDStore extends AbstractDIDStore {
    private dbConnection;
    constructor(dbConnection: OrPromise<DataSource>);
    getDID({ did, alias, provider, }: {
        did: string;
        alias: string;
        provider: string;
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