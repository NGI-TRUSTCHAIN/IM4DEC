import { JwkDidSupportedKeyTypes, KeyUse } from './types/jwk-provider-types.js';
import type { VerificationMethod, JsonWebKey } from 'did-resolver';
export declare function getKeyUse(keyType: JwkDidSupportedKeyTypes, passedKeyUse?: KeyUse): KeyUse;
export declare function isJWK(data: unknown): data is JsonWebKey;
export declare function generateJwkFromVerificationMethod(keyType: JwkDidSupportedKeyTypes, key: VerificationMethod, keyUse?: KeyUse): JsonWebKey | undefined;
//# sourceMappingURL=jwkDidUtils.d.ts.map