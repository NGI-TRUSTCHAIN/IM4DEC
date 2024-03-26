var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, } from 'typeorm';
import { Identifier } from './identifier.js';
import { createPresentationEntity, Presentation } from './presentation.js';
import { createCredentialEntity, Credential } from './credential.js';
import { computeEntryHash } from '@veramo/utils';
import { v4 as uuidv4 } from 'uuid';
/**
 * Represents some common properties of an {@link @veramo/core-types#IMessage} that are stored in a TypeORM database for
 * querying.
 *
 * @see {@link @veramo/core-types#IDataStoreORM.dataStoreORMGetMessages | dataStoreORMGetMessages}
 *   for the interface defining how this can be queried
 *
 * @see {@link @veramo/data-store#DataStoreORM | DataStoreORM} for the implementation of the query interface.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
let Message = class Message extends BaseEntity {
    setId() {
        if (!this.id) {
            this.id = computeEntryHash(this.raw || uuidv4());
        }
    }
    // @ts-ignore
    id;
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
    createdAt;
    expiresAt;
    threadId;
    // @ts-ignore
    type;
    raw;
    data;
    // https://github.com/decentralized-identifier/didcomm-messaging/blob/41f35f992275dd71d459504d14eb8d70b4185533/jwm.md#jwm-profile
    replyTo;
    replyUrl;
    from;
    to;
    metaData;
    // @ts-ignore
    presentations;
    // @ts-ignore
    credentials;
};
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Message.prototype, "setId", null);
__decorate([
    PrimaryColumn()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Message.prototype, "setSaveDate", null);
__decorate([
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Message.prototype, "setUpdateDate", null);
__decorate([
    Column({ select: false })
    // @ts-ignore
    ,
    __metadata("design:type", Date)
], Message.prototype, "saveDate", void 0);
__decorate([
    Column({ select: false })
    // @ts-ignore
    ,
    __metadata("design:type", Date)
], Message.prototype, "updateDate", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "expiresAt", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "threadId", void 0);
__decorate([
    Column()
    // @ts-ignore
    ,
    __metadata("design:type", String)
], Message.prototype, "type", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "raw", void 0);
__decorate([
    Column('simple-json', { nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "data", void 0);
__decorate([
    Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Message.prototype, "replyTo", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "replyUrl", void 0);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier.sentMessages, {
        nullable: true,
        cascade: ['insert'],
        eager: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], Message.prototype, "from", void 0);
__decorate([
    ManyToOne((type) => Identifier, (identifier) => identifier.receivedMessages, {
        nullable: true,
        cascade: ['insert'],
        eager: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], Message.prototype, "to", void 0);
__decorate([
    Column('simple-json', { nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "metaData", void 0);
__decorate([
    ManyToMany((type) => Presentation, (presentation) => presentation.messages, {
        cascade: true,
    }),
    JoinTable()
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Message.prototype, "presentations", void 0);
__decorate([
    ManyToMany((type) => Credential, (credential) => credential.messages, { cascade: true }),
    JoinTable()
    // @ts-ignore
    ,
    __metadata("design:type", Object)
], Message.prototype, "credentials", void 0);
Message = __decorate([
    Entity('message')
], Message);
export { Message };
export const createMessageEntity = (args) => {
    const message = new Message();
    message.id = args.id;
    message.threadId = args.threadId;
    message.type = args.type;
    message.raw = args.raw;
    message.data = args.data;
    message.metaData = args.metaData;
    if (args.replyTo) {
        message.replyTo = args.replyTo;
    }
    if (args.replyUrl) {
        message.replyUrl = args.replyUrl;
    }
    if (args.createdAt) {
        message.createdAt = new Date(args.createdAt);
    }
    if (args.expiresAt) {
        message.createdAt = new Date(args.expiresAt);
    }
    if (args.from) {
        const from = new Identifier();
        from.did = args.from;
        message.from = from;
    }
    if (args.to) {
        const to = new Identifier();
        to.did = args.to;
        message.to = to;
    }
    if (args.presentations) {
        message.presentations = args.presentations.map(createPresentationEntity);
    }
    if (args.credentials) {
        message.credentials = args.credentials.map(createCredentialEntity);
    }
    return message;
};
export const createMessage = (args) => {
    const message = {
        id: args.id,
        type: args.type,
        raw: args.raw,
        data: args.data,
        metaData: args.metaData,
    };
    if (args.threadId) {
        message.threadId = args.threadId;
    }
    if (args.replyTo) {
        message.replyTo = args.replyTo;
    }
    if (args.replyTo) {
        message.replyUrl = args.replyUrl;
    }
    if (args.createdAt) {
        message.createdAt = args.createdAt.toISOString();
    }
    if (args.expiresAt) {
        message.expiresAt = args.expiresAt.toISOString();
    }
    if (args.from) {
        message.from = args.from.did;
    }
    if (args.to) {
        message.to = args.to.did;
    }
    if (args.presentations) {
        message.presentations = args.presentations.map((vp) => vp.raw);
    }
    if (args.credentials) {
        message.credentials = args.credentials.map((vc) => vc.raw);
    }
    return message;
};
//# sourceMappingURL=message.js.map