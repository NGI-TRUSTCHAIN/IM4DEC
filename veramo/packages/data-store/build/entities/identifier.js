var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, ManyToMany, Index, BeforeInsert, BeforeUpdate, } from 'typeorm';
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
let Identifier = class Identifier extends BaseEntity {
    // @ts-ignore
    did;
    // @ts-ignore
    provider;
    // @ts-ignore
    alias;
    setSaveDate() {
        this.saveDate = new Date();
        this.updateDate = new Date();
    }
    setUpdateDate() {
        this.updateDate = new Date();
    }
    // @ts-ignore
    saveDate;
    // @ts-ignore
    updateDate;
    // @ts-ignore
    controllerKeyId;
    // @ts-ignore
    keys;
    // @ts-ignore
    services;
    // @ts-ignore
    sentMessages;
    // @ts-ignore
    receivedMessages;
    // @ts-ignore
    issuedPresentations;
    // @ts-ignore
    receivedPresentations;
    // @ts-ignore
    issuedCredentials;
    // @ts-ignore
    receivedCredentials;
    // @ts-ignore
    issuedClaims;
    // @ts-ignore
    receivedClaims;
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
    async getLatestClaimValue(dbConnection, where) {
        const claim = await (await dbConnection).getRepository(Claim).findOne({
            where: {
                ...where,
                subject: this.did,
            },
            order: {
                issuanceDate: 'DESC',
            },
        });
        return claim?.value;
    }
    shortDid() {
        return `${this.did.slice(0, 15)}...${this.did.slice(-4)}`;
    }
};
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Identifier.prototype, "did", void 0);
__decorate([
    Column({ nullable: true })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Identifier.prototype, "provider", void 0);
__decorate([
    Column({ nullable: true })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Identifier.prototype, "alias", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Identifier.prototype, "setSaveDate", null);
__decorate([
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Identifier.prototype, "setUpdateDate", null);
__decorate([
    Column({ select: false })
    // @ts-ignore
    ,
    __metadata("design:type", Date)
], Identifier.prototype, "saveDate", void 0);
__decorate([
    Column({ select: false })
    // @ts-ignore
    ,
    __metadata("design:type", Date)
], Identifier.prototype, "updateDate", void 0);
__decorate([
    Column({ nullable: true })
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Identifier.prototype, "controllerKeyId", void 0);
__decorate([
    OneToMany((type) => Key, (key) => key.identifier)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "keys", void 0);
__decorate([
    OneToMany((type) => Service, (service) => service.identifier, {
        cascade: true,
    })
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "services", void 0);
__decorate([
    OneToMany((type) => Message, (message) => message.from)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "sentMessages", void 0);
__decorate([
    OneToMany((type) => Message, (message) => message.to)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "receivedMessages", void 0);
__decorate([
    OneToMany((type) => Presentation, (presentation) => presentation.holder)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "issuedPresentations", void 0);
__decorate([
    ManyToMany((type) => Presentation, (presentation) => presentation.verifier)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "receivedPresentations", void 0);
__decorate([
    OneToMany((type) => Credential, (credential) => credential.issuer)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "issuedCredentials", void 0);
__decorate([
    OneToMany((type) => Credential, (credential) => credential.subject)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "receivedCredentials", void 0);
__decorate([
    OneToMany((type) => Claim, (claim) => claim.issuer)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "issuedClaims", void 0);
__decorate([
    OneToMany((type) => Claim, (claim) => claim.subject)
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Identifier.prototype, "receivedClaims", void 0);
Identifier = __decorate([
    Entity('identifier'),
    Index(['alias', 'provider'], { unique: true })
], Identifier);
export { Identifier };
//# sourceMappingURL=identifier.js.map