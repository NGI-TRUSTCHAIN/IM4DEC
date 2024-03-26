/**
 * Represents different DIDComm v2 message encapsulation.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export var DIDCommMessageMediaType;
(function (DIDCommMessageMediaType) {
    /**
     * A plain JSON DIDComm message
     */
    DIDCommMessageMediaType["PLAIN"] = "application/didcomm-plain+json";
    /**
     * A JWS signed DIDComm message
     */
    DIDCommMessageMediaType["SIGNED"] = "application/didcomm-signed+json";
    /**
     * A JWE encrypted DIDComm message
     */
    DIDCommMessageMediaType["ENCRYPTED"] = "application/didcomm-encrypted+json";
})(DIDCommMessageMediaType || (DIDCommMessageMediaType = {}));
//# sourceMappingURL=message-types.js.map