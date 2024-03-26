var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Key } from './key.js';
/**
 * This represents the private key data of keys that were stored by {@link @veramo/data-store#KeyStore} before Veramo
 * 3.0. During database migration this key material is moved to a different table and accessible by
 * {@link @veramo/data-store#PrivateKeyStore}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
let PreMigrationKey = class PreMigrationKey extends Key {
    // Key contains all the other columns present needed for successful migrations
    // @ts-ignore
    kid;
    privateKeyHex;
};
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], PreMigrationKey.prototype, "kid", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], PreMigrationKey.prototype, "privateKeyHex", void 0);
PreMigrationKey = __decorate([
    Entity('key')
], PreMigrationKey);
export { PreMigrationKey };
//# sourceMappingURL=PreMigrationEntities.js.map