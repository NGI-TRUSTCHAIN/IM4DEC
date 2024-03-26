import { AES } from '@stablelib/aes';
import { GCM } from '@stablelib/gcm';
import { randomBytes } from '@noble/hashes/utils';
import { bytesToBase64url, encodeBase64url } from '@veramo/utils';
import { fromString } from 'uint8arrays/from-string';
function createA256GCMEncrypter(key) {
    const blockcipher = new AES(key);
    const cipher = new GCM(blockcipher);
    return (cleartext, aad) => {
        const iv = randomBytes(cipher.nonceLength);
        const sealed = cipher.seal(iv, cleartext, aad);
        return {
            ciphertext: sealed.subarray(0, sealed.length - cipher.tagLength),
            tag: sealed.subarray(sealed.length - cipher.tagLength),
            iv,
        };
    };
}
export function a256gcmDirEncrypter(key) {
    const enc = 'A256GCM';
    const alg = 'dir';
    async function encrypt(cleartext, protectedHeader = {}, aad) {
        const protHeader = encodeBase64url(JSON.stringify(Object.assign({ alg }, protectedHeader, { enc })));
        const encodedAad = fromString(aad ? `${protHeader}.${bytesToBase64url(aad)}` : protHeader, 'utf-8');
        return {
            ...createA256GCMEncrypter(key)(cleartext, encodedAad),
            protectedHeader: protHeader,
        };
    }
    return { alg, enc, encrypt };
}
export function a256gcmDirDecrypter(key) {
    const cipher = new GCM(new AES(key));
    async function decrypt(sealed, iv, aad) {
        return cipher.open(iv, sealed, aad);
    }
    return { alg: 'dir', enc: 'A256GCM', decrypt };
}
//# sourceMappingURL=a256gcm-dir.js.map