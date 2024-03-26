import { IMessage, IMetaData, IMessageAttachment, VerifiableCredential, VerifiablePresentation } from '@veramo/core-types';
/**
 * A class implementing {@link @veramo/core-types#IMessage | IMessage}.
 *
 * This is used by {@link @veramo/message-handler#MessageHandler | MessageHandler}.
 *
 * @public
 */
export declare class Message implements IMessage {
    constructor(data?: {
        raw: string;
        metaData?: IMetaData[];
    });
    id: string;
    createdAt?: string;
    expiresAt?: string;
    threadId?: string;
    type: string;
    raw?: string;
    data?: any;
    replyTo?: string[];
    replyUrl?: string;
    from?: string;
    to?: string;
    returnRoute?: string;
    metaData?: IMetaData[];
    presentations?: VerifiablePresentation[];
    credentials?: VerifiableCredential[];
    attachments?: IMessageAttachment[];
    addMetaData(meta: IMetaData): void;
    getLastMetaData(): IMetaData | null;
    isValid(): boolean;
}
//# sourceMappingURL=message.d.ts.map