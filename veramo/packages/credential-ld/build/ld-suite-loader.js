/**
 * Initializes a list of Veramo-wrapped LD Signature suites and exposes those to the Agent Module
 */
export class LdSuiteLoader {
    constructor(options) {
        options.veramoLdSignatures.forEach((obj) => {
            // FIXME: some suites would work for multiple key types, but this only returns a single value per suite.
            //       For example, EcdsaSecp256k1RecoverySignature2020 should work with both EcdsaSecp256k1VerificationKey2019
            //       as well as EcdsaSecp256k1RecoveryMethod2020 since the VerificationKey can also be expressed as the recovery
            //       method.
            const keyType = obj.getSupportedVeramoKeyType();
            const verificationType = obj.getSupportedVerificationType();
            return (this.signatureMap[keyType] = { ...this.signatureMap[keyType], [verificationType]: obj });
        });
    }
    signatureMap = {};
    getSignatureSuiteForKeyType(type, verificationType) {
        const suite = this.signatureMap[type]?.[verificationType];
        if (suite)
            return suite;
        throw new Error('No Veramo LD Signature Suite for ' + type);
    }
    getAllSignatureSuites() {
        return Object.values(this.signatureMap)
            .map((x) => Object.values(x))
            .flat();
    }
    getAllSignatureSuiteTypes() {
        return Object.values(this.signatureMap)
            .map((x) => Object.keys(x))
            .flat();
    }
}
//# sourceMappingURL=ld-suite-loader.js.map