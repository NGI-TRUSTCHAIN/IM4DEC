import { Router } from 'express';
/**
 * @public
 */
export interface MessagingRouterOptions {
    /**
     * Message metadata
     */
    metaData: {
        type: string;
        value?: string;
    };
    /**
     * Optional. true by default
     */
    save?: boolean;
}
/**
 * Creates a router for handling incoming messages.
 *
 * Messages posted to this router get sent to the `handleMessage` method of the associated agent where this is used.
 *
 * @param options - Initialization option
 * @returns Expressjs router
 *
 * @public
 */
export declare const MessagingRouter: (options: MessagingRouterOptions) => Router;
//# sourceMappingURL=messaging-router.d.ts.map