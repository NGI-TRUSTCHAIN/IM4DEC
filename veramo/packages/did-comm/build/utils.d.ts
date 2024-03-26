import { IAgentContext, IDIDManager, IIdentifier, IKeyManager, IResolver } from '@veramo/core-types';
import { ECDH, JWE } from 'did-jwt';
export declare function createEcdhWrapper(secretKeyRef: string, context: IAgentContext<IKeyManager>): ECDH;
export declare function extractSenderEncryptionKey(jwe: JWE, context: IAgentContext<IResolver>): Promise<Uint8Array | null>;
export declare function extractManagedRecipients(jwe: JWE, context: IAgentContext<IDIDManager>): Promise<{
    recipient: any;
    kid: string;
    identifier: IIdentifier;
}[]>;
export declare function mapRecipientsToLocalKeys(managedKeys: {
    recipient: any;
    kid: string;
    identifier: IIdentifier;
}[], context: IAgentContext<IResolver>): Promise<{
    localKeyRef: string;
    recipient: any;
}[]>;
/**
 * Generate private-public x25519 key pair
 */
export declare function generateX25519KeyPair(): {
    secretKey: Uint8Array;
    publicKey: Uint8Array;
};
/**
 * Generate private-public x25519 key pair from a 32 byte secret.
 */
export declare function generateX25519KeyPairFromSeed(seed: Uint8Array): {
    secretKey: Uint8Array;
    publicKey: Uint8Array;
};
//# sourceMappingURL=utils.d.ts.map