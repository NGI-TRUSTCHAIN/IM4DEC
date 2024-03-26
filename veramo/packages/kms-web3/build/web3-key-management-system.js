import { toUtf8String } from 'ethers';
import { AbstractKeyManagementSystem } from '@veramo/key-manager';
/**
 * This is a {@link @veramo/key-manager#AbstractKeyManagementSystem | KMS} implementation that uses the addresses of a
 * web3 wallet as key identifiers, and calls the respective wallet for signing operations.
 * @beta
 */
export class Web3KeyManagementSystem extends AbstractKeyManagementSystem {
    providers;
    /**
     *
     * @param providers - the key can be any unique name.
     * Example `{ metamask: metamaskProvider, walletConnect: walletConnectProvider }`
     */
    constructor(providers) {
        super();
        this.providers = providers;
    }
    createKey({ type }) {
        throw Error('not_supported: Web3KeyManagementSystem cannot create new keys');
    }
    async importKey(args) {
        // throw Error('Not implemented')
        return args;
    }
    async listKeys() {
        const keys = [];
        for (const provider in this.providers) {
            const accounts = await this.providers[provider].listAccounts();
            for (const account of accounts) {
                const key = {
                    kid: `${provider}-${account}`,
                    type: 'Secp256k1',
                    publicKeyHex: '',
                    kms: '',
                    meta: {
                        account,
                        provider,
                        algorithms: ['eth_signMessage', 'eth_signTypedData'],
                    },
                };
                keys.push(key);
            }
        }
        return keys;
    }
    async sharedSecret(args) {
        throw Error('not_implemented: Web3KeyManagementSystem sharedSecret');
    }
    async deleteKey(args) {
        // this kms doesn't need to delete keys
        return true;
    }
    // keyRef should be in this format '{providerName-account}
    // example: 'metamask-0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
    async getAccountAndSignerByKeyRef(keyRef) {
        const [providerName, account] = keyRef.kid.split('-');
        if (!this.providers[providerName]) {
            throw Error(`not_available: provider ${providerName}`);
        }
        const signer = await this.providers[providerName].getSigner(account);
        return { account, signer };
    }
    async sign({ keyRef, algorithm, data, }) {
        if (algorithm) {
            if (algorithm === 'eth_signMessage') {
                return await this.eth_signMessage(keyRef, data);
            }
            else if (['eth_signTypedData', 'EthereumEip712Signature2021'].includes(algorithm)) {
                return await this.eth_signTypedData(keyRef, data);
            }
        }
        throw Error(`not_supported: Cannot sign ${algorithm} `);
    }
    /**
     * @returns a `0x` prefixed hex string representing the signed EIP712 data
     */
    async eth_signTypedData(keyRef, data) {
        let msg, msgDomain, msgTypes, msgPrimaryType;
        const serializedData = toUtf8String(data);
        try {
            const jsonData = JSON.parse(serializedData);
            if (typeof jsonData.domain === 'object' && typeof jsonData.types === 'object') {
                const { domain, types, message, primaryType } = jsonData;
                msg = message;
                msgDomain = domain;
                msgTypes = types;
                msgPrimaryType = primaryType;
            }
            else {
                // next check will throw since the data couldn't be parsed
            }
        }
        catch (e) {
            // next check will throw since the data couldn't be parsed
        }
        if (typeof msgDomain !== 'object' || typeof msgTypes !== 'object' || typeof msg !== 'object') {
            throw Error(`invalid_arguments: Cannot sign typed data. 'domain', 'types', and 'message' must be provided`);
        }
        delete msgTypes.EIP712Domain;
        const { signer } = await this.getAccountAndSignerByKeyRef(keyRef);
        const signature = await signer.signTypedData(msgDomain, msgTypes, msg);
        return signature;
    }
    /**
     * @returns a `0x` prefixed hex string representing the signed message
     */
    async eth_signMessage(keyRef, rawMessageBytes) {
        const { signer } = await this.getAccountAndSignerByKeyRef(keyRef);
        const signature = await signer.signMessage(rawMessageBytes);
        // HEX encoded string, 0x prefixed
        return signature;
    }
}
//# sourceMappingURL=web3-key-management-system.js.map