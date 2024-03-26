import { VerifiablePresentation } from '@veramo/core-types';
import { BaseEntity, Relation } from 'typeorm';
import { Identifier } from './identifier.js';
import { Message } from './message.js';
import { Credential } from './credential.js';
/**
 * Represents some common properties of a Verifiable Presentation that are stored in a TypeORM database for querying.
 *
 * @see {@link @veramo/core-types#IDataStoreORM.dataStoreORMGetVerifiablePresentations | dataStoreORMGetVerifiablePresentations} for the interface defining how this can be queried.
 *
 * @see {@link @veramo/data-store#DataStoreORM | DataStoreORM} for the implementation of the query interface.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class Presentation extends BaseEntity {
    hash: string;
    private _raw;
    set raw(raw: VerifiablePresentation);
    get raw(): VerifiablePresentation;
    holder: Relation<Identifier>;
    verifier?: Relation<Identifier[]>;
    id?: String;
    issuanceDate: Date;
    expirationDate?: Date;
    context: string[];
    type: string[];
    credentials: Relation<Credential[]>;
    messages: Relation<Message[]>;
}
export declare const createPresentationEntity: (vpi: VerifiablePresentation) => Presentation;
//# sourceMappingURL=presentation.d.ts.map