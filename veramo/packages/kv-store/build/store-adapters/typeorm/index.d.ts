/// <reference types="node" />
import { EventEmitter } from 'events';
import { OrPromise } from '@veramo/utils';
import { DataSource } from 'typeorm';
import { KeyValueStoreEntity } from './entities/keyValueStoreEntity.js';
import { KeyValueTypeORMOptions, Options_ } from './types.js';
import { KeyvStore, KeyvStoredData } from '../../keyv/keyv-types.js';
import { IKeyValueStoreAdapter } from '../../key-value-types.js';
export { KeyValueTypeORMOptions } from './types.js';
export declare const Entities: (typeof KeyValueStoreEntity)[];
/**
 * TypeORM based key value store adapter
 * @beta
 */
export declare class KeyValueTypeORMStoreAdapter extends EventEmitter implements KeyvStore<string>, IKeyValueStoreAdapter<string> {
    private readonly dbConnection;
    readonly namespace: string;
    opts: Options_<string>;
    constructor(options: KeyValueTypeORMOptions);
    get(key: string | string[], options?: {
        raw?: boolean;
    }): Promise<KeyvStoredData<string> | Array<KeyvStoredData<string>>>;
    iterator(namespace?: string): AsyncGenerator<any, void, unknown>;
    getMany(keys: string[], options?: {
        raw?: boolean;
    }): Promise<Array<KeyvStoredData<string>>>;
    set(key: string, value: string, ttl?: number): Promise<KeyvStoredData<string>>;
    delete(key: string | string[]): Promise<boolean>;
    deleteMany(keys: string[]): Promise<boolean>;
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    disconnect(): Promise<void>;
}
/**
 *  Ensures that the provided DataSource is connected.
 *
 * @param dbConnection - a TypeORM DataSource or a Promise that resolves to a DataSource
 * @internal
 */
export declare function _getConnectedDb(dbConnection: OrPromise<DataSource>): Promise<DataSource>;
//# sourceMappingURL=index.d.ts.map