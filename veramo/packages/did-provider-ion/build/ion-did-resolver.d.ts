import { IIdentifier } from '@veramo/core-types';
import { DIDResolutionOptions, DIDResolutionResult, DIDResolver } from 'did-resolver';
import { IonDidForm } from './types/ion-provider-types.js';
export declare const resolveDidIonFromIdentifier: (identifier: IIdentifier, ionDidForm?: IonDidForm, options?: DIDResolutionOptions) => Promise<DIDResolutionResult>;
export declare const resolveDidIon: DIDResolver;
/**
 * @public
 */
export declare function getDidIonResolver(): {
    ion: DIDResolver;
};
//# sourceMappingURL=ion-did-resolver.d.ts.map