import { AuthEncryptParams, Decrypter, ECDH, Encrypter } from 'did-jwt';
export declare function a256cbcHs512AnonEncrypterX25519WithXC20PKW(recipientPublicKey: Uint8Array, kid?: string, apv?: string): Encrypter;
export declare function a256cbcHs512AnonDecrypterX25519WithXC20PKW(receiverSecret: Uint8Array | ECDH): Decrypter;
export declare function a256cbcHs512AuthEncrypterX25519WithXC20PKW(recipientPublicKey: Uint8Array, senderSecret: Uint8Array | ECDH, options?: Partial<AuthEncryptParams>): Encrypter;
export declare function a256cbcHs512AuthDecrypterX25519WithXC20PKW(recipientSecret: Uint8Array | ECDH, senderPublicKey: Uint8Array): Decrypter;
export declare function a256gcmAnonEncrypterX25519WithXC20PKW(recipientPublicKey: Uint8Array, kid?: string, apv?: string): Encrypter;
export declare function a256gcmAnonDecrypterX25519WithXC20PKW(receiverSecret: Uint8Array | ECDH): Decrypter;
export declare function a256gcmAuthEncrypterEcdh1PuV3x25519WithXC20PKW(recipientPublicKey: Uint8Array, senderSecret: Uint8Array | ECDH, options?: Partial<AuthEncryptParams>): Encrypter;
export declare function a256gcmAuthDecrypterEcdh1PuV3x25519WithXC20PKW(recipientSecret: Uint8Array | ECDH, senderPublicKey: Uint8Array): Decrypter;
export declare function xc20pAnonEncrypterX25519WithXC20PKW(recipientPublicKey: Uint8Array, kid?: string, apv?: string): Encrypter;
export declare function xc20pAnonDecrypterX25519WithXC20PKW(receiverSecret: Uint8Array | ECDH): Decrypter;
export declare function xc20pAuthEncrypterEcdh1PuV3x25519WithXC20PKW(recipientPublicKey: Uint8Array, senderSecret: Uint8Array | ECDH, options?: Partial<AuthEncryptParams>): Encrypter;
export declare function xc20pAuthDecrypterEcdh1PuV3x25519WithXC20PKW(recipientSecret: Uint8Array | ECDH, senderPublicKey: Uint8Array): Decrypter;
//# sourceMappingURL=xc20pkw-encrypters.d.ts.map