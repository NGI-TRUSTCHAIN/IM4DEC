import { computeX25519Ecdh1PUv3Kek, computeX25519EcdhEsKek, createX25519Ecdh1PUv3Kek, createX25519EcdhEsKek, xc20pDirEncrypter, } from 'did-jwt';
import { createFullEncrypter } from './createEncrypter.js';
import { base64ToBytes } from '@veramo/utils';
import { xc20pDecrypter, xc20pKeyUnwrapper, xc20pKeyWrapper } from './xc20pkw.js';
import { a256cbcHs512DirDecrypter, a256cbcHs512DirEncrypter } from './a256cbc-hs512-dir.js';
import { a256gcmDirDecrypter, a256gcmDirEncrypter } from './a256gcm-dir.js';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// A256CBC-HS512
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function a256cbcHs512AnonEncrypterX25519WithXC20PKW(recipientPublicKey, kid, apv) {
    return createFullEncrypter(recipientPublicKey, undefined, { apv, kid }, { createKek: createX25519EcdhEsKek, alg: 'ECDH-ES' }, xc20pKeyWrapper, { from: (cek) => a256cbcHs512DirEncrypter(cek), enc: 'A256CBC-HS512' });
}
export function a256cbcHs512AnonDecrypterX25519WithXC20PKW(receiverSecret) {
    const alg = 'ECDH-ES+XC20PKW';
    const enc = 'A256CBC-HS512';
    async function decrypt(sealed, iv, aad, recipient) {
        recipient = recipient;
        const kek = await computeX25519EcdhEsKek(recipient, receiverSecret, alg);
        if (kek === null)
            return null;
        // Content Encryption Key
        const unwrapper = xc20pKeyUnwrapper(kek);
        const recipientIV = recipient?.header?.iv ? base64ToBytes(recipient.header.iv) : new Uint8Array(0);
        const recipientTag = recipient?.header?.tag ? base64ToBytes(recipient.header.tag) : new Uint8Array(0);
        const cek = await unwrapper.unwrap(base64ToBytes(recipient.encrypted_key), recipientIV, recipientTag);
        if (cek === null)
            return null;
        return a256cbcHs512DirDecrypter(cek).decrypt(sealed, iv, aad);
    }
    return { alg, enc, decrypt };
}
export function a256cbcHs512AuthEncrypterX25519WithXC20PKW(recipientPublicKey, senderSecret, options = {}) {
    return createFullEncrypter(recipientPublicKey, senderSecret, options, { createKek: createX25519Ecdh1PUv3Kek, alg: 'ECDH-1PU' }, xc20pKeyWrapper, { from: (cek) => a256cbcHs512DirEncrypter(cek), enc: 'A256CBC-HS512' });
}
export function a256cbcHs512AuthDecrypterX25519WithXC20PKW(recipientSecret, senderPublicKey) {
    const alg = 'ECDH-1PU+XC20PKW';
    const enc = 'A256CBC-HS512';
    async function decrypt(sealed, iv, aad, recipient) {
        recipient = recipient;
        const kek = await computeX25519Ecdh1PUv3Kek(recipient, recipientSecret, senderPublicKey, alg);
        if (kek === null)
            return null;
        // Content Encryption Key
        const unwrapper = xc20pKeyUnwrapper(kek);
        const recipientIV = recipient?.header?.iv ? base64ToBytes(recipient.header.iv) : new Uint8Array(0);
        const recipientTag = recipient?.header?.tag ? base64ToBytes(recipient.header.tag) : new Uint8Array(0);
        const cek = await unwrapper.unwrap(base64ToBytes(recipient.encrypted_key), recipientIV, recipientTag);
        if (cek === null)
            return null;
        return a256cbcHs512DirDecrypter(cek).decrypt(sealed, iv, aad);
    }
    return { alg, enc, decrypt };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// A256GCM
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function a256gcmAnonEncrypterX25519WithXC20PKW(recipientPublicKey, kid, apv) {
    return createFullEncrypter(recipientPublicKey, undefined, { apv, kid }, { createKek: createX25519EcdhEsKek, alg: 'ECDH-ES' }, xc20pKeyWrapper, { from: (cek) => a256gcmDirEncrypter(cek), enc: 'XC20P' });
}
export function a256gcmAnonDecrypterX25519WithXC20PKW(receiverSecret) {
    const alg = 'ECDH-ES+XC20PKW';
    const enc = 'A256GCM';
    async function decrypt(sealed, iv, aad, recipient) {
        recipient = recipient;
        const kek = await computeX25519EcdhEsKek(recipient, receiverSecret, alg);
        if (kek === null)
            return null;
        // Content Encryption Key
        const unwrapper = xc20pKeyUnwrapper(kek);
        const recipientIV = recipient?.header?.iv ? base64ToBytes(recipient.header.iv) : new Uint8Array(0);
        const recipientTag = recipient?.header?.tag ? base64ToBytes(recipient.header.tag) : new Uint8Array(0);
        const cek = await unwrapper.unwrap(base64ToBytes(recipient.encrypted_key), recipientIV, recipientTag);
        if (cek === null)
            return null;
        return a256gcmDirDecrypter(cek).decrypt(sealed, iv, aad);
    }
    return { alg, enc, decrypt };
}
export function a256gcmAuthEncrypterEcdh1PuV3x25519WithXC20PKW(recipientPublicKey, senderSecret, options = {}) {
    return createFullEncrypter(recipientPublicKey, senderSecret, options, { createKek: createX25519Ecdh1PUv3Kek, alg: 'ECDH-1PU' }, xc20pKeyWrapper, { from: (cek) => a256gcmDirEncrypter(cek), enc: 'A256GCM' });
}
export function a256gcmAuthDecrypterEcdh1PuV3x25519WithXC20PKW(recipientSecret, senderPublicKey) {
    const alg = 'ECDH-1PU+XC20PKW';
    const enc = 'A256GCM';
    async function decrypt(sealed, iv, aad, recipient) {
        recipient = recipient;
        const kek = await computeX25519Ecdh1PUv3Kek(recipient, recipientSecret, senderPublicKey, alg);
        if (!kek)
            return null;
        // Content Encryption Key
        const unwrapper = xc20pKeyUnwrapper(kek);
        const recipientIV = recipient?.header?.iv ? base64ToBytes(recipient.header.iv) : new Uint8Array(0);
        const recipientTag = recipient?.header?.tag ? base64ToBytes(recipient.header.tag) : new Uint8Array(0);
        const cek = await unwrapper.unwrap(base64ToBytes(recipient.encrypted_key), recipientIV, recipientTag);
        if (cek === null)
            return null;
        return a256gcmDirDecrypter(cek).decrypt(sealed, iv, aad);
    }
    return { alg, enc, decrypt };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// XC20P
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function xc20pAnonEncrypterX25519WithXC20PKW(recipientPublicKey, kid, apv) {
    return createFullEncrypter(recipientPublicKey, undefined, { apv, kid }, { createKek: createX25519EcdhEsKek, alg: 'ECDH-ES' }, xc20pKeyWrapper, { from: (cek) => xc20pDirEncrypter(cek), enc: 'XC20P' });
}
export function xc20pAnonDecrypterX25519WithXC20PKW(receiverSecret) {
    const alg = 'ECDH-ES+XC20PKW';
    const enc = 'XC20P';
    async function decrypt(sealed, iv, aad, recipient) {
        recipient = recipient;
        const kek = await computeX25519EcdhEsKek(recipient, receiverSecret, alg);
        if (kek === null)
            return null;
        // Content Encryption Key
        const unwrapper = xc20pKeyUnwrapper(kek);
        const recipientIV = recipient?.header?.iv ? base64ToBytes(recipient.header.iv) : new Uint8Array(0);
        const recipientTag = recipient?.header?.tag ? base64ToBytes(recipient.header.tag) : new Uint8Array(0);
        const cek = await unwrapper.unwrap(base64ToBytes(recipient.encrypted_key), recipientIV, recipientTag);
        if (cek === null)
            return null;
        return xc20pDecrypter(cek).decrypt(sealed, iv, aad);
    }
    return { alg, enc, decrypt };
}
export function xc20pAuthEncrypterEcdh1PuV3x25519WithXC20PKW(recipientPublicKey, senderSecret, options = {}) {
    return createFullEncrypter(recipientPublicKey, senderSecret, options, { createKek: createX25519Ecdh1PUv3Kek, alg: 'ECDH-1PU' }, xc20pKeyWrapper, { from: (cek) => xc20pDirEncrypter(cek), enc: 'XC20P' });
}
export function xc20pAuthDecrypterEcdh1PuV3x25519WithXC20PKW(recipientSecret, senderPublicKey) {
    const alg = 'ECDH-1PU+XC20PKW';
    const enc = 'XC20P';
    async function decrypt(sealed, iv, aad, recipient) {
        recipient = recipient;
        const kek = await computeX25519Ecdh1PUv3Kek(recipient, recipientSecret, senderPublicKey, alg);
        if (!kek)
            return null;
        // Content Encryption Key
        const unwrapper = xc20pKeyUnwrapper(kek);
        const recipientIV = recipient?.header?.iv ? base64ToBytes(recipient.header.iv) : new Uint8Array(0);
        const recipientTag = recipient?.header?.tag ? base64ToBytes(recipient.header.tag) : new Uint8Array(0);
        const cek = await unwrapper.unwrap(base64ToBytes(recipient.encrypted_key), recipientIV, recipientTag);
        if (cek === null)
            return null;
        return xc20pDecrypter(cek).decrypt(sealed, iv, aad);
    }
    return { alg, enc, decrypt };
}
//# sourceMappingURL=xc20pkw-encrypters.js.map