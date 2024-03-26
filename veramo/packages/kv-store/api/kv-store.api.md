## API Report File for "@veramo/kv-store"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="node" />

import { BaseEntity } from 'typeorm';
import { DataSource } from 'typeorm';
import { EventEmitter } from 'events';
import { MigrationInterface } from 'typeorm';
import { OrPromise } from '@veramo/utils';
import { QueryRunner } from 'typeorm';

// Warning: (ae-forgotten-export) The symbol "KeyValueStoreEntity" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export const Entities: (typeof KeyValueStoreEntity)[];

// @internal
export function _getConnectedDb(dbConnection: OrPromise<DataSource>): Promise<DataSource>;

// @beta
export interface IKeyValueStore<ValueType extends ValueStoreType> {
    clear(): Promise<IKeyValueStore<ValueType>>;
    delete(key: string): Promise<boolean>;
    deleteMany(keys: string[]): Promise<boolean[]>;
    disconnect(): Promise<void>;
    get(key: string): Promise<ValueType | undefined>;
    getAsValueData(key: string): Promise<IValueData<ValueType>>;
    // (undocumented)
    getIterator(): AsyncGenerator<any, void>;
    getMany(keys: string[]): Promise<Array<ValueType | undefined>>;
    getManyAsValueData(keys: string[]): Promise<Array<IValueData<ValueType>>>;
    has(key: string): Promise<boolean>;
    set(key: string, value: ValueType, ttl?: number): Promise<IValueData<ValueType>>;
}

// @beta
export interface IKeyValueStoreAdapter<ValueType> {
    // (undocumented)
    namespace?: string | undefined;
}

// @beta
export interface IKeyValueStoreOnArgs {
    // (undocumented)
    eventName: string | symbol;
    // (undocumented)
    listener: (...args: any[]) => void;
}

// @beta
export interface IKeyValueStoreOptions<ValueType> {
    // (undocumented)
    [key: string]: any;
    // (undocumented)
    emitErrors?: boolean;
    namespace?: string | undefined;
    store: IKeyValueStoreAdapter<ValueType> | Map<string, ValueType>;
    ttl?: number | undefined;
    uri?: string | undefined;
}

// @beta
export interface IValueData<ValueType> {
    // (undocumented)
    expires?: number;
    // (undocumented)
    value?: ValueType;
}

// Warning: (ae-incompatible-release-tags) The symbol "KeyValueStore" is marked as @public, but its signature references "IKeyValueStore" which is marked as @beta
//
// @public
export class KeyValueStore<ValueType extends ValueStoreType> implements IKeyValueStore<ValueType> {
    // Warning: (ae-incompatible-release-tags) The symbol "__constructor" is marked as @public, but its signature references "IKeyValueStoreOptions" which is marked as @beta
    constructor(options: IKeyValueStoreOptions<ValueType>);
    // (undocumented)
    clear(): Promise<IKeyValueStore<ValueType>>;
    // (undocumented)
    delete(key: string): Promise<boolean>;
    // (undocumented)
    deleteMany(keys: string[]): Promise<boolean[]>;
    // (undocumented)
    disconnect(): Promise<void>;
    // (undocumented)
    get(key: string): Promise<ValueType | undefined>;
    // Warning: (ae-incompatible-release-tags) The symbol "getAsValueData" is marked as @public, but its signature references "IValueData" which is marked as @beta
    //
    // (undocumented)
    getAsValueData(key: string): Promise<IValueData<ValueType>>;
    // (undocumented)
    getIterator(): AsyncGenerator<[key: string, value: ValueType], void>;
    // (undocumented)
    getMany(keys?: string[]): Promise<Array<ValueType | undefined>>;
    // Warning: (ae-incompatible-release-tags) The symbol "getManyAsValueData" is marked as @public, but its signature references "IValueData" which is marked as @beta
    //
    // (undocumented)
    getManyAsValueData(keys: string[]): Promise<Array<IValueData<ValueType>>>;
    // (undocumented)
    has(key: string): Promise<boolean>;
    // Warning: (ae-incompatible-release-tags) The symbol "kvStoreOn" is marked as @public, but its signature references "IKeyValueStoreOnArgs" which is marked as @beta
    //
    // (undocumented)
    kvStoreOn(args: IKeyValueStoreOnArgs): Promise<IKeyValueStore<ValueType>>;
    // Warning: (ae-incompatible-release-tags) The symbol "set" is marked as @public, but its signature references "IValueData" which is marked as @beta
    //
    // (undocumented)
    set(key: string, value: ValueType, ttl?: number): Promise<IValueData<ValueType>>;
}

// Warning: (ae-forgotten-export) The symbol "KeyvStore" needs to be exported by the entry point index.d.ts
//
// @alpha
export class KeyValueTieredStoreAdapter<Value> extends EventEmitter implements KeyvStore<Value>, IKeyValueStoreAdapter<Value> {
    // Warning: (ae-forgotten-export) The symbol "Options" needs to be exported by the entry point index.d.ts
    constructor({ remote, local, ...options }: Options<Value>);
    // (undocumented)
    clear(): Promise<undefined>;
    // (undocumented)
    delete(key: string): Promise<boolean>;
    // (undocumented)
    deleteMany(keys: string[]): Promise<boolean>;
    // Warning: (ae-forgotten-export) The symbol "KeyvStoredData" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    get(key: string | string[], options?: {
        raw?: boolean;
    }): Promise<KeyvStoredData<Value> | Array<KeyvStoredData<Value>>>;
    // (undocumented)
    getMany(keys: string[], options?: {
        raw?: boolean;
    }): Promise<Array<KeyvStoredData<Value>>>;
    // (undocumented)
    has(key: string): Promise<boolean>;
    // (undocumented)
    iterationLimit?: string | number;
    // (undocumented)
    iterator(namespace?: string): AsyncGenerator<any, void, any>;
    // (undocumented)
    local: KeyvStore<Value>;
    // (undocumented)
    namespace?: string | undefined;
    // Warning: (ae-forgotten-export) The symbol "Options_" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    opts: Options_;
    // (undocumented)
    remote: KeyvStore<Value>;
    // (undocumented)
    set(key: string, value: any, ttl?: number): Promise<any[]>;
}

// @public (undocumented)
export type KeyValueTypeORMOptions = {
    dbConnection: OrPromise<DataSource>;
    namespace?: string;
};

// @beta
export class KeyValueTypeORMStoreAdapter extends EventEmitter implements KeyvStore<string>, IKeyValueStoreAdapter<string> {
    constructor(options: KeyValueTypeORMOptions);
    // (undocumented)
    clear(): Promise<void>;
    // (undocumented)
    delete(key: string | string[]): Promise<boolean>;
    // (undocumented)
    deleteMany(keys: string[]): Promise<boolean>;
    // (undocumented)
    disconnect(): Promise<void>;
    // (undocumented)
    get(key: string | string[], options?: {
        raw?: boolean;
    }): Promise<KeyvStoredData<string> | Array<KeyvStoredData<string>>>;
    // (undocumented)
    getMany(keys: string[], options?: {
        raw?: boolean;
    }): Promise<Array<KeyvStoredData<string>>>;
    // (undocumented)
    has(key: string): Promise<boolean>;
    // (undocumented)
    iterator(namespace?: string): AsyncGenerator<any, void, unknown>;
    // (undocumented)
    readonly namespace: string;
    // Warning: (ae-forgotten-export) The symbol "Options__2" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    opts: Options__2<string>;
    // (undocumented)
    set(key: string, value: string, ttl?: number): Promise<KeyvStoredData<string>>;
}

// Warning: (ae-forgotten-export) The symbol "CreateKVDatabaseMigration" needs to be exported by the entry point index.d.ts
//
// @public
export const kvStoreMigrations: (typeof CreateKVDatabaseMigration)[];

// @public
export type ValueStoreType = object | string | number | boolean;

```