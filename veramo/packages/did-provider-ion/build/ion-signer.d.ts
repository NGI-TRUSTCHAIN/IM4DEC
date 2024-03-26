import { IContext } from './types/ion-provider-types.js';
/**
 * This class is responsible for signing the JWT when sending in Anchor requests to an ION node. It is using the update
 * or recovery key denoted by 'kid'
 */
export declare class IonSigner {
    private context;
    private readonly kid;
    /**
     * Construct the signer object
     *
     * @param context The agent context
     * @param kid The Veramo update or recovery Key ID (kid)
     */
    constructor(context: IContext, kid: string);
    /**
     * Sign the JWT header and payload using the Key ID (kid) provided during construction.
     *
     * @param header The JWT header (only 'alg' supported for now)
     * @param payload The ION update delta payload
     */
    sign(header: any, payload: any): Promise<string>;
}
//# sourceMappingURL=ion-signer.d.ts.map