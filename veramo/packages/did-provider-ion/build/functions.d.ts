import { IonKeyMetadata, ISecp256k1PrivateKeyJwk, ISecp256k1PublicKeyJwk, KeyIdentifierRelation, KeyType } from './types/ion-provider-types.js';
import { IonDocumentModel, IonPublicKeyModel, IonPublicKeyPurpose, JwkEs256k } from '@decentralized-identity/ion-sdk';
import { IKey, ManagedKeyInfo } from '@veramo/core-types';
/**
 * Ensures we only return Jwk properties that ION can handle
 *
 * @param jwk The input JWK
 * @return The sanitized JWK
 */
export declare const toJwkEs256k: (jwk: any) => JwkEs256k;
/**
 * Create a JWK from a hex private Key
 * @param privateKeyHex The private key in hex form
 * @return The JWK
 */
export declare const toIonPrivateKeyJwk: (privateKeyHex: string) => JwkEs256k;
/**
 * Create a JWK from a hex public Key
 * @param privateKeyHex The public key in hex form
 * @return The JWK
 */
export declare const toIonPublicKeyJwk: (publicKeyHex: string) => JwkEs256k;
/**
 * Example
 * ```js
 * {
 *  kty: 'EC',
 *  crv: 'secp256k1',
 *  d: 'rhYFsBPF9q3-uZThy7B3c4LDF_8wnozFUAEm5LLC4Zw',
 *  x: 'dWCvM4fTdeM0KmloF57zxtBPXTOythHPMm1HCLrdd3A',
 *  y: '36uMVGM7hnw-N6GnjFcihWE3SkrhMLzzLCdPMXPEXlA',
 *  kid: 'JUvpllMEYUZ2joO59UNui_XYDqxVqiFLLAJ8klWuPBw'
 * }
 * ```
 * See [rfc7638](https://tools.ietf.org/html/rfc7638) for more details on Jwk.
 */
export declare const getKid: (jwk: ISecp256k1PrivateKeyJwk | ISecp256k1PublicKeyJwk) => string;
/**
 * Computes the ION Commitment value from a ION public key
 *
 * @param ionKey The ion public key
 * @return The ION commitment value
 */
export declare const computeCommitmentFromIonPublicKey: (ionKey: IonPublicKeyModel) => string;
/**
 * Computes the ION Commitment from a JWK
 *
 * @param jwk The JWK to computate the commitment for
 */
export declare const computeCommitmentFromJwk: (jwk: JwkEs256k) => string;
/**
 * Get the action timestamp if present. Use current date/timestamp otherwise
 * @param timestamp An optional provided timestamp, useful only in case a key needs to be inserted in between other keys
 * @return The action timestamp
 */
export declare const getActionTimestamp: (timestamp?: number) => number;
/**
 * Gets a specific recovery key matching the commitment value, typically coming from a DID document, or the latest
 * recovery key in case it is not provided
 *
 * @param keys The actual keys related to an identifier
 * @param commitment An optional commitment value to match the recovery key against. Typically comes from a DID
 *   Document
 * @return The ION Recovery Public Key
 */
export declare const getVeramoRecoveryKey: (keys: IKey[], commitment?: string) => IKey;
/**
 * Gets a specific update key matching the commitment value, typically coming from a DID document, or the latest update
 * key in case it is not provided
 *
 * @param keys The actual keys related to an identifier
 * @param commitment An optional commitment value to match the update key against. Typically comes from a DID Document
 * @return The Veramo Update Key
 */
export declare const getVeramoUpdateKey: (keys: IKey[], commitment?: string) => IKey;
/**
 * Get the Ion Public keys from Veramo which have a specific relation type. If the commitment value is set the Key
 * belonging to that value will be returned, otherwise the latest key
 * @param keys The Veramo Keys to inspect
 * @param relation The Key relation ship type
 * @param commitment An optional commitment value, typically coming from a DID Document. The value 'genisis' returns
 *   the first key found
 */
export declare const ionKeysOfType: (keys: IKey[], relation: KeyIdentifierRelation, commitment?: string) => IonPublicKeyModel[];
/**
 * Get the Veramo keys which have a specific relation type. If the commitment value is set the Key belonging to that
 * value will be returned, otherwise the latest key
 * @param keys The Veramo Keys to inspect
 * @param relation The Key relation ship type
 * @param commitment An optional commitment value, typically coming from a DID Document. The value 'genisis' returns
 *   the first key found
 */
export declare const veramoKeysOfType: (keys: IKey[], relation: KeyIdentifierRelation, commitment?: string) => IKey[];
/**
 * Ion/Sidetree only supports kid with a maximum length of 50 characters. This method truncates longer keys when create
 * ION requests
 *
 * @param kid The Veramo kid
 * @return A truncated kid if the input kid contained more than 50 characters
 */
export declare const truncateKidIfNeeded: (kid: string) => string;
/**
 * Creates an Ion Public Key (Verification Method), used in ION request from a Veramo Key
 * @param key The Veramo Key
 * @param createKeyPurposes The verification relationships (Sidetree calls them purposes) to explicitly set. Used
 *   during key creation
 * @return An Ion Public Key which can be used in Ion request objects
 */
export declare const toIonPublicKey: (key: ManagedKeyInfo, createKeyPurposes?: IonPublicKeyPurpose[]) => IonPublicKeyModel;
/**
 * Generates a random Private Hex Key for the specified key type
 * @param type The key type
 * @return The private key in Hex form
 */
export declare const generatePrivateKeyHex: (type: KeyType) => string;
/**
 * Create a Veramo Key entirely in Memory. It is not stored
 *
 * Didn't want to recreate the logic to extract the pub key for the different key types
 * So let's create a temp in-mem kms to do it for us
 *
 * @param type
 * @param privateKeyHex
 * @param kid
 * @param kms
 * @param ionMeta
 */
export declare const tempMemoryKey: (type: KeyType.Ed25519 | KeyType.Secp256k1 | KeyType, privateKeyHex: string, kid: string, kms: string, ionMeta: IonKeyMetadata) => Promise<IKey>;
/**
 * Generate a deterministic Ion Long form DID from the creation keys
 *
 * @param input The creation keys
 * @return The Ion Long form DID
 */
export declare const ionLongFormDidFromCreation: (input: {
    recoveryKey: JwkEs256k;
    updateKey: JwkEs256k;
    document: IonDocumentModel;
}) => Promise<string>;
/**
 * Generate a deterministic Ion Short form DID from the creation keys
 *
 * @param input The creation keys
 * @return The Ion Short form DID
 */
export declare const ionShortFormDidFromCreation: (input: {
    recoveryKey: JwkEs256k;
    updateKey: JwkEs256k;
    document: IonDocumentModel;
}) => Promise<string>;
/**
 * Convert an Ion Long form DID into a short form DID. Be aware that the input really needs to be a long Form DID!
 * @param longFormDid The Ion Long form DID
 * @return An Ion Short form DID
 */
export declare const ionShortFormDidFromLong: (longFormDid: string) => string;
/**
 * Gets the method specific Short form Id from the Long form DID. So the did: prefix and Ion Long Form suffix have been
 * removed
 * @param longFormDid The Ion Long form DID
 * @return The Short form method specific Id
 */
export declare const ionDidSuffixFromLong: (longFormDid: string) => string;
/**
 * Gets the method specific Short form Id from the Short form DID. So the did: prefix has been removed
 * @param shortFormDid The Ion Short form DID
 * @return The Short form method specific Id
 */
export declare const ionDidSuffixFromShort: (shortFormDid: string) => string;
//# sourceMappingURL=functions.d.ts.map