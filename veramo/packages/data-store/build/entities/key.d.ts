import { KeyMetadata, TKeyType } from '@veramo/core-types';
import { BaseEntity, Relation } from 'typeorm';
import { Identifier } from './identifier.js';
/**
 * Mirrors {@link @veramo/core-types#TKeyType | TKeyType}
 *
 * @beta - This API may change without a BREAKING CHANGE notice.
 */
export type KeyType = TKeyType;
/**
 * Represents some properties of a {@link @veramo/core-types#IKey | IKey} that are stored in a TypeORM
 * database for the purpose of keeping track of the {@link @veramo/key-manager#AbstractKeyManagementSystem}
 * implementations and the keys they are able to use.
 *
 * @see {@link @veramo/data-store#KeyStore | KeyStore} for the implementation used by the
 *   {@link @veramo/key-manager#KeyManager | KeyManager}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class Key extends BaseEntity {
    kid: string;
    kms: string;
    type: KeyType;
    publicKeyHex: string;
    meta?: KeyMetadata | null;
    identifier?: Relation<Identifier>;
}
//# sourceMappingURL=key.d.ts.map