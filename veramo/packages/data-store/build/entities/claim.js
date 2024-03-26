var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
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
let Claim = class Claim extends BaseEntity {
    // @ts-ignore
    hash;
    // @ts-ignore
    issuer;
    subject;
    // @ts-ignore
    credential;
    // @ts-ignore
    issuanceDate;
    expirationDate;
    // @ts-ignore
    context;
    // @ts-ignore
    credentialType;
    // @ts-ignore
    type;
    // @ts-ignore
    value;
    // @ts-ignore
    isObj;
};
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Claim.prototype, "hash", void 0);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier.issuedClaims, {
        eager: true,
        onDelete: 'CASCADE',
    })
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Claim.prototype, "issuer", void 0);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier.receivedClaims, {
        eager: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Claim.prototype, "subject", void 0);
__decorate([
    ManyToOne((type) => Credential, (credential) => credential.claims, {
        onDelete: 'CASCADE',
    })
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Claim.prototype, "credential", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", Date)
], Claim.prototype, "issuanceDate", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Claim.prototype, "expirationDate", void 0);
__decorate([
    Column('simple-array')
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Claim.prototype, "context", void 0);
__decorate([
    Column('simple-array')
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Claim.prototype, "credentialType", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Claim.prototype, "type", void 0);
__decorate([
    Column('text', { nullable: true })
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Claim.prototype, "value", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", Boolean)
], Claim.prototype, "isObj", void 0);
Claim = __decorate([
    Entity('claim')
], Claim);
export { Claim };
//# sourceMappingURL=claim.js.map