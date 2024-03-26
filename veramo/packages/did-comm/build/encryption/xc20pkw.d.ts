import type { Decrypter, KeyWrapper } from 'did-jwt';
export declare const xc20pKeyWrapper: KeyWrapper;
export declare function xc20pDecrypter(key: Uint8Array): Decrypter;
export declare function xc20pKeyUnwrapper(wrappingKey: Uint8Array): {
    unwrap: (wrappedCek: Uint8Array, iv: Uint8Array, tag: Uint8Array) => Promise<Uint8Array | null>;
    alg: string;
};
//# sourceMappingURL=xc20pkw.d.ts.map