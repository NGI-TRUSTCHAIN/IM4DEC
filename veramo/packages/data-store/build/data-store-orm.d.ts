import { AuthorizedDIDContext, FindArgs, IAgentPlugin, IDataStoreORM, IMessage, PartialIdentifier, TClaimsColumns, TCredentialColumns, TIdentifiersColumns, TMessageColumns, TPresentationColumns, UniqueVerifiableCredential, UniqueVerifiablePresentation } from '@veramo/core-types';
import { DataSource } from 'typeorm';
import { OrPromise } from '@veramo/utils';
/**
 * This class implements the {@link @veramo/core-types#IDataStoreORM} query interface using a TypeORM compatible database.
 *
 * This allows you to filter Verifiable Credentials, Presentations and Messages by some common properties that are
 * parsed and stored in database tables.
 *
 * This class is designed to work with {@link @veramo/data-store#DataStore} which is the default way to populate the
 * database with Credentials, Presentations and Messages in such a way that they can be queried by this class.
 * These two classes MUST also share the same database connection.
 *
 * @see {@link @veramo/core-types#IDataStoreORM}
 * @see {@link @veramo/core-types#IDataStore}
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class DataStoreORM implements IAgentPlugin {
    readonly methods: IDataStoreORM;
    readonly schema: {
        components: {
            schemas: {
                FindIdentifiersArgs: {
                    $ref: string;
                    description: string;
                };
                "FindArgs-TIdentifiersColumns": {
                    type: string;
                    properties: {
                        where: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        order: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        skip: {
                            type: string;
                            description: string;
                        };
                        take: {
                            type: string;
                            description: string;
                        };
                    };
                    description: string;
                };
                "Where-TIdentifiersColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        value: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        not: {
                            type: string;
                        };
                        op: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                TIdentifiersColumns: {
                    type: string;
                    enum: string[];
                    description: string;
                    deprecated: string;
                };
                "Order-TIdentifiersColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        direction: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                PartialIdentifier: {
                    type: string;
                    properties: {
                        did: {
                            type: string;
                            description: string;
                        };
                        alias: {
                            type: string;
                            description: string;
                        };
                        provider: {
                            type: string;
                            description: string;
                        };
                        controllerKeyId: {
                            type: string;
                            description: string;
                        };
                        keys: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        services: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                    };
                    description: string;
                };
                IKey: {
                    type: string;
                    properties: {
                        kid: {
                            type: string;
                            description: string;
                        };
                        kms: {
                            type: string;
                            description: string;
                        };
                        type: {
                            $ref: string;
                            description: string;
                        };
                        publicKeyHex: {
                            type: string;
                            description: string;
                        };
                        privateKeyHex: {
                            type: string;
                            description: string;
                        };
                        meta: {
                            anyOf: ({
                                $ref: string;
                                type?: undefined;
                            } | {
                                type: string;
                                $ref?: undefined;
                            })[];
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                TKeyType: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                KeyMetadata: {
                    type: string;
                    properties: {
                        algorithms: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                    };
                    description: string;
                };
                TAlg: {
                    type: string;
                    description: string;
                };
                IService: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        type: {
                            type: string;
                            description: string;
                        };
                        serviceEndpoint: {
                            anyOf: ({
                                $ref: string;
                                type?: undefined;
                                items?: undefined;
                            } | {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                                $ref?: undefined;
                            })[];
                            description: string;
                        };
                        description: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IServiceEndpoint: {
                    anyOf: {
                        type: string;
                    }[];
                    description: string;
                };
                FindMessagesArgs: {
                    $ref: string;
                    description: string;
                };
                "FindArgs-TMessageColumns": {
                    type: string;
                    properties: {
                        where: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        order: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        skip: {
                            type: string;
                            description: string;
                        };
                        take: {
                            type: string;
                            description: string;
                        };
                    };
                    description: string;
                };
                "Where-TMessageColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        value: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        not: {
                            type: string;
                        };
                        op: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                TMessageColumns: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                "Order-TMessageColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        direction: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                IMessage: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        type: {
                            type: string;
                            description: string;
                        };
                        createdAt: {
                            type: string;
                            description: string;
                        };
                        expiresAt: {
                            type: string;
                            description: string;
                        };
                        threadId: {
                            type: string;
                            description: string;
                        };
                        raw: {
                            type: string;
                            description: string;
                        };
                        data: {
                            anyOf: {
                                type: string;
                            }[];
                            description: string;
                        };
                        replyTo: {
                            type: string;
                            items: {
                                type: string;
                            };
                            description: string;
                        };
                        replyUrl: {
                            type: string;
                            description: string;
                        };
                        from: {
                            type: string;
                            description: string;
                        };
                        to: {
                            type: string;
                            description: string;
                        };
                        metaData: {
                            anyOf: ({
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            } | {
                                type: string;
                                items?: undefined;
                            })[];
                            description: string;
                        };
                        credentials: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        presentations: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        attachments: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        returnRoute: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IMetaData: {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                            description: string;
                        };
                        value: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                VerifiableCredential: {
                    type: string;
                    properties: {
                        proof: {
                            $ref: string;
                        };
                        issuer: {
                            $ref: string;
                        };
                        credentialSubject: {
                            $ref: string;
                        };
                        type: {
                            anyOf: ({
                                type: string;
                                items: {
                                    type: string;
                                };
                            } | {
                                type: string;
                                items?: undefined;
                            })[];
                        };
                        "@context": {
                            $ref: string;
                        };
                        issuanceDate: {
                            type: string;
                        };
                        expirationDate: {
                            type: string;
                        };
                        credentialStatus: {
                            $ref: string;
                        };
                        id: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                ProofType: {
                    type: string;
                    properties: {
                        type: {
                            type: string;
                        };
                    };
                    description: string;
                };
                IssuerType: {
                    anyOf: ({
                        type: string;
                        properties: {
                            id: {
                                type: string;
                            };
                        };
                        required: string[];
                    } | {
                        type: string;
                        properties?: undefined;
                        required?: undefined;
                    })[];
                    description: string;
                };
                CredentialSubject: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                    };
                    description: string;
                };
                ContextType: {
                    anyOf: ({
                        type: string;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            anyOf: {
                                type: string;
                            }[];
                        };
                    })[];
                    description: string;
                };
                CredentialStatusReference: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                        type: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                VerifiablePresentation: {
                    type: string;
                    properties: {
                        proof: {
                            $ref: string;
                        };
                        holder: {
                            type: string;
                        };
                        verifiableCredential: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                        };
                        type: {
                            anyOf: ({
                                type: string;
                                items: {
                                    type: string;
                                };
                            } | {
                                type: string;
                                items?: undefined;
                            })[];
                        };
                        "@context": {
                            $ref: string;
                        };
                        verifier: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        issuanceDate: {
                            type: string;
                        };
                        expirationDate: {
                            type: string;
                        };
                        id: {
                            type: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                W3CVerifiableCredential: {
                    anyOf: {
                        $ref: string;
                    }[];
                    description: string;
                };
                CompactJWT: {
                    type: string;
                    description: string;
                };
                IMessageAttachment: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                        };
                        description: {
                            type: string;
                        };
                        filename: {
                            type: string;
                        };
                        media_type: {
                            type: string;
                        };
                        format: {
                            type: string;
                        };
                        lastmod_time: {
                            type: string;
                        };
                        byte_count: {
                            type: string;
                        };
                        data: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IMessageAttachmentData: {
                    type: string;
                    properties: {
                        jws: {};
                        hash: {
                            type: string;
                        };
                        links: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        base64: {
                            type: string;
                        };
                        json: {};
                    };
                    description: string;
                };
                FindCredentialsArgs: {
                    $ref: string;
                    description: string;
                };
                "FindArgs-TCredentialColumns": {
                    type: string;
                    properties: {
                        where: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        order: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        skip: {
                            type: string;
                            description: string;
                        };
                        take: {
                            type: string;
                            description: string;
                        };
                    };
                    description: string;
                };
                "Where-TCredentialColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        value: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        not: {
                            type: string;
                        };
                        op: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                TCredentialColumns: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                "Order-TCredentialColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        direction: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                UniqueVerifiableCredential: {
                    type: string;
                    properties: {
                        hash: {
                            type: string;
                        };
                        verifiableCredential: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                FindClaimsArgs: {
                    $ref: string;
                    description: string;
                };
                "FindArgs-TClaimsColumns": {
                    type: string;
                    properties: {
                        where: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        order: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        skip: {
                            type: string;
                            description: string;
                        };
                        take: {
                            type: string;
                            description: string;
                        };
                    };
                    description: string;
                };
                "Where-TClaimsColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        value: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        not: {
                            type: string;
                        };
                        op: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                TClaimsColumns: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                "Order-TClaimsColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        direction: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                FindPresentationsArgs: {
                    $ref: string;
                    description: string;
                };
                "FindArgs-TPresentationColumns": {
                    type: string;
                    properties: {
                        where: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        order: {
                            type: string;
                            items: {
                                $ref: string;
                            };
                            description: string;
                        };
                        skip: {
                            type: string;
                            description: string;
                        };
                        take: {
                            type: string;
                            description: string;
                        };
                    };
                    description: string;
                };
                "Where-TPresentationColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        value: {
                            type: string;
                            items: {
                                type: string;
                            };
                        };
                        not: {
                            type: string;
                        };
                        op: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                TPresentationColumns: {
                    type: string;
                    enum: string[];
                    description: string;
                };
                "Order-TPresentationColumns": {
                    type: string;
                    properties: {
                        column: {
                            $ref: string;
                        };
                        direction: {
                            type: string;
                            enum: string[];
                        };
                    };
                    required: string[];
                    description: string;
                };
                UniqueVerifiablePresentation: {
                    type: string;
                    properties: {
                        hash: {
                            type: string;
                        };
                        verifiablePresentation: {
                            $ref: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
            };
            methods: {
                dataStoreORMGetIdentifiers: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                dataStoreORMGetIdentifiersCount: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                dataStoreORMGetMessages: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                dataStoreORMGetMessagesCount: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                dataStoreORMGetVerifiableCredentials: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                dataStoreORMGetVerifiableCredentialsByClaims: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                dataStoreORMGetVerifiableCredentialsByClaimsCount: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                dataStoreORMGetVerifiableCredentialsCount: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                dataStoreORMGetVerifiablePresentations: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
                dataStoreORMGetVerifiablePresentationsCount: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
            };
        };
    };
    private dbConnection;
    constructor(dbConnection: OrPromise<DataSource>);
    private identifiersQuery;
    dataStoreORMGetIdentifiers(args: FindArgs<TIdentifiersColumns>, context: AuthorizedDIDContext): Promise<PartialIdentifier[]>;
    dataStoreORMGetIdentifiersCount(args: FindArgs<TIdentifiersColumns>, context: AuthorizedDIDContext): Promise<number>;
    private messagesQuery;
    dataStoreORMGetMessages(args: FindArgs<TMessageColumns>, context: AuthorizedDIDContext): Promise<IMessage[]>;
    dataStoreORMGetMessagesCount(args: FindArgs<TMessageColumns>, context: AuthorizedDIDContext): Promise<number>;
    private claimsQuery;
    dataStoreORMGetVerifiableCredentialsByClaims(args: FindArgs<TClaimsColumns>, context: AuthorizedDIDContext): Promise<Array<UniqueVerifiableCredential>>;
    dataStoreORMGetVerifiableCredentialsByClaimsCount(args: FindArgs<TClaimsColumns>, context: AuthorizedDIDContext): Promise<number>;
    private credentialsQuery;
    dataStoreORMGetVerifiableCredentials(args: FindArgs<TCredentialColumns>, context: AuthorizedDIDContext): Promise<Array<UniqueVerifiableCredential>>;
    dataStoreORMGetVerifiableCredentialsCount(args: FindArgs<TCredentialColumns>, context: AuthorizedDIDContext): Promise<number>;
    private presentationsQuery;
    dataStoreORMGetVerifiablePresentations(args: FindArgs<TPresentationColumns>, context: AuthorizedDIDContext): Promise<Array<UniqueVerifiablePresentation>>;
    dataStoreORMGetVerifiablePresentationsCount(args: FindArgs<TPresentationColumns>, context: AuthorizedDIDContext): Promise<number>;
}
//# sourceMappingURL=data-store-orm.d.ts.map