## API Report File for "@veramo/did-provider-ion"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { DIDResolver } from 'did-resolver';
import { IAgentContext } from '@veramo/core-types';
import { IIdentifier } from '@veramo/core-types';
import { IKey } from '@veramo/core-types';
import { IKeyManager } from '@veramo/core-types';
import { IonPublicKeyPurpose } from '@decentralized-identity/ion-sdk';
import { IService } from '@veramo/core-types';
import { MinimalImportableKey } from '@veramo/core-types';

// @public (undocumented)
export function getDidIonResolver(): {
    ion: DIDResolver;
};

// @public
export class IonDIDProvider extends AbstractIdentifierProvider {
    constructor(options: {
        defaultKms: string;
        challengeEnabled?: boolean;
        challengeEndpoint?: string;
        solutionEndpoint?: string;
    });
    // (undocumented)
    addKey({ identifier, key, options }: {
        identifier: IIdentifier;
        key: IKey;
        options?: IAddKeyOpts;
    }, context: IContext): Promise<any>;
    // (undocumented)
    addService({ identifier, service, options }: {
        identifier: IIdentifier;
        service: IService;
        options?: IUpdateOpts;
    }, context: IContext): Promise<any>;
    // (undocumented)
    createIdentifier({ kms, options, alias }: {
        kms?: string;
        alias?: string;
        options?: ICreateIdentifierOpts;
    }, context: IAgentContext<IKeyManager>): Promise<Omit<IIdentifier, 'provider'>>;
    // Warning: (ae-forgotten-export) The symbol "IContext" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    deleteIdentifier(identifier: IIdentifier, context: IContext): Promise<boolean>;
    // (undocumented)
    removeKey({ identifier, kid, options }: {
        identifier: IIdentifier;
        kid: string;
        options?: IUpdateOpts;
    }, context: IContext): Promise<any>;
    // (undocumented)
    removeService({ identifier, id, options }: {
        identifier: IIdentifier;
        id: string;
        options?: IUpdateOpts;
    }, context: IContext): Promise<any>;
    // (undocumented)
    updateIdentifier(args: {
        did: string;
        kms?: string | undefined;
        alias?: string | undefined;
        options?: any;
    }, context: IAgentContext<IKeyManager>): Promise<IIdentifier>;
}

// Warnings were encountered during analysis:
//
// src/ion-did-provider.ts:74:62 - (ae-forgotten-export) The symbol "ICreateIdentifierOpts" needs to be exported by the entry point index.d.ts
// src/ion-did-provider.ts:179:73 - (ae-forgotten-export) The symbol "IAddKeyOpts" needs to be exported by the entry point index.d.ts
// src/ion-did-provider.ts:211:85 - (ae-forgotten-export) The symbol "IUpdateOpts" needs to be exported by the entry point index.d.ts

```
