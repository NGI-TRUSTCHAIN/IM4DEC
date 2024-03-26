var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, } from 'typeorm';
import { Identifier } from './identifier.js';
import { Message } from './message.js';
import { Presentation } from './presentation.js';
import { Claim } from './claim.js';
import { asArray, computeEntryHash, extractIssuer } from '@veramo/utils';
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
let Credential = class Credential extends BaseEntity {
    // @ts-ignore
    hash;
    // @ts-ignore
    _raw;
    set raw(raw) {
        this._raw = raw;
        this.hash = computeEntryHash(raw);
    }
    get raw() {
        return this._raw;
    }
    // @ts-ignore
    issuer;
    // Subject can be null https://w3c.github.io/vc-data-model/#credential-uniquely-identifies-a-subject
    subject;
    id;
    // @ts-ignore
    issuanceDate;
    expirationDate;
    // @ts-ignore
    context;
    // @ts-ignore
    type;
    // @ts-ignore
    claims;
    // @ts-ignore
    presentations;
    // @ts-ignore
    messages;
};
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Credential.prototype, "hash", void 0);
__decorate([
    Column('simple-json'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Credential.prototype, "raw", null);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier.issuedCredentials, {
        cascade: ['insert'],
        eager: true,
        onDelete: 'CASCADE',
    })
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Credential.prototype, "issuer", void 0);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier?.receivedCredentials, {
        cascade: ['insert'],
        eager: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Credential.prototype, "subject", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Credential.prototype, "id", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", Date)
], Credential.prototype, "issuanceDate", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Credential.prototype, "expirationDate", void 0);
__decorate([
    Column('simple-array')
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Credential.prototype, "context", void 0);
__decorate([
    Column('simple-array')
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Credential.prototype, "type", void 0);
__decorate([
    OneToMany((type) => Claim, (claim) => claim.credential, {
        cascade: ['insert'],
    })
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Credential.prototype, "claims", void 0);
__decorate([
    ManyToMany((type) => Presentation, (presentation) => presentation.credentials)
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Credential.prototype, "presentations", void 0);
__decorate([
    ManyToMany((type) => Message, (message) => message.credentials)
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Credential.prototype, "messages", void 0);
Credential = __decorate([
    Entity('credential')
], Credential);
export { Credential };
export const createCredentialEntity = (vci) => {
    const vc = vci;
    const credential = new Credential();
    credential.context = asArray(vc['@context']);
    credential.type = asArray(vc.type || []);
    credential.id = vc.id;
    if (vc.issuanceDate) {
        credential.issuanceDate = new Date(vc.issuanceDate);
    }
    if (vc.expirationDate) {
        credential.expirationDate = new Date(vc.expirationDate);
    }
    const issuer = new Identifier();
    issuer.did = extractIssuer(vc);
    credential.issuer = issuer;
    if (vc.credentialSubject.id) {
        const subject = new Identifier();
        subject.did = vc.credentialSubject.id;
        credential.subject = subject;
    }
    credential.claims = [];
    for (const type in vc.credentialSubject) {
        if (vc.credentialSubject.hasOwnProperty(type)) {
            const value = vc.credentialSubject[type];
            if (type !== 'id') {
                const isObj = typeof value === 'function' || (typeof value === 'object' && !!value);
                const claim = new Claim();
                claim.hash = computeEntryHash(JSON.stringify(vc) + type);
                claim.type = type;
                claim.value = isObj ? JSON.stringify(value) : value;
                claim.isObj = isObj;
                claim.issuer = credential.issuer;
                claim.subject = credential.subject;
                claim.expirationDate = credential.expirationDate;
                claim.issuanceDate = credential.issuanceDate;
                claim.credentialType = credential.type;
                claim.context = credential.context;
                credential.claims.push(claim);
            }
        }
    }
    credential.raw = vci;
    return credential;
};
//# sourceMappingURL=credential.js.map