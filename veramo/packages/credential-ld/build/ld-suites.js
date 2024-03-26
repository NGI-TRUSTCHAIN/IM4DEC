/**
 * Base class for Veramo adapters of LinkedDataSignature suites.
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export class VeramoLdSignature {
    preSigningPresModification(presentation) {
        // TODO: Remove invalid field 'verifiers' from Presentation. Needs to be adapted for LD credentials
        // Only remove empty array (vc.signPresentation will throw then)
        const sanitizedPresentation = presentation;
        if (sanitizedPresentation?.verifier?.length == 0) {
            delete sanitizedPresentation.verifier;
        }
    }
}
//# sourceMappingURL=ld-suites.js.map