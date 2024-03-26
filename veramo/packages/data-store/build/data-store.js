import schema from '@veramo/core-types/build/plugin.schema.json' assert { type: 'json' };
import { createMessage, createMessageEntity, Message } from './entities/message.js';
import { createCredentialEntity, Credential } from './entities/credential.js';
import { Claim } from './entities/claim.js';
import { createPresentationEntity, Presentation } from './entities/presentation.js';
import { getConnectedDb } from './utils.js';
/**
 * This class implements the {@link @veramo/core-types#IDataStore} interface using a TypeORM compatible database.
 *
 * This allows you to store and retrieve Verifiable Credentials, Presentations and Messages by their IDs.
 *
 * For more complex queries you should use {@link @veramo/data-store#DataStoreORM} which is the default way to query
 * the stored data by some common properties. These two classes MUST also share the same database connection.
 *
 * @see {@link @veramo/core-types#IDataStoreORM}
 * @see {@link @veramo/core-types#IDataStore}
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class DataStore {
    methods;
    schema = schema.IDataStore;
    dbConnection;
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        this.methods = {
            dataStoreSaveMessage: this.dataStoreSaveMessage.bind(this),
            dataStoreGetMessage: this.dataStoreGetMessage.bind(this),
            dataStoreDeleteMessage: this.dataStoreDeleteMessage.bind(this),
            dataStoreDeleteVerifiableCredential: this.dataStoreDeleteVerifiableCredential.bind(this),
            dataStoreSaveVerifiableCredential: this.dataStoreSaveVerifiableCredential.bind(this),
            dataStoreGetVerifiableCredential: this.dataStoreGetVerifiableCredential.bind(this),
            dataStoreSaveVerifiablePresentation: this.dataStoreSaveVerifiablePresentation.bind(this),
            dataStoreGetVerifiablePresentation: this.dataStoreGetVerifiablePresentation.bind(this),
        };
    }
    async dataStoreSaveMessage(args) {
        const message = await (await getConnectedDb(this.dbConnection))
            .getRepository(Message)
            .save(createMessageEntity(args.message));
        return message.id;
    }
    async dataStoreGetMessage(args) {
        const messageEntity = await (await getConnectedDb(this.dbConnection)).getRepository(Message).findOne({
            where: { id: args.id },
            relations: ['credentials', 'presentations'],
        });
        if (!messageEntity)
            throw new Error('not_found: Message not found');
        return createMessage(messageEntity);
    }
    async dataStoreDeleteMessage(args) {
        const messageEntity = await (await getConnectedDb(this.dbConnection)).getRepository(Message).findOne({
            where: { id: args.id },
            relations: ['credentials', 'presentations'],
        });
        if (!messageEntity) {
            return false;
        }
        await (await getConnectedDb(this.dbConnection)).getRepository(Message).remove(messageEntity);
        return true;
    }
    async dataStoreDeleteVerifiableCredential(args) {
        const credentialEntity = await (await getConnectedDb(this.dbConnection))
            .getRepository(Credential)
            .findOneBy({ hash: args.hash });
        if (!credentialEntity) {
            return false;
        }
        const claims = await (await getConnectedDb(this.dbConnection))
            .getRepository(Claim)
            .find({ where: { credential: { hash: credentialEntity.hash } } });
        await (await getConnectedDb(this.dbConnection)).getRepository(Claim).remove(claims);
        await (await getConnectedDb(this.dbConnection)).getRepository(Credential).remove(credentialEntity);
        return true;
    }
    async dataStoreSaveVerifiableCredential(args) {
        const verifiableCredential = await (await getConnectedDb(this.dbConnection))
            .getRepository(Credential)
            .save(createCredentialEntity(args.verifiableCredential));
        return verifiableCredential.hash;
    }
    async dataStoreGetVerifiableCredential(args) {
        const credentialEntity = await (await getConnectedDb(this.dbConnection))
            .getRepository(Credential)
            .findOneBy({ hash: args.hash });
        if (!credentialEntity)
            throw new Error('not_found: Verifiable credential not found');
        return credentialEntity.raw;
    }
    async dataStoreSaveVerifiablePresentation(args) {
        const verifiablePresentation = await (await getConnectedDb(this.dbConnection))
            .getRepository(Presentation)
            .save(createPresentationEntity(args.verifiablePresentation));
        return verifiablePresentation.hash;
    }
    async dataStoreGetVerifiablePresentation(args) {
        const presentationEntity = await (await getConnectedDb(this.dbConnection))
            .getRepository(Presentation)
            .findOneBy({ hash: args.hash });
        if (!presentationEntity)
            throw new Error('not_found: Verifiable presentation not found');
        return presentationEntity.raw;
    }
}
//# sourceMappingURL=data-store.js.map