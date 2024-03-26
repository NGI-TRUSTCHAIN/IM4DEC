import type { KeyWrapper } from 'did-jwt';
/**
 * Creates a wrapper using AES-KW
 * @param wrappingKey
 */
export declare const a256KeyWrapper: KeyWrapper;
export declare function a256KeyUnwrapper(wrappingKey: Uint8Array): {
    unwrap: (wrappedCek: Uint8Array) => Promise<Uint8Array | null>;
    alg: string;
};
//# sourceMappingURL=a256kw.d.ts.map