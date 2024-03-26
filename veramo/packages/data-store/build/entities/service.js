var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Identifier } from './identifier.js';
/**
 * Represents some properties of a {@link did-resolver#ServiceEndpoint | ServiceEndpoint} as it is stored in a TypeORM
 * database. This is used by {@link @veramo/data-store#DIDStore | DIDStore} to provide information to
 * {@link @veramo/did-manager#DIDManager | DIDManager} when DID management information is stored in a local TypeORM
 * database.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
let Service = class Service extends BaseEntity {
    // @ts-ignore
    id;
    // @ts-ignore
    type;
    // @ts-ignore
    serviceEndpoint;
    description;
    // @ts-ignore
    identifier;
};
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Service.prototype, "type", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Service.prototype, "serviceEndpoint", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier?.services, { onDelete: 'CASCADE' })
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Service.prototype, "identifier", void 0);
Service = __decorate([
    Entity('service')
], Service);
export { Service };
//# sourceMappingURL=service.js.map