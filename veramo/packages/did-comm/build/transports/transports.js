import { v4 as uuidv4 } from 'uuid';
/**
 * Abstract implementation of {@link IDIDCommTransport}.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class AbstractDIDCommTransport {
    id;
    /**
     * Shared constructor that takes an optional identifier (for reusing) for
     * this {@link IDIDCommTransport}.
     *
     * @param id - An optional identifier for this {@link IDIDCommTransport}.
     *
     * @beta This API may change without a BREAKING CHANGE notice.
     */
    constructor(id) {
        this.id = id || uuidv4();
    }
}
/**
 * Implementation of {@link IDIDCommTransport} to provide a simple
 * transport based on HTTP(S) requests.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class DIDCommHttpTransport extends AbstractDIDCommTransport {
    /**
     * Defines the default HTTP method to use if not specified
     * in the DID Document service entry of the recipient.
     */
    httpMethod;
    /**
     * Creates a new {@link DIDCommHttpTransport}.
     * @param httpMethod - Default HTTP method if not specified in the service
     * section.
     */
    constructor(httpMethod) {
        super();
        this.httpMethod = httpMethod || 'post';
    }
    /** {@inheritdoc AbstractDIDCommTransport.isServiceSupported} */
    isServiceSupported(service) {
        // serviceEndpoint can be a string, a ServiceEndpoint object, or an array of strings or ServiceEndpoint objects
        return ((typeof service.serviceEndpoint === 'string' && (service.serviceEndpoint.startsWith('http://') || service.serviceEndpoint.startsWith('https://')))
            ||
                (service.serviceEndpoint.uri && typeof service.serviceEndpoint.uri === 'string' && (service.serviceEndpoint.uri.startsWith('http://') || service.serviceEndpoint.uri.startsWith('https://')))
            ||
                (service.serviceEndpoint.length > 0 && typeof service.serviceEndpoint[0] === 'string' && (service.serviceEndpoint[0].startsWith('http://') || service.serviceEndpoint[0].startsWith('https://')))
            ||
                (service.serviceEndpoint.length > 0 && typeof service.serviceEndpoint[0].uri === 'string' && (service.serviceEndpoint[0].uri.startsWith('http://') || service.serviceEndpoint[0].uri.startsWith('https://'))));
    }
    /** {@inheritdoc AbstractDIDCommTransport.send} */
    async send(service, message) {
        let serviceEndpointUrl = '';
        if (typeof service.serviceEndpoint === 'string') {
            serviceEndpointUrl = service.serviceEndpoint;
        }
        else if (service.serviceEndpoint.uri) {
            serviceEndpointUrl = service.serviceEndpoint.uri;
        }
        else if (service.serviceEndpoint.length > 0) {
            if (typeof service.serviceEndpoint[0] === 'string') {
                serviceEndpointUrl = service.serviceEndpoint[0];
            }
            else if (service.serviceEndpoint[0].uri) {
                serviceEndpointUrl = service.serviceEndpoint[0].uri;
            }
        }
        try {
            const response = await fetch(serviceEndpointUrl, {
                method: this.httpMethod,
                body: message,
            });
            let result;
            if (response.ok) {
                let returnMessage;
                // Check if response is a DIDComm message
                if (response.headers.get('Content-Type')?.startsWith('application/didcomm')) {
                    returnMessage = await response.json();
                }
                result = {
                    result: 'successfully sent message: ' + response.statusText,
                    returnMessage: returnMessage,
                };
            }
            else {
                result = {
                    error: 'failed to send message: ' + response.statusText,
                };
            }
            return result;
        }
        catch (e) {
            return {
                error: 'failed to send message: ' + e,
            };
        }
    }
}
//# sourceMappingURL=transports.js.map