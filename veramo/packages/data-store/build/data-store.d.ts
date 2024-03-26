import { IAgentPlugin, IDataStore, IDataStoreDeleteVerifiableCredentialArgs, IDataStoreGetMessageArgs, IDataStoreDeleteMessageArgs, IDataStoreGetVerifiableCredentialArgs, IDataStoreGetVerifiablePresentationArgs, IDataStoreSaveMessageArgs, IDataStoreSaveVerifiableCredentialArgs, IDataStoreSaveVerifiablePresentationArgs, IMessage, VerifiableCredential, VerifiablePresentation } from '@veramo/core-types';
import { DataSource } from 'typeorm';
import { OrPromise } from '@veramo/utils';
/**
 * This class implements the {@link @veramo/core-types#IDataStore} interface using a TypeORM compatible database.
 *
 * This allows you to store and retrieve Verifiable Credentials, Presentations and Messages by their IDs.
 *
 * For more complex queries you should use {@link @veramo/data-store#DataStoreORM} which is the default way to query
 * the stored data by some common properties. These two classes MUST also share the same database connection.
 *
 * @see {@link @veramo/core-types#IDataStoreORM}
 * @see {@link @veramo/core-types#IDataStore}
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export declare class DataStore implements IAgentPlugin {
    readonly methods: IDataStore;
    readonly schema: {
        components: {
            schemas: {
                IDataStoreDeleteMessageArgs: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDataStoreDeleteVerifiableCredentialArgs: {
                    type: string;
                    properties: {
                        hash: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDataStoreGetMessageArgs: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
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
                IDataStoreGetVerifiableCredentialArgs: {
                    type: string;
                    properties: {
                        hash: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDataStoreGetVerifiablePresentationArgs: {
                    type: string;
                    properties: {
                        hash: {
                            type: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDataStoreSaveMessageArgs: {
                    type: string;
                    properties: {
                        message: {
                            $ref: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDataStoreSaveVerifiableCredentialArgs: {
                    type: string;
                    properties: {
                        verifiableCredential: {
                            $ref: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                IDataStoreSaveVerifiablePresentationArgs: {
                    type: string;
                    properties: {
                        verifiablePresentation: {
                            $ref: string;
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
            };
            methods: {
                dataStoreDeleteMessage: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                dataStoreDeleteVerifiableCredential: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                dataStoreGetMessage: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                dataStoreGetVerifiableCredential: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                dataStoreGetVerifiablePresentation: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        $ref: string;
                    };
                };
                dataStoreSaveMessage: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                dataStoreSaveVerifiableCredential: {
                    description: string;
                    arguments: {
                        $ref: string;
                    };
                    returnType: {
                        type: string;
                    };
                };
                dataStoreSaveVerifiablePresentation: {
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
    dataStoreSaveMessage(args: IDataStoreSaveMessageArgs): Promise<string>;
    dataStoreGetMessage(args: IDataStoreGetMessageArgs): Promise<IMessage>;
    dataStoreDeleteMessage(args: IDataStoreDeleteMessageArgs): Promise<boolean>;
    dataStoreDeleteVerifiableCredential(args: IDataStoreDeleteVerifiableCredentialArgs): Promise<boolean>;
    dataStoreSaveVerifiableCredential(args: IDataStoreSaveVerifiableCredentialArgs): Promise<string>;
    dataStoreGetVerifiableCredential(args: IDataStoreGetVerifiableCredentialArgs): Promise<VerifiableCredential>;
    dataStoreSaveVerifiablePresentation(args: IDataStoreSaveVerifiablePresentationArgs): Promise<string>;
    dataStoreGetVerifiablePresentation(args: IDataStoreGetVerifiablePresentationArgs): Promise<VerifiablePresentation>;
}
//# sourceMappingURL=data-store.d.ts.map