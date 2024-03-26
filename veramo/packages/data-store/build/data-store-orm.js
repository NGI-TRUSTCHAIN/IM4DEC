import schema from '@veramo/core-types/build/plugin.schema.json' assert { type: 'json' };
import { createMessage, Message } from './entities/message.js';
import { Claim } from './entities/claim.js';
import { Credential } from './entities/credential.js';
import { Presentation } from './entities/presentation.js';
import { Identifier } from './entities/identifier.js';
import { Any, Between, Brackets, Equal, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, } from 'typeorm';
import { getConnectedDb } from './utils.js';
/**
 * This class implements the {@link @veramo/core-types#IDataStoreORM} query interface using a TypeORM compatible database.
 *
 * This allows you to filter Verifiable Credentials, Presentations and Messages by some common properties that are
 * parsed and stored in database tables.
 *
 * This class is designed to work with {@link @veramo/data-store#DataStore} which is the default way to populate the
 * database with Credentials, Presentations and Messages in such a way that they can be queried by this class.
 * These two classes MUST also share the same database connection.
 *
 * @see {@link @veramo/core-types#IDataStoreORM}
 * @see {@link @veramo/core-types#IDataStore}
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class DataStoreORM {
    methods;
    schema = schema.IDataStoreORM;
    dbConnection;
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        this.methods = {
            dataStoreORMGetIdentifiers: this.dataStoreORMGetIdentifiers.bind(this),
            dataStoreORMGetIdentifiersCount: this.dataStoreORMGetIdentifiersCount.bind(this),
            dataStoreORMGetMessages: this.dataStoreORMGetMessages.bind(this),
            dataStoreORMGetMessagesCount: this.dataStoreORMGetMessagesCount.bind(this),
            dataStoreORMGetVerifiableCredentialsByClaims: this.dataStoreORMGetVerifiableCredentialsByClaims.bind(this),
            dataStoreORMGetVerifiableCredentialsByClaimsCount: this.dataStoreORMGetVerifiableCredentialsByClaimsCount.bind(this),
            dataStoreORMGetVerifiableCredentials: this.dataStoreORMGetVerifiableCredentials.bind(this),
            dataStoreORMGetVerifiableCredentialsCount: this.dataStoreORMGetVerifiableCredentialsCount.bind(this),
            dataStoreORMGetVerifiablePresentations: this.dataStoreORMGetVerifiablePresentations.bind(this),
            dataStoreORMGetVerifiablePresentationsCount: this.dataStoreORMGetVerifiablePresentationsCount.bind(this),
        };
    }
    // Identifiers
    async identifiersQuery(args, context) {
        const where = createWhereObject(args);
        let qb = (await getConnectedDb(this.dbConnection))
            .getRepository(Identifier)
            .createQueryBuilder('identifier')
            .leftJoinAndSelect('identifier.keys', 'keys')
            .leftJoinAndSelect('identifier.services', 'services')
            .where(where);
        qb = decorateQB(qb, 'message', args);
        return qb;
    }
    async dataStoreORMGetIdentifiers(args, context) {
        const identifiers = await (await this.identifiersQuery(args)).getMany();
        return identifiers.map((i) => {
            const identifier = i;
            if (identifier.controllerKeyId === null) {
                delete identifier.controllerKeyId;
            }
            if (identifier.alias === null) {
                delete identifier.alias;
            }
            if (identifier.provider === null) {
                delete identifier.provider;
            }
            return identifier;
        });
    }
    async dataStoreORMGetIdentifiersCount(args, context) {
        return await (await this.identifiersQuery(args, context)).getCount();
    }
    // Messages
    async messagesQuery(args, context) {
        const where = createWhereObject(args);
        let qb = (await getConnectedDb(this.dbConnection))
            .getRepository(Message)
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.from', 'from')
            .leftJoinAndSelect('message.to', 'to')
            .leftJoinAndSelect('message.credentials', 'credentials')
            .leftJoinAndSelect('message.presentations', 'presentations')
            .where(where);
        qb = decorateQB(qb, 'message', args);
        if (context.authorizedDID) {
            qb = qb.andWhere(new Brackets((qb) => {
                qb.where('message.to = :ident', { ident: context.authorizedDID }).orWhere('message.from = :ident', {
                    ident: context.authorizedDID,
                });
            }));
        }
        return qb;
    }
    async dataStoreORMGetMessages(args, context) {
        const messages = await (await this.messagesQuery(args, context)).getMany();
        return messages.map(createMessage);
    }
    async dataStoreORMGetMessagesCount(args, context) {
        return (await this.messagesQuery(args, context)).getCount();
    }
    // Claims
    async claimsQuery(args, context) {
        const where = createWhereObject(args);
        let qb = (await getConnectedDb(this.dbConnection))
            .getRepository(Claim)
            .createQueryBuilder('claim')
            .leftJoinAndSelect('claim.issuer', 'issuer')
            .leftJoinAndSelect('claim.subject', 'subject')
            .where(where);
        qb = decorateQB(qb, 'claim', args);
        qb = qb.leftJoinAndSelect('claim.credential', 'credential');
        if (context.authorizedDID) {
            qb = qb.andWhere(new Brackets((qb) => {
                qb.where('claim.subject = :ident', { ident: context.authorizedDID }).orWhere('claim.issuer = :ident', {
                    ident: context.authorizedDID,
                });
            }));
        }
        return qb;
    }
    async dataStoreORMGetVerifiableCredentialsByClaims(args, context) {
        const claims = await (await this.claimsQuery(args, context)).getMany();
        return claims
            .map((claim) => ({
            hash: claim.credential.hash,
            verifiableCredential: claim.credential.raw,
        }))
            .reduce((acc, current) => {
            if (!acc.some((item) => item.hash === current.hash)) {
                acc.push(current);
            }
            return acc;
        }, []);
    }
    async dataStoreORMGetVerifiableCredentialsByClaimsCount(args, context) {
        return (await this.claimsQuery(args, context)).getCount();
    }
    // Credentials
    async credentialsQuery(args, context) {
        const where = createWhereObject(args);
        let qb = (await getConnectedDb(this.dbConnection))
            .getRepository(Credential)
            .createQueryBuilder('credential')
            .leftJoinAndSelect('credential.issuer', 'issuer')
            .leftJoinAndSelect('credential.subject', 'subject')
            .where(where);
        qb = decorateQB(qb, 'credential', args);
        if (context.authorizedDID) {
            qb = qb.andWhere(new Brackets((qb) => {
                qb.where('credential.subject = :ident', { ident: context.authorizedDID }).orWhere('credential.issuer = :ident', {
                    ident: context.authorizedDID,
                });
            }));
        }
        return qb;
    }
    async dataStoreORMGetVerifiableCredentials(args, context) {
        const credentials = await (await this.credentialsQuery(args, context)).getMany();
        return credentials.map((vc) => ({
            hash: vc.hash,
            verifiableCredential: vc.raw,
        }));
    }
    async dataStoreORMGetVerifiableCredentialsCount(args, context) {
        return (await this.credentialsQuery(args, context)).getCount();
    }
    // Presentations
    async presentationsQuery(args, context) {
        const where = createWhereObject(args);
        let qb = (await getConnectedDb(this.dbConnection))
            .getRepository(Presentation)
            .createQueryBuilder('presentation')
            .leftJoinAndSelect('presentation.holder', 'holder')
            .leftJoinAndSelect('presentation.verifier', 'verifier')
            .where(where);
        qb = decorateQB(qb, 'presentation', args);
        qb = addVerifierQuery(args, qb);
        if (context.authorizedDID) {
            qb = qb.andWhere(new Brackets((qb) => {
                qb.where('verifier.did = :ident', {
                    ident: context.authorizedDID,
                }).orWhere('presentation.holder = :ident', { ident: context.authorizedDID });
            }));
        }
        return qb;
    }
    async dataStoreORMGetVerifiablePresentations(args, context) {
        const presentations = await (await this.presentationsQuery(args, context)).getMany();
        return presentations.map((vp) => ({
            hash: vp.hash,
            verifiablePresentation: vp.raw,
        }));
    }
    async dataStoreORMGetVerifiablePresentationsCount(args, context) {
        return (await this.presentationsQuery(args, context)).getCount();
    }
}
function opToSQL(item) {
    switch (item.op) {
        case 'IsNull':
            return ['IS NULL', ''];
        case 'Like':
            if (item.value?.length != 1)
                throw Error('Operation Equal requires one value');
            return ['LIKE :value', item.value[0]];
        case 'Equal':
            if (item.value?.length != 1)
                throw Error('Operation Equal requires one value');
            return ['= :value', item.value[0]];
        case 'Any':
        case 'Between':
        case 'LessThan':
        case 'LessThanOrEqual':
        case 'MoreThan':
        case 'MoreThanOrEqual':
            throw new Error(`${item.op} not compatible with DID argument`);
        case 'In':
        default:
            return ['IN (:...value)', item.value];
    }
}
function addVerifierQuery(input, qb) {
    if (!input) {
        return qb;
    }
    if (!Array.isArray(input.where)) {
        return qb;
    }
    const verifierWhere = input.where.find((item) => item.column === 'verifier');
    if (!verifierWhere) {
        return qb;
    }
    const [op, value] = opToSQL(verifierWhere);
    return qb.andWhere(`verifier.did ${op}`, { value });
}
function createWhereObject(input) {
    const where = {};
    if (input?.where) {
        for (const item of input.where) {
            if (item.column === 'verifier') {
                continue;
            }
            switch (item.op) {
                case 'Any':
                    if (!Array.isArray(item.value))
                        throw Error('Operator Any requires value to be an array');
                    where[item.column] = Any(item.value);
                    break;
                case 'Between':
                    if (item.value?.length != 2)
                        throw Error('Operation Between requires two values');
                    where[item.column] = Between(item.value[0], item.value[1]);
                    break;
                case 'Equal':
                    if (item.value?.length != 1)
                        throw Error('Operation Equal requires one value');
                    where[item.column] = Equal(item.value[0]);
                    break;
                case 'IsNull':
                    where[item.column] = IsNull();
                    break;
                case 'LessThan':
                    if (item.value?.length != 1)
                        throw Error('Operation LessThan requires one value');
                    where[item.column] = LessThan(item.value[0]);
                    break;
                case 'LessThanOrEqual':
                    if (item.value?.length != 1)
                        throw Error('Operation LessThanOrEqual requires one value');
                    where[item.column] = LessThanOrEqual(item.value[0]);
                    break;
                case 'Like':
                    if (item.value?.length != 1)
                        throw Error('Operation Like requires one value');
                    where[item.column] = Like(item.value[0]);
                    break;
                case 'MoreThan':
                    if (item.value?.length != 1)
                        throw Error('Operation MoreThan requires one value');
                    where[item.column] = MoreThan(item.value[0]);
                    break;
                case 'MoreThanOrEqual':
                    if (item.value?.length != 1)
                        throw Error('Operation MoreThanOrEqual requires one value');
                    where[item.column] = MoreThanOrEqual(item.value[0]);
                    break;
                case 'In':
                default:
                    if (!Array.isArray(item.value))
                        throw Error('Operator IN requires value to be an array');
                    where[item.column] = In(item.value);
            }
            if (item.not === true) {
                where[item.column] = Not(where[item.column]);
            }
        }
    }
    return where;
}
function decorateQB(qb, tableName, input) {
    if (input?.skip)
        qb = qb.offset(input.skip);
    if (input?.take)
        qb = qb.limit(input.take);
    if (input?.order) {
        for (const item of input.order) {
            qb = qb.addSelect(qb.connection.driver.escape(tableName) + '.' + qb.connection.driver.escape(item.column), item.column);
            qb = qb.orderBy(qb.connection.driver.escape(item.column), item.direction);
        }
    }
    return qb;
}
//# sourceMappingURL=data-store-orm.js.map