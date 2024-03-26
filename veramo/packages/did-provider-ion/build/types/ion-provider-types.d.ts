import { IAgentContext, IKey, IKeyManager, IService, MinimalImportableKey } from '@veramo/core-types';
import { IonPublicKeyPurpose, IonPublicKeyModel, JwkEs256k } from '@decentralized-identity/ion-sdk';
export type IContext = IAgentContext<IKeyManager>;
export interface VerificationMethod extends KeyOpts {
    purposes: IonPublicKeyPurpose[];
}
export interface KeyOpts {
    kid?: string;
    key?: MinimalImportableKey;
    type?: KeyType;
}
export interface ICreateIdentifierOpts {
    verificationMethods?: VerificationMethod[];
    recoveryKey?: KeyOpts;
    updateKey?: KeyOpts;
    services?: IService[];
    actionTimestamp?: number;
    anchor?: boolean;
}
export interface IAddKeyOpts extends IUpdateOpts {
    purposes: IonPublicKeyPurpose[];
}
export interface IUpdateOpts {
    actionTimestamp?: number;
    anchor?: boolean;
}
export interface IonKeyMetadata {
    purposes?: IonPublicKeyPurpose[];
    actionTimestamp: number;
    relation: KeyIdentifierRelation;
    commitment?: string;
}
export declare enum KeyType {
    Ed25519 = "Ed25519",
    Secp256k1 = "Secp256k1"
}
export declare enum KeyIdentifierRelation {
    RECOVERY = "recovery",
    UPDATE = "update",
    DID = "did"
}
export declare enum IonDidForm {
    LONG = "long",
    SHORT = "short"
}
export interface IKeyRotation {
    currentVeramoKey: IKey;
    currentIonKey: IonPublicKeyModel;
    currentJwk: JwkEs256k;
    nextVeramoKey: IKey;
    nextIonKey: IonPublicKeyModel;
    nextJwk: JwkEs256k;
}
/** Secp256k1 Private Key  */
export interface ISecp256k1PrivateKeyJwk {
    /** key type */
    kty: string;
    /** curve */
    crv: string;
    /** private point */
    d: string;
    /** public point */
    x: string;
    /** public point */
    y: string;
    /** key id */
    kid: string;
}
/** Secp256k1 Public Key  */
export interface ISecp256k1PublicKeyJwk {
    /** key type */
    kty: string;
    /** curve */
    crv: string;
    /** public point */
    x: string;
    /** public point */
    y: string;
    /** key id */
    kid: string;
}
export type IRequiredContext = IAgentContext<IKeyManager>;
//# sourceMappingURL=ion-provider-types.d.ts.map