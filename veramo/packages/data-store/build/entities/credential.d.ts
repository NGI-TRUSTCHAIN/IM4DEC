import { VerifiableCredential } from '@veramo/core-types';
import { BaseEntity, Relation } from 'typeorm';
import { Identifier } from './identifier.js';
import { Message } from './message.js';
import { Presentation } from './presentation.js';
import { Claim } from './claim.js';
/**
 * Represents some common properties of a Verifiable Credential that are stored in a TypeORM database for querying.
 *
 * @see {@link @veramo/core-types#IDataStoreORM.dataStoreORMGetVerifiableCredentials | dataStoreORMGetVerifiableCredentials}
 *   for the interface defining how this can be queried.
 *
 * @see {@link @veramo/data-store#DataStoreORM | DataStoreORM} for the implementation of the query interface.
 *
 * @see {@link @veramo/core-types#IDataStoreORM.dataStoreORMGetVerifiableCredentialsByClaims | dataStoreORMGetVerifiableCredentialsByClaims} for the interface defining how to query credentials by the claims they contain.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class Credential extends BaseEntity {
    hash: string;
    private _raw;
    set raw(raw: VerifiableCredential);
    get raw(): VerifiableCredential;
    issuer: Relation<Identifier>;
    subject?: Relation<Identifier>;
    id?: string;
    issuanceDate: Date;
    expirationDate?: Date;
    context: string[];
    type: string[];
    claims: Relation<Claim[]>;
    presentations: Relation<Presentation[]>;
    messages: Relation<Message[]>;
}
export declare const createCredentialEntity: (vci: VerifiableCredential) => Credential;
//# sourceMappingURL=credential.d.ts.map