/**
 * Class containing reusable JSON canonicalization operations using JSON Canonicalization Scheme (JCS).
 */
export declare class JsonCanonicalizer {
    /**
     * Canonicalizes the given content as a string
     * @param The content to canonicalize
     * @return The canonicalized content
     */
    static asString(content: unknown): string;
    /**
     * Removes all properties within the given object with `undefined` as value as that would mess up the validity
     */
    private static removeAllUndefinedProperties;
}
//# sourceMappingURL=json-canonicalizer.d.ts.map