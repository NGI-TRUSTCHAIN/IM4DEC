import schema from './plugin.schema.json' assert { type: 'json' };
import Debug from 'debug';
import { LdContextLoader } from './ld-context-loader.js';
import { extractIssuer, intersect, isDefined, MANDATORY_CREDENTIAL_CONTEXT, mapIdentifierKeysToDoc, processEntryToArray, removeDIDParameters, } from '@veramo/utils';
import { LdCredentialModule } from './ld-credential-module.js';
import { LdSuiteLoader } from './ld-suite-loader.js';
const debug = Debug('veramo:credential-ld:action-handler');
/**
 * A Veramo plugin that implements the {@link ICredentialIssuerLD} methods.
 *
 * @public
 */
export class CredentialIssuerLD {
    methods;
    schema = schema.ICredentialIssuerLD;
    ldCredentialModule;
    constructor(options) {
        this.ldCredentialModule = new LdCredentialModule({
            ldContextLoader: new LdContextLoader({ contextsPaths: options.contextMaps }),
            ldSuiteLoader: new LdSuiteLoader({ veramoLdSignatures: options.suites }),
        });
        this.methods = {
            createVerifiablePresentationLD: this.createVerifiablePresentationLD.bind(this),
            createVerifiableCredentialLD: this.createVerifiableCredentialLD.bind(this),
            verifyCredentialLD: this.verifyCredentialLD.bind(this),
            verifyPresentationLD: this.verifyPresentationLD.bind(this),
            matchKeyForLDSuite: this.matchKeyForLDSuite.bind(this),
        };
    }
    /** {@inheritdoc ICredentialIssuerLD.createVerifiablePresentationLD} */
    async createVerifiablePresentationLD(args, context) {
        const presentationContext = processEntryToArray(args?.presentation?.['@context'], MANDATORY_CREDENTIAL_CONTEXT);
        const presentationType = processEntryToArray(args?.presentation?.type, 'VerifiablePresentation');
        const presentation = {
            ...args?.presentation,
            '@context': presentationContext,
            type: presentationType,
        };
        if (!isDefined(presentation.holder)) {
            throw new Error('invalid_argument: args.presentation.holder must not be empty');
        }
        if (args.presentation.verifiableCredential) {
            const credentials = args.presentation.verifiableCredential.map((cred) => {
                if (typeof cred !== 'string' && cred.proof.jwt) {
                    return cred.proof.jwt;
                }
                else {
                    return cred;
                }
            });
            presentation.verifiableCredential = credentials;
        }
        //issuanceDate must not be present for presentations because it is not defined in a @context
        delete presentation.issuanceDate;
        const holder = removeDIDParameters(presentation.holder);
        let identifier;
        try {
            identifier = await context.agent.didManagerGet({ did: holder });
        }
        catch (e) {
            throw new Error('invalid_argument: args.presentation.holder must be a DID managed by this agent');
        }
        try {
            const { signingKey, verificationMethodId } = await this.findSigningKeyWithId(context, identifier, args.keyRef);
            let { now } = args;
            if (typeof now === 'number') {
                now = new Date(now * 1000);
            }
            return await this.ldCredentialModule.signLDVerifiablePresentation(presentation, identifier.did, signingKey, verificationMethodId, args.challenge || '', args.domain || '', { ...args, now }, context);
        }
        catch (error) {
            debug(error);
            return Promise.reject(error);
        }
    }
    /** {@inheritdoc ICredentialIssuerLD.createVerifiableCredentialLD} */
    async createVerifiableCredentialLD(args, context) {
        const credentialContext = processEntryToArray(args?.credential?.['@context'], MANDATORY_CREDENTIAL_CONTEXT);
        const credentialType = processEntryToArray(args?.credential?.type, 'VerifiableCredential');
        const credential = {
            ...args?.credential,
            '@context': credentialContext,
            type: credentialType,
        };
        const issuer = extractIssuer(credential, { removeParameters: true });
        if (!issuer || typeof issuer === 'undefined') {
            throw new Error('invalid_argument: args.credential.issuer must not be empty');
        }
        let identifier;
        try {
            identifier = await context.agent.didManagerGet({ did: issuer });
        }
        catch (e) {
            throw new Error(`invalid_argument: args.credential.issuer must be a DID managed by this agent. ${e}`);
        }
        try {
            const { signingKey, verificationMethodId } = await this.findSigningKeyWithId(context, identifier, args.keyRef);
            let { now } = args;
            if (typeof now === 'number') {
                now = new Date(now * 1000);
            }
            return await this.ldCredentialModule.issueLDVerifiableCredential(credential, identifier.did, signingKey, verificationMethodId, { ...args, now }, context);
        }
        catch (error) {
            debug(error);
            return Promise.reject(error);
        }
    }
    /** {@inheritdoc ICredentialIssuerLD.verifyCredentialLD} */
    async verifyCredentialLD(args, context) {
        const credential = args.credential;
        let { now } = args;
        if (typeof now === 'number') {
            now = new Date(now * 1000);
        }
        return this.ldCredentialModule.verifyCredential(credential, args.fetchRemoteContexts || false, { ...args, now }, context);
    }
    /** {@inheritdoc ICredentialIssuerLD.verifyPresentationLD} */
    async verifyPresentationLD(args, context) {
        const presentation = args.presentation;
        let { now } = args;
        if (typeof now === 'number') {
            now = new Date(now * 1000);
        }
        return this.ldCredentialModule.verifyPresentation(presentation, args.challenge, args.domain, args.fetchRemoteContexts || false, { ...args, now }, context);
    }
    async findSigningKeyWithId(context, identifier, keyRef) {
        const extendedKeys = await mapIdentifierKeysToDoc(identifier, 'assertionMethod', context);
        let supportedTypes = this.ldCredentialModule.ldSuiteLoader.getAllSignatureSuiteTypes();
        let signingKey;
        let verificationMethodId;
        if (keyRef) {
            signingKey = extendedKeys.find((k) => k.kid === keyRef);
        }
        if (signingKey && !supportedTypes.includes(signingKey.meta.verificationMethod.type)) {
            debug('WARNING: requested signing key DOES NOT correspond to a supported Signature suite type. Looking for the next best key.');
            signingKey = undefined;
        }
        if (!signingKey) {
            if (keyRef) {
                debug('WARNING: no signing key was found that matches the reference provided. Searching for the first available signing key.');
            }
            signingKey = extendedKeys.find((k) => supportedTypes.includes(k.meta.verificationMethod.type));
        }
        if (!signingKey)
            throw Error(`key_not_found: No suitable signing key found for ${identifier.did}`);
        verificationMethodId = signingKey.meta.verificationMethod.id;
        return { signingKey, verificationMethodId };
    }
    /**
     * Returns true if the key is supported by any of the installed LD Signature suites
     * @param k - the key to verify
     *
     * @internal
     */
    async matchKeyForLDSuite(k) {
        // prefilter based on key algorithms
        switch (k.type) {
            case 'Ed25519':
                if (!k.meta?.algorithms?.includes('EdDSA'))
                    return false;
                break;
            case 'Secp256k1':
                if (intersect(k.meta?.algorithms ?? [], ['ES256K-R', 'ES256K']).length == 0)
                    return false;
                break;
        }
        // TODO: this should return a list of supported suites, not just a boolean
        const suites = this.ldCredentialModule.ldSuiteLoader.getAllSignatureSuites();
        return suites
            .map((suite) => suite.getSupportedVeramoKeyType().includes(k.type))
            .some((supportsThisKey) => supportsThisKey);
    }
}
//# sourceMappingURL=action-handler.js.map