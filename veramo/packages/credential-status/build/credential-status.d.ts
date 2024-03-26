import { IAgentPlugin, ICredentialStatusVerifier } from '@veramo/core-types';
import { StatusMethod } from 'credential-status';
/**
 * This plugin implements the {@link @veramo/core-types#ICredentialStatusVerifier | ICredentialStatusVerifier}
 * interface.
 *
 * This aggregates some {@link credential-status#StatusMethod | credential status implementations} to provide a second
 * layer of validation when verifying Verifiable Credentials.
 *
 * This is used for the discovery of information about the current status of a verifiable credential, such as whether
 * it is suspended or revoked. The precise contents of the credential status information is determined by the specific
 * `credentialStatus` type definition.
 *
 * The results provided by this plugin depend on whether the {@link credential-status#StatusMethod | StatusMethod}
 * required by the credential is installed.
 *
 * @see {@link credential-status#Status}
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class CredentialStatusPlugin implements IAgentPlugin {
    private readonly status;
    readonly methods: ICredentialStatusVerifier;
    constructor(registry?: Record<string, StatusMethod>);
    private checkCredentialStatus;
}
//# sourceMappingURL=credential-status.d.ts.map