var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, } from 'typeorm';
import { Identifier } from './identifier.js';
import { Message } from './message.js';
import { createCredentialEntity, Credential } from './credential.js';
import { asArray, computeEntryHash } from '@veramo/utils';
import { normalizeCredential } from 'did-jwt-vc';
/**
 * Represents some common properties of a Verifiable Presentation that are stored in a TypeORM database for querying.
 *
 * @see {@link @veramo/core-types#IDataStoreORM.dataStoreORMGetVerifiablePresentations | dataStoreORMGetVerifiablePresentations} for the interface defining how this can be queried.
 *
 * @see {@link @veramo/data-store#DataStoreORM | DataStoreORM} for the implementation of the query interface.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
let Presentation = class Presentation extends BaseEntity {
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
    holder;
    // @ts-ignore
    verifier;
    id;
    // @ts-ignore
    issuanceDate;
    expirationDate;
    // @ts-ignore
    context;
    // @ts-ignore
    type;
    // @ts-ignore
    credentials;
    // @ts-ignore
    messages;
};
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Presentation.prototype, "hash", void 0);
__decorate([
    Column({ type: 'simple-json' }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Presentation.prototype, "raw", null);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier.issuedPresentations, {
        cascade: ['insert'],
        eager: true,
        onDelete: 'CASCADE',
    })
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Presentation.prototype, "holder", void 0);
__decorate([
    ManyToMany((type) => Identifier, (identifier) => identifier?.receivedPresentations, {
        cascade: ['insert'],
        eager: true,
        nullable: true,
    }),
    JoinTable()
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Presentation.prototype, "verifier", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Presentation.prototype, "id", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", Date)
], Presentation.prototype, "issuanceDate", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Presentation.prototype, "expirationDate", void 0);
__decorate([
    Column('simple-array')
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Presentation.prototype, "context", void 0);
__decorate([
    Column('simple-array')
    // @ts-ignore
    ,
    __metadata("design:type", Array)
], Presentation.prototype, "type", void 0);
__decorate([
    ManyToMany((type) => Credential, (credential) => credential.presentations, {
        cascade: true,
    }),
    JoinTable()
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Presentation.prototype, "credentials", void 0);
__decorate([
    ManyToMany((type) => Message, (message) => message.presentations)
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Presentation.prototype, "messages", void 0);
Presentation = __decorate([
    Entity('presentation')
], Presentation);
export { Presentation };
export const createPresentationEntity = (vpi) => {
    const vp = vpi;
    const presentation = new Presentation();
    presentation.context = asArray(vp['@context']);
    presentation.type = asArray(vp.type || []);
    presentation.id = vp.id;
    if (vp.issuanceDate) {
        presentation.issuanceDate = new Date(vp.issuanceDate);
    }
    if (vp.expirationDate) {
        presentation.expirationDate = new Date(vp.expirationDate);
    }
    const holder = new Identifier();
    holder.did = vp.holder;
    presentation.holder = holder;
    presentation.verifier = asArray(vp.verifier || []).map((verifierDid) => {
        const id = new Identifier();
        id.did = verifierDid;
        return id;
    });
    presentation.raw = vpi;
    presentation.credentials = (vp.verifiableCredential || [])
        .map((cred) => {
        if (typeof cred === 'string') {
            return normalizeCredential(cred);
        }
        else {
            return cred;
        }
    })
        .map(createCredentialEntity);
    return presentation;
};
//# sourceMappingURL=presentation.js.map