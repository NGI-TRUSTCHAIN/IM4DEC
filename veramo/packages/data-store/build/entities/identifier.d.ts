import { Connection, BaseEntity } from 'typeorm';
import { Key } from './key.js';
import { Service } from './service.js';
import { Message } from './message.js';
import { Presentation } from './presentation.js';
import { Credential } from './credential.js';
import { Claim } from './claim.js';
/**
 * Represents some properties and relationships of an {@link @veramo/core-types#IIdentifier} that are stored in a TypeORM
 * database for the purpose of keeping track of keys and services associated with a DID managed by a Veramo agent.
 *
 * @see {@link @veramo/data-store#DIDStore | DIDStore} for the implementation used by the
 *   {@link @veramo/did-manager#DIDManager | DIDManager}.
 * @see {@link @veramo/data-store#DataStoreORM | DataStoreORM} for the implementation of the query interface.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class Identifier extends BaseEntity {
    did: string;
    provider?: string;
    alias?: string;
    setSaveDate(): void;
    setUpdateDate(): void;
    saveDate: Date;
    updateDate: Date;
    controllerKeyId?: string;
    keys: Key[];
    services: Service[];
    sentMessages: Message[];
    receivedMessages: Message[];
    issuedPresentations: Presentation[];
    receivedPresentations: Presentation[];
    issuedCredentials: Credential[];
    receivedCredentials: Credential[];
    issuedClaims: Claim[];
    receivedClaims: Claim[];
    /**
     * Convenience method to get the most recent information about a subject DID as described by Verifiable Credential
     * claims.
     *
     * Example:
     * ```typescript
     * // get the latest claim value for credentials containing `credentialSubject.name` and this Identifier as subject.
     * const name = await identifier.getLatestClaimValue({type: 'name'})
     * ```
     *
     * @param where - The TypeORM `where` filter to use.
     */
    getLatestClaimValue(dbConnection: Promise<Connection>, where: any): Promise<string | null | undefined>;
    shortDid(): string;
}
//# sourceMappingURL=identifier.d.ts.map