import { IKeyValueStore, IKeyValueStoreOnArgs, IKeyValueStoreOptions, IValueData, ValueStoreType } from './key-value-types.js';
/**
 * Class that implements the {@link @veramo/kv-store#IKeyValueStore} interface
 *
 * This class is a Key Value store that leverages a port of the keyv package internally.
 * The store does not leak the types of the Keyv port,
 * so it could be replaced with another implementations if we want to.
 *
 * @public
 */
export declare class KeyValueStore<ValueType extends ValueStoreType> implements IKeyValueStore<ValueType> {
    /**
     * The main keyv typescript port which delegates to the storage adapters and takes care of some common functionality
     *
     * @internal
     */
    private readonly keyv;
    constructor(options: IKeyValueStoreOptions<ValueType>);
    get(key: string): Promise<ValueType | undefined>;
    getAsValueData(key: string): Promise<IValueData<ValueType>>;
    getIterator(): AsyncGenerator<[key: string, value: ValueType], void>;
    getMany(keys?: string[]): Promise<Array<ValueType | undefined>>;
    getManyAsValueData(keys: string[]): Promise<Array<IValueData<ValueType>>>;
    set(key: string, value: ValueType, ttl?: number): Promise<IValueData<ValueType>>;
    has(key: string): Promise<boolean>;
    delete(key: string): Promise<boolean>;
    deleteMany(keys: string[]): Promise<boolean[]>;
    clear(): Promise<IKeyValueStore<ValueType>>;
    disconnect(): Promise<void>;
    kvStoreOn(args: IKeyValueStoreOnArgs): Promise<IKeyValueStore<ValueType>>;
    private toDeserializedValueData;
}
//# sourceMappingURL=key-value-store.d.ts.map