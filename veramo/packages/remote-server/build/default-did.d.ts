import { IDIDManager, TAgent } from '@veramo/core-types';
interface CreateDefaultDidOptions {
    agent: TAgent<IDIDManager>;
    baseUrl: string;
    messagingServiceEndpoint?: string;
}
/**
 * This can be used to automatically create a did:web with signing and encryption keys and listing messaging and
 * DIDComm service endpoints.
 *
 * @param options - The options guiding the creation of the default DID
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare function createDefaultDid(options: CreateDefaultDidOptions): Promise<void>;
export {};
//# sourceMappingURL=default-did.d.ts.map