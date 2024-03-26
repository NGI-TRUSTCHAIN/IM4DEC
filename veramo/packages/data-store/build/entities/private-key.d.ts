import { KeyType } from './key.js';
import { BaseEntity } from 'typeorm';
/**
 * Represents some properties of a {@link @veramo/key-manager#ManagedPrivateKey | ManagedPrivateKey} that are stored in
 * a TypeORM database when using a {@link @veramo/data-store#PrivateKeyStore | PrivateKeyStore} to store private key
 * data.
 *
 * @see {@link @veramo/kms-local#KeyManagementSystem | KeyManagementSystem} for an implementation of a KMS that can
 *   make use of such stored keys.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class PrivateKey extends BaseEntity {
    alias: string;
    type: KeyType;
    privateKeyHex: string;
}
//# sourceMappingURL=private-key.d.ts.map