import { AESKW } from '@stablelib/aes-kw';
/**
 * Creates a wrapper using AES-KW
 * @param wrappingKey
 */
export const a256KeyWrapper = {
    from: (wrappingKey) => {
        const wrap = async (cek) => {
            return { ciphertext: new AESKW(wrappingKey).wrapKey(cek) };
        };
        return { wrap };
    },
    alg: 'A256KW',
};
export function a256KeyUnwrapper(wrappingKey) {
    const unwrap = async (wrappedCek) => {
        try {
            return new AESKW(wrappingKey).unwrapKey(wrappedCek);
        }
        catch (e) {
            return null;
        }
    };
    return { unwrap, alg: 'A256KW' };
}
//# sourceMappingURL=a256kw.js.map