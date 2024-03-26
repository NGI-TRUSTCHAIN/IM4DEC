/**
 * The LdContextLoader is initialized with a List of Map<string, ContextDoc | Promise<ContextDoc>>
 * that it unifies into a single Map to provide to the documentLoader within
 * the w3c credential module.
 */
import { isIterable } from '@veramo/utils';
export class LdContextLoader {
    contexts;
    constructor(options) {
        this.contexts = {};
        Array.from(options.contextsPaths, (mapItem) => {
            const map = isIterable(mapItem) ? mapItem : Object.entries(mapItem);
            // generate-plugin-schema is failing unless we use the cast to `any[]`
            for (const [key, value] of map) {
                this.contexts[key] = value;
            }
        });
    }
    has(url) {
        return this.contexts[url] !== null && typeof this.contexts[url] !== 'undefined';
    }
    async get(url) {
        return this.contexts[url];
    }
}
//# sourceMappingURL=ld-context-loader.js.map