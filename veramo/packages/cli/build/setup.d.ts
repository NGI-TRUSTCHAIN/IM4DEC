import { ICredentialPlugin, IDataStore, IDataStoreORM, IDIDManager, IKeyManager, IMessageHandler, IResolver, TAgent } from '@veramo/core-types';
import { IMediationManager } from "@veramo/mediation-manager";
import { ISelectiveDisclosure } from '@veramo/selective-disclosure';
import { IDIDComm } from '@veramo/did-comm';
import { IDIDDiscovery } from '@veramo/did-discovery';
import fs from 'fs';
/**
 * Parses a yaml config file and returns a config object
 * @param filePath
 */
export declare const getConfig: (filePath: fs.PathLike) => Promise<{
    [x: string]: any;
    version?: number | undefined;
}>;
export type EnabledInterfaces = IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & IMessageHandler & IDIDComm & ICredentialPlugin & ISelectiveDisclosure & IDIDDiscovery & IMediationManager;
export type ConfiguredAgent = TAgent<EnabledInterfaces>;
export declare function getAgent(fileName: string): Promise<ConfiguredAgent>;
//# sourceMappingURL=setup.d.ts.map