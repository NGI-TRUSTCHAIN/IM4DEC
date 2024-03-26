import { fetch } from 'cross-fetch';
import { IonDidForm } from './types/ion-provider-types.js';
export const resolveDidIonFromIdentifier = async (identifier, ionDidForm = IonDidForm.LONG, options) => {
    return await resolve(ionDidForm == IonDidForm.LONG ? identifier.did : identifier.alias, options);
};
export const resolveDidIon = async (didUrl, options) => {
    return resolve(didUrl, options);
};
const resolve = async (didUrl, options) => {
    return fetch((options?.nodeEndpoint || 'https://beta.discover.did.microsoft.com/1.0/identifiers/') + didUrl).then(async (response) => {
        if (response.status >= 400) {
            throw new Error(`Not Found:\r\n${didUrl}\r\n${JSON.stringify(await response.json())}`);
        }
        return response.json();
    });
};
/**
 * @public
 */
export function getDidIonResolver() {
    return { ion: resolveDidIon };
}
//# sourceMappingURL=ion-did-resolver.js.map