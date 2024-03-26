import { Router } from 'express';
/**
 * This provides a simple authorization mechanism based on a single pre-shared API key.
 *
 * @param apiKey - the pre-shared API key
 *
 * @public
 */
export declare function apiKeyAuth({ apiKey }: {
    apiKey: string;
}): Router;
//# sourceMappingURL=api-key-auth.d.ts.map