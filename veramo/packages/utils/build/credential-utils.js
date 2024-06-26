import { asArray, isDefined } from './type-utils.js';
import { decodeJWT } from 'did-jwt';
import { normalizeCredential, normalizePresentation } from 'did-jwt-vc';
import { code, encode, prepare } from '@ipld/dag-pb';
import * as Digest from 'multiformats/hashes/digest';
import { CID } from 'multiformats/cid';
import { UnixFS } from 'ipfs-unixfs';
import { sha256 } from '@noble/hashes/sha256';
/**
 * Every Verifiable Credential `@context` property must contain this.
 *
 * @public
 */
export const MANDATORY_CREDENTIAL_CONTEXT = 'https://www.w3.org/2018/credentials/v1';
/**
 * Processes an entry or an array of entries into an array of entries. If a `startWithEntry` param is provided, it is
 * set as the first item in the result array.
 * @param inputEntryOrArray - The input that needs to be transformed to an array.
 * @param startWithEntry - If this is provided, this element will be the first in the resulting array.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export function processEntryToArray(inputEntryOrArray, startWithEntry) {
    const result = asArray(inputEntryOrArray) || [startWithEntry];
    if (startWithEntry && result[0] !== startWithEntry) {
        result.unshift(startWithEntry);
    }
    return result.filter(isDefined).filter((item, index, arr) => arr.indexOf(item) === index);
}
/**
 * Parses a {@link @veramo/core-types#W3CVerifiableCredential | W3CVerifiableCredential} and converts it to a
 * {@link @veramo/core-types#VerifiableCredential | VerifiableCredential} so it is easier to use programmatically.
 *
 * @param input - the raw credential to be transformed
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export function decodeCredentialToObject(input) {
    return typeof input === 'string' ? normalizeCredential(input) : input;
}
/**
 * Parses a {@link @veramo/core-types#W3CVerifiablePresentation | W3CVerifiablePresentation} and converts it to a
 * {@link @veramo/core-types#VerifiablePresentation | VerifiablePresentation} so it is easier to use programmatically.
 *
 * @param input - the raw presentation to be transformed.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export function decodePresentationToObject(input) {
    let result;
    if (typeof input === 'string') {
        result = normalizePresentation(input);
    }
    else {
        result = input;
        result.verifiableCredential = asArray(result.verifiableCredential).map(decodeCredentialToObject);
    }
    return result;
}
/**
 * Computes a hash for a given credential or presentation.
 * This hash is usable as an internal ID for database indexing
 *
 * @param input - the Credential or Presentation whose hash is neeeded
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export function computeEntryHash(input) {
    let hashable;
    if (typeof input === 'string') {
        try {
            const cred = JSON.parse(input);
            hashable = cred?.proof?.jwt || input;
        }
        catch (e) {
            hashable = input;
        }
    }
    else if (input?.proof?.jwt) {
        hashable = input.proof.jwt;
    }
    else {
        hashable = JSON.stringify(input);
    }
    const unixfs = new UnixFS({
        type: 'file',
        data: new TextEncoder().encode(hashable)
    });
    const bytes = encode(prepare({ Data: unixfs.marshal() }));
    const digest = Digest.create(18, sha256(bytes));
    return CID.create(0, code, digest).toString();
}
/**
 * Decodes a credential or presentation and returns the issuer ID
 * `iss` from a JWT or `issuer`/`issuer.id` from a VC or `holder` from a VP
 *
 * @param input - the credential or presentation whose issuer/holder needs to be extracted.
 * @param options - options for the extraction
 *   removeParameters - Remove all DID parameters from the issuer ID
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export function extractIssuer(input, options = {}) {
    if (!isDefined(input)) {
        return '';
    }
    else if (typeof input === 'string') {
        // JWT
        try {
            const { payload } = decodeJWT(input);
            const iss = payload.iss || '';
            return !!options.removeParameters ? removeDIDParameters(iss) : iss;
        }
        catch (e) {
            return '';
        }
    }
    else {
        // JSON
        let iss;
        if (input.issuer) {
            iss = input.issuer;
        }
        else if (input.holder) {
            iss = input.holder;
        }
        else {
            iss = '';
        }
        if (typeof iss !== 'string')
            iss = iss.id || '';
        return !!options.removeParameters ? removeDIDParameters(iss) : iss;
    }
}
/**
 * Remove all DID parameters from a DID url
 *
 * @param did - the DID URL
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export function removeDIDParameters(did) {
    return did.replace(/\?.+$/, '');
}
//# sourceMappingURL=credential-utils.js.map