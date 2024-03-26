/**
 * The LdContextLoader is initialized with a List of Map<string, ContextDoc | Promise<ContextDoc>>
 * that it unifies into a single Map to provide to the documentLoader within
 * the w3c credential module.
 */
import { OrPromise, RecordLike } from '@veramo/utils';
import { ContextDoc } from './types.js';
export declare class LdContextLoader {
    private readonly contexts;
    constructor(options: {
        contextsPaths: RecordLike<OrPromise<ContextDoc>>[];
    });
    has(url: string): boolean;
    get(url: string): Promise<ContextDoc>;
}
//# sourceMappingURL=ld-context-loader.d.ts.map