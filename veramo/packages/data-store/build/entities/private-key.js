var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
/**
 * Represents some properties of a {@link @veramo/key-manager#ManagedPrivateKey | ManagedPrivateKey} that are stored in
 * a TypeORM database when using a {@link @veramo/data-store#PrivateKeyStore | PrivateKeyStore} to store private key
 * data.
 *
 * @see {@link @veramo/kms-local#KeyManagementSystem | KeyManagementSystem} for an implementation of a KMS that can
 *   make use of such stored keys.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
let PrivateKey = class PrivateKey extends BaseEntity {
    // @ts-ignore
    alias;
    // @ts-ignore
    type;
    // @ts-ignore
    privateKeyHex;
};
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], PrivateKey.prototype, "alias", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], PrivateKey.prototype, "type", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], PrivateKey.prototype, "privateKeyHex", void 0);
PrivateKey = __decorate([
    Entity('private-key')
], PrivateKey);
export { PrivateKey };
//# sourceMappingURL=private-key.js.map