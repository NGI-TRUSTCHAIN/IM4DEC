import { VeramoLdSignature } from './ld-suites.js';
import { TKeyType } from '@veramo/core-types';
/**
 * Initializes a list of Veramo-wrapped LD Signature suites and exposes those to the Agent Module
 */
export declare class LdSuiteLoader {
    constructor(options: {
        veramoLdSignatures: VeramoLdSignature[];
    });
    private signatureMap;
    getSignatureSuiteForKeyType(type: TKeyType, verificationType: string): VeramoLdSignature;
    getAllSignatureSuites(): VeramoLdSignature[];
    getAllSignatureSuiteTypes(): string[];
}
//# sourceMappingURL=ld-suite-loader.d.ts.map