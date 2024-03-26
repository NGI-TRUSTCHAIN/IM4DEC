import type { AuthEncryptParams, Decrypter, ECDH, Encrypter } from 'did-jwt';
export declare function a256cbcHs512AnonEncrypterX25519WithA256KW(recipientPublicKey: Uint8Array, kid?: string, apv?: string): Encrypter;
export declare function a256cbcHs512AnonDecrypterX25519WithA256KW(receiverSecret: Uint8Array | ECDH): Decrypter;
export declare function a256cbcHs512AuthEncrypterX25519WithA256KW(recipientPublicKey: Uint8Array, senderSecret: Uint8Array | ECDH, options?: Partial<AuthEncryptParams>): Encrypter;
export declare function a256cbcHs512AuthDecrypterX25519WithA256KW(recipientSecret: Uint8Array | ECDH, senderPublicKey: Uint8Array): Decrypter;
export declare function a256gcmAnonEncrypterX25519WithA256KW(recipientPublicKey: Uint8Array, kid?: string, apv?: string): Encrypter;
export declare function a256gcmAnonDecrypterX25519WithA256KW(receiverSecret: Uint8Array | ECDH): Decrypter;
export declare function a256gcmAuthEncrypterEcdh1PuV3x25519WithA256KW(recipientPublicKey: Uint8Array, senderSecret: Uint8Array | ECDH, options?: Partial<AuthEncryptParams>): Encrypter;
export declare function a256gcmAuthDecrypterEcdh1PuV3x25519WithA256KW(recipientSecret: Uint8Array | ECDH, senderPublicKey: Uint8Array): Decrypter;
export declare function xc20pAnonEncrypterX25519WithA256KW(recipientPublicKey: Uint8Array, kid?: string, apv?: string): Encrypter;
export declare function xc20pAnonDecrypterX25519WithA256KW(receiverSecret: Uint8Array | ECDH): Decrypter;
export declare function xc20pAuthEncrypterEcdh1PuV3x25519WithA256KW(recipientPublicKey: Uint8Array, senderSecret: Uint8Array | ECDH, options?: Partial<AuthEncryptParams>): Encrypter;
export declare function xc20pAuthDecrypterEcdh1PuV3x25519WithA256KW(recipientSecret: Uint8Array | ECDH, senderPublicKey: Uint8Array): Decrypter;
//# sourceMappingURL=a256kw-encrypters.d.ts.map