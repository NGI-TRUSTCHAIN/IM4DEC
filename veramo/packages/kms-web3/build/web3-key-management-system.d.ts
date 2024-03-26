import { BrowserProvider } from 'ethers';
import { TKeyType, IKey, ManagedKeyInfo, MinimalImportableKey } from '@veramo/core-types';
import { AbstractKeyManagementSystem } from '@veramo/key-manager';
/**
 * This is a {@link @veramo/key-manager#AbstractKeyManagementSystem | KMS} implementation that uses the addresses of a
 * web3 wallet as key identifiers, and calls the respective wallet for signing operations.
 * @beta
 */
export declare class Web3KeyManagementSystem extends AbstractKeyManagementSystem {
    private providers;
    /**
     *
     * @param providers - the key can be any unique name.
     * Example `{ metamask: metamaskProvider, walletConnect: walletConnectProvider }`
     */
    constructor(providers: Record<string, BrowserProvider>);
    createKey({ type }: {
        type: TKeyType;
    }): Promise<ManagedKeyInfo>;
    importKey(args: Omit<MinimalImportableKey, 'kms'>): Promise<ManagedKeyInfo>;
    listKeys(): Promise<ManagedKeyInfo[]>;
    sharedSecret(args: {
        myKeyRef: Pick<IKey, 'kid'>;
        theirKey: Pick<IKey, 'type' | 'publicKeyHex'>;
    }): Promise<string>;
    deleteKey(args: {
        kid: string;
    }): Promise<boolean>;
    private getAccountAndSignerByKeyRef;
    sign({ keyRef, algorithm, data, }: {
        keyRef: Pick<IKey, 'kid'>;
        algorithm?: string;
        data: Uint8Array;
    }): Promise<string>;
    /**
     * @returns a `0x` prefixed hex string representing the signed EIP712 data
     */
    private eth_signTypedData;
    /**
     * @returns a `0x` prefixed hex string representing the signed message
     */
    private eth_signMessage;
}
//# sourceMappingURL=web3-key-management-system.d.ts.map