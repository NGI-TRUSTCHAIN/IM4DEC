import { BaseEntity, Relation } from 'typeorm';
import { Identifier } from './identifier.js';
import { Credential } from './credential.js';
/**
 * Represents the properties of a claim extracted from a Verifiable Credential `credentialSubject`, and stored in a
 * TypeORM database for querying.
 *
 * @see {@link @veramo/core-types#IDataStoreORM} for the interface defining how this can be queried.
 * @see {@link @veramo/data-store#DataStoreORM} for the implementation of the query interface.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class Claim extends BaseEntity {
    hash: string;
    issuer: Relation<Identifier>;
    subject?: Relation<Identifier>;
    credential: Relation<Credential>;
    issuanceDate: Date;
    expirationDate?: Date;
    context: string[];
    credentialType: string[];
    type: string;
    value: string | null;
    isObj: boolean;
}
//# sourceMappingURL=claim.d.ts.map