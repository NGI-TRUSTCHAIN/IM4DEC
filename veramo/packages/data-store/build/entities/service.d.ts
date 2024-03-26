import { BaseEntity, Relation } from 'typeorm';
import { Identifier } from './identifier.js';
/**
 * Represents some properties of a {@link did-resolver#ServiceEndpoint | ServiceEndpoint} as it is stored in a TypeORM
 * database. This is used by {@link @veramo/data-store#DIDStore | DIDStore} to provide information to
 * {@link @veramo/did-manager#DIDManager | DIDManager} when DID management information is stored in a local TypeORM
 * database.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class Service extends BaseEntity {
    id: string;
    type: string;
    serviceEndpoint: string;
    description?: string;
    identifier?: Relation<Identifier>;
}
//# sourceMappingURL=service.d.ts.map