/**
 * A class implementing {@link @veramo/core-types#IMessage | IMessage}.
 *
 * This is used by {@link @veramo/message-handler#MessageHandler | MessageHandler}.
 *
 * @public
 */
export class Message {
    constructor(data) {
        if (data?.raw) {
            this.raw = data.raw;
        }
        if (data?.metaData) {
            this.metaData = data.metaData;
        }
    }
    // @ts-ignore
    id;
    createdAt;
    expiresAt;
    threadId;
    // @ts-ignore
    type;
    raw;
    data;
    replyTo;
    replyUrl;
    from;
    to;
    returnRoute;
    metaData;
    presentations;
    credentials;
    attachments;
    addMetaData(meta) {
        if (this.metaData) {
            this.metaData.push(meta);
        }
        else {
            this.metaData = [meta];
        }
    }
    getLastMetaData() {
        if (this.metaData !== undefined && this.metaData.length > 0) {
            return this.metaData[this.metaData.length - 1];
        }
        else {
            return null;
        }
    }
    isValid() {
        if (this.type === null || this.type === '') {
            return false;
        }
        if (!this.raw || this.raw === null || this.raw === '') {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=message.js.map