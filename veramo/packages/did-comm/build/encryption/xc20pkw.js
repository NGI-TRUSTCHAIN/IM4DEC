import { randomBytes } from '@noble/hashes/utils';
import { concat } from '@veramo/utils';
import { XChaCha20Poly1305 } from '@stablelib/xchacha20poly1305';
export const xc20pKeyWrapper = {
    from: (wrappingKey) => {
        const cipher = new XChaCha20Poly1305(wrappingKey);
        const wrap = async (cek) => {
            const iv = randomBytes(cipher.nonceLength);
            const sealed = cipher.seal(iv, cek);
            return {
                ciphertext: sealed.subarray(0, sealed.length - cipher.tagLength),
                tag: sealed.subarray(sealed.length - cipher.tagLength),
                iv,
            };
        };
        return { wrap };
    },
    alg: 'XC20PKW',
};
export function xc20pDecrypter(key) {
    const cipher = new XChaCha20Poly1305(key);
    async function decrypt(sealed, iv, aad) {
        return cipher.open(iv, sealed, aad);
    }
    return { alg: 'dir', enc: 'XC20P', decrypt };
}
export function xc20pKeyUnwrapper(wrappingKey) {
    const unwrap = async (wrappedCek, iv, tag) => {
        try {
            const sealed = concat([wrappedCek, tag]);
            return xc20pDecrypter(wrappingKey).decrypt(sealed, iv);
        }
        catch (e) {
            return null;
        }
    };
    return { unwrap, alg: 'XC20PKW' };
}
//# sourceMappingURL=xc20pkw.js.map