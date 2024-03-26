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
 * Represents some properties of a {@link @veramo/core-types#IKey | IKey} that are stored in a TypeORM
 * database for the purpose of keeping track of the {@link @veramo/key-manager#AbstractKeyManagementSystem}
 * implementations and the keys they are able to use.
 *
 * @see {@link @veramo/data-store#KeyStore | KeyStore} for the implementation used by the
 *   {@link @veramo/key-manager#KeyManager | KeyManager}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
let Key = class Key extends BaseEntity {
    // @ts-ignore
    kid;
    // @ts-ignore
    kms;
    // @ts-ignore
    type;
    // @ts-ignore
    publicKeyHex;
    meta;
    identifier;
};
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Key.prototype, "kid", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Key.prototype, "kms", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Key.prototype, "type", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Key.prototype, "publicKeyHex", void 0);
__decorate([
    Column({
        type: 'simple-json',
        nullable: true,
        transformer: {
            to: (value) => {
                return value;
            },
            from: (value) => {
                return value;
            },
        },
    }),
    __metadata("design:type", Object)
], Key.prototype, "meta", void 0);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier?.keys, { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], Key.prototype, "identifier", void 0);
Key = __decorate([
    Entity('key')
], Key);
export { Key };
//# sourceMappingURL=key.js.map