import { AbstractDIDStore } from './abstract-identifier-store.js';
/**
 * An implementation of {@link AbstractDIDStore} that stores everything in memory.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class MemoryDIDStore extends AbstractDIDStore {
    identifiers = {};
    async getDID({ did, alias, provider, }) {
        if (did && !alias) {
            if (!this.identifiers[did])
                throw Error(`not_found: IIdentifier not found with did=${did}`);
            return this.identifiers[did];
        }
        else if (!did && alias) {
            for (const key of Object.keys(this.identifiers)) {
                if (this.identifiers[key].alias === alias) {
                    return this.identifiers[key];
                }
            }
        }
        else {
            throw Error('invalid_argument: Get requires did or (alias and provider)');
        }
        throw Error(`not_found: IIdentifier not found with alias=${alias} provider=${provider}`);
    }
    async deleteDID({ did }) {
        delete this.identifiers[did];
        return true;
    }
    async importDID(args) {
        const identifier = { ...args };
        for (const key of identifier.keys) {
            if (key.privateKeyHex) {
                delete key.privateKeyHex;
            }
        }
        this.identifiers[args.did] = identifier;
        return true;
    }
    async listDIDs(args) {
        let result = [];
        for (const key of Object.keys(this.identifiers)) {
            result.push(this.identifiers[key]);
        }
        if (args.alias && !args.provider) {
            result = result.filter((i) => i.alias === args.alias);
        }
        else if (args.provider && !args.alias) {
            result = result.filter((i) => i.provider === args.provider);
        }
        else if (args.provider && args.alias) {
            result = result.filter((i) => i.provider === args.provider && i.alias === args.alias);
        }
        return result;
    }
}
//# sourceMappingURL=memory-did-store.js.map