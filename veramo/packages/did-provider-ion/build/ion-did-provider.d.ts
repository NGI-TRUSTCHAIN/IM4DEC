import { IAgentContext, IIdentifier, IKey, IKeyManager, IService } from '@veramo/core-types';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { IAddKeyOpts, IContext, ICreateIdentifierOpts, IUpdateOpts } from './types/ion-provider-types.js';
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:ion` identifiers
 * @public
 */
export declare class IonDIDProvider extends AbstractIdentifierProvider {
    private readonly defaultKms;
    private readonly ionPoW;
    constructor(options: {
        defaultKms: string;
        challengeEnabled?: boolean;
        challengeEndpoint?: string;
        solutionEndpoint?: string;
    });
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerCreate} */
    createIdentifier({ kms, options, alias }: {
        kms?: string;
        alias?: string;
        options?: ICreateIdentifierOpts;
    }, context: IAgentContext<IKeyManager>): Promise<Omit<IIdentifier, 'provider'>>;
    updateIdentifier(args: {
        did: string;
        kms?: string | undefined;
        alias?: string | undefined;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<IIdentifier>;
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerDelete} */
    deleteIdentifier(identifier: IIdentifier, context: IContext): Promise<boolean>;
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerAddKey} */
    addKey({ identifier, key, options }: {
        identifier: IIdentifier;
        key: IKey;
        options?: IAddKeyOpts;
    }, context: IContext): Promise<any>;
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerAddService} */
    addService({ identifier, service, options }: {
        identifier: IIdentifier;
        service: IService;
        options?: IUpdateOpts;
    }, context: IContext): Promise<any>;
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerRemoveKey} */
    removeKey({ identifier, kid, options }: {
        identifier: IIdentifier;
        kid: string;
        options?: IUpdateOpts;
    }, context: IContext): Promise<any>;
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerRemoveService} */
    removeService({ identifier, id, options }: {
        identifier: IIdentifier;
        id: string;
        options?: IUpdateOpts;
    }, context: IContext): Promise<any>;
    /**
     * Gets as DID document from the identifier in either short or long form
     *
     * @param identifier - The Identifier (DID) to use
     * @param didForm - Use short or long form (the default) for resolution
     * @returns - A DID Document promise
     */
    private getAssertedDidDocument;
    /**
     * Rotate an update or recovery key. Meaning a new key will be generated, which will be used from that moment on for recoveries or updates.
     * It returns an object which is used internally to get access to current en next update/recovery keys, which are transformed in different types (Veramo, JWK, ION Public Key)
     *
     * @param identifier - The identifier (DID) for which to update the recovery/update key
     * @param commitment - The current commitment value for either the update or recovery key from the DID document
     * @param relation - Whether it is an update key or a recovery key
     * @param kms - The KMS to use
     * @param options - Allows to set a kid for the new key or to import a key for the new update/recovery key
     * @param actionTimestamp - The action Timestamp. These are used to order keys in chronological order. Normally you will want to use Date.now() for these
     * @param context - The Veramo Agent context
     */
    private rotateUpdateOrRecoveryKey;
    /**
     * Rotates an actual update/recovery key in Veramo
     *
     * @param kms - The KMS to use
     * @param context - The Veramo agent context
     * @param options - options Allows to set a kid for the new key or to import a key for the new update/recovery key
     * @param identifier - The identifier (DID) for which to update the recovery/update key
     */
    private rotateVeramoKey;
    /**
     * We optionally generate and then import our own keys.
     *
     * Reason for this is that we want to be able to assign Key IDs (kid), which Veramo supports on import, but not creation. The net result is that we do not support keys which have been created from keyManagerCreate
     *
     * @param kms - The KMS to use
     * @param actionTimestamp - The action Timestamp. These are used to order keys in chronological order. Normally you will want to use Date.now() for these
     * @param relation - Whether it is a DID Verification Method key, an update key or a recovery key
     * @param options - Allows to set a kid for the new key or to import a key for the new update/recovery key
     * @param context - The Veramo agent context
     */
    private importProvidedOrGeneratedKey;
    /**
     * Whether to actually anchor the request on the ION network
     *
     * @param request - The ION request
     * @param anchor - Whether to anchor or not (defaults to true)
     * @returns - The anchor request
     */
    private anchorRequest;
    /**
     * Deletes a key (typically a rotation key) on error. As this happens in an exception flow, any issues with deletion are only debug logged.
     *
     * @param kid - the internal ID of the key being deleted
     * @param context - the Veramo instance calling this method
     */
    private deleteKeyOnError;
}
//# sourceMappingURL=ion-did-provider.d.ts.map