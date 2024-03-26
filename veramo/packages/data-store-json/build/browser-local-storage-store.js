/**
 * Implementation of {@link VeramoJsonStore} that uses browser localStorage to store data.
 *
 * @example
 * ```
 * const dataStore = BrowserLocalStorageStore.fromLocalStorage('veramo-state')
 * const plugin = new DataStoreJson(dataStore)
 * ```
 *
 * @public
 */
export class BrowserLocalStorageStore {
    localStorageKey;
    notifyUpdate;
    dids;
    keys;
    privateKeys;
    credentials;
    claims;
    presentations;
    messages;
    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.notifyUpdate = async (oldState, newState) => {
            this.save(newState);
        };
        this.dids = {};
        this.keys = {};
        this.privateKeys = {};
        this.credentials = {};
        this.claims = {};
        this.presentations = {};
        this.messages = {};
    }
    static fromLocalStorage(localStorageKey) {
        const store = new BrowserLocalStorageStore(localStorageKey);
        return store.load();
    }
    load() {
        if (typeof window !== 'undefined') {
            const rawCache = window.localStorage.getItem(this.localStorageKey) || '{}';
            let cache;
            try {
                cache = JSON.parse(rawCache);
            }
            catch (e) {
                cache = {};
            }
            ({
                dids: this.dids,
                keys: this.keys,
                credentials: this.credentials,
                claims: this.claims,
                presentations: this.presentations,
                messages: this.messages,
                privateKeys: this.privateKeys,
            } = {
                dids: {},
                keys: {},
                credentials: {},
                claims: {},
                presentations: {},
                messages: {},
                privateKeys: {},
                ...cache,
            });
        }
        return this;
    }
    save(newState) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(this.localStorageKey, JSON.stringify(newState));
        }
    }
}
//# sourceMappingURL=browser-local-storage-store.js.map