import { Key } from './key.js';
/**
 * This represents the private key data of keys that were stored by {@link @veramo/data-store#KeyStore} before Veramo
 * 3.0. During database migration this key material is moved to a different table and accessible by
 * {@link @veramo/data-store#PrivateKeyStore}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class PreMigrationKey extends Key {
    kid: string;
    privateKeyHex?: string;
}
//# sourceMappingURL=PreMigrationEntities.d.ts.map