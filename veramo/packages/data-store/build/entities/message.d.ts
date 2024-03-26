import { BaseEntity, Relation } from 'typeorm';
import { IMessage } from '@veramo/core-types';
import { Identifier } from './identifier.js';
import { Presentation } from './presentation.js';
import { Credential } from './credential.js';
/**
 * Represents message metadata as it is stored by {@link @veramo/data-store#DataStore | DataStore}.
 *
 * This metadata is most often used by {@link @veramo/message-handler#MessageHandler | MessageHandler} and
 * {@link @veramo/core-types#IMessageHandler | IMessageHandler} implementations to decorate messages that are interpreted and
 * decoded, but not returned as final, as they pass through the message handler chain.
 *
 * @beta - This API may change without a BREAKING CHANGE notice.
 */
export interface MetaData {
    type: string;
    value?: string;
}
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
export declare class Message extends BaseEntity {
    setId(): void;
    id: string;
    setSaveDate(): void;
    setUpdateDate(): void;
    saveDate: Date;
    updateDate: Date;
    createdAt?: Date;
    expiresAt?: Date;
    threadId?: string;
    type: string;
    raw?: string;
    data?: object | null;
    replyTo?: string[];
    replyUrl?: string;
    from?: Relation<Identifier>;
    to?: Relation<Identifier>;
    metaData?: MetaData[] | null;
    presentations: Relation<Presentation[]>;
    credentials: Relation<Credential[]>;
}
export declare const createMessageEntity: (args: IMessage) => Message;
export declare const createMessage: (args: Message) => IMessage;
//# sourceMappingURL=message.d.ts.map