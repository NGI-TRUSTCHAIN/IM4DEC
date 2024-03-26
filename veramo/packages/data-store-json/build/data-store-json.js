import schema from '@veramo/core-types/build/plugin.schema.json' assert { type: 'json' };
import { asArray, computeEntryHash, extractIssuer } from '@veramo/utils';
import { deserialize, serialize } from '@ungap/structured-clone';
import { normalizeCredential } from 'did-jwt-vc';
/**
 * A Veramo agent storage plugin that implements the {@link @veramo/core-types#IDataStore | IDataStore} and
 * {@link @veramo/core-types#IDataStoreORM | IDataStoreORM} methods using one big JSON object as a backend.
 *
 * Each update operation triggers a callback that can be used to either save the latest state of the agent data or
 * compute a diff and log only the changes.
 *
 * This plugin must be initialized with a {@link VeramoJsonStore}, which serves as the JSON object storing data in
 * memory as well as providing an update notification callback to persist this data.
 * The JSON object can be pre-populated with data from previous sessions.
 *
 * @beta This API may change without a BREAKING CHANGE notice.
 */
export class DataStoreJson {
    methods;
    schema = { ...schema.IDataStore, ...schema.IDataStoreORM };
    cacheTree;
    notifyUpdate;
    /**
     * @param jsonStore - A reference to the JSON object that holds the data in memory and implements an update callback.
     *   This object can be pre-populated with data from previous sessions, and will be used by reference.
     */
    constructor(jsonStore) {
        this.notifyUpdate = jsonStore.notifyUpdate;
        this.cacheTree = jsonStore;
        const tables = ['dids', 'credentials', 'presentations', 'claims', 'messages'];
        for (const table of tables) {
            if (!this.cacheTree[table]) {
                this.cacheTree[table] = {};
            }
        }
        this.methods = {
            // IDataStore methods
            dataStoreSaveMessage: this.dataStoreSaveMessage.bind(this),
            dataStoreGetMessage: this.dataStoreGetMessage.bind(this),
            dataStoreDeleteMessage: this.dataStoreDeleteMessage.bind(this),
            dataStoreSaveVerifiableCredential: this.dataStoreSaveVerifiableCredential.bind(this),
            dataStoreGetVerifiableCredential: this.dataStoreGetVerifiableCredential.bind(this),
            dataStoreDeleteVerifiableCredential: this.dataStoreDeleteVerifiableCredential.bind(this),
            dataStoreSaveVerifiablePresentation: this.dataStoreSaveVerifiablePresentation.bind(this),
            dataStoreGetVerifiablePresentation: this.dataStoreGetVerifiablePresentation.bind(this),
            // IDataStoreORM methods
            dataStoreORMGetIdentifiers: this.dataStoreORMGetIdentifiers.bind(this),
            dataStoreORMGetIdentifiersCount: this.dataStoreORMGetIdentifiersCount.bind(this),
            dataStoreORMGetMessages: this.dataStoreORMGetMessages.bind(this),
            dataStoreORMGetMessagesCount: this.dataStoreORMGetMessagesCount.bind(this),
            dataStoreORMGetVerifiableCredentialsByClaims: this.dataStoreORMGetVerifiableCredentialsByClaims.bind(this),
            dataStoreORMGetVerifiableCredentialsByClaimsCount: this.dataStoreORMGetVerifiableCredentialsByClaimsCount.bind(this),
            dataStoreORMGetVerifiableCredentials: this.dataStoreORMGetVerifiableCredentials.bind(this),
            dataStoreORMGetVerifiableCredentialsCount: this.dataStoreORMGetVerifiableCredentialsCount.bind(this),
            dataStoreORMGetVerifiablePresentations: this.dataStoreORMGetVerifiablePresentations.bind(this),
            dataStoreORMGetVerifiablePresentationsCount: this.dataStoreORMGetVerifiablePresentationsCount.bind(this),
        };
    }
    async dataStoreSaveMessage(args) {
        const id = args.message?.id || computeEntryHash(args.message);
        const message = { ...args.message, id };
        const oldTree = deserialize(serialize(this.cacheTree, { lossy: true }));
        this.cacheTree.messages[id] = message;
        // TODO: deprecate automatic credential and presentation saving
        const credentials = asArray(message.credentials);
        const presentations = asArray(message.presentations);
        for (const verifiableCredential of credentials) {
            await this._dataStoreSaveVerifiableCredential({ verifiableCredential }, false);
        }
        for (const verifiablePresentation of presentations) {
            await this._dataStoreSaveVerifiablePresentation({ verifiablePresentation }, false);
        }
        // adding dummy DIDs is required to make `dataStoreORMGetIdentifiers` work
        if (message?.from && !this.cacheTree.dids[message.from]) {
            this.cacheTree.dids[message.from] = { did: message.from, provider: '', keys: [], services: [] };
        }
        asArray(message.to).forEach((did) => {
            if (!this.cacheTree.dids[did]) {
                this.cacheTree.dids[did] = { did, provider: '', keys: [], services: [] };
            }
        });
        await this.notifyUpdate(oldTree, this.cacheTree);
        return message.id;
    }
    async dataStoreGetMessage(args) {
        const message = this.cacheTree.messages[args.id];
        if (message) {
            return message;
        }
        else {
            throw Error('Message not found');
        }
    }
    async dataStoreDeleteMessage(args) {
        const message = this.cacheTree.messages[args.id];
        if (message) {
            const oldTree = deserialize(serialize(this.cacheTree, { lossy: true }));
            delete this.cacheTree.messages[args.id];
            await this.notifyUpdate(oldTree, this.cacheTree);
            return true;
        }
        else {
            return false;
        }
    }
    async _dataStoreSaveVerifiableCredential(args, postUpdates = true) {
        const canonicalCredential = args?.verifiableCredential?.proof?.type === 'JwtProof2020' &&
            typeof args?.verifiableCredential?.proof?.jwt === 'string'
            ? args?.verifiableCredential?.proof?.jwt
            : args.verifiableCredential;
        const vc = args.verifiableCredential;
        const id = vc.id;
        const hash = computeEntryHash(canonicalCredential);
        const issuer = extractIssuer(vc);
        const subject = vc.credentialSubject.id;
        const context = asArray(vc['@context']);
        const type = asArray(vc.type);
        let issuanceDate = undefined;
        let expirationDate = undefined;
        if (vc.issuanceDate) {
            issuanceDate = new Date(vc.issuanceDate);
        }
        if (vc.expirationDate) {
            expirationDate = new Date(vc.expirationDate);
        }
        const credential = {
            hash,
            id,
            parsedCredential: vc,
            canonicalCredential,
            issuer,
            subject,
            issuanceDate,
            expirationDate,
            context,
            type,
        };
        const claims = [];
        for (const claimType in vc.credentialSubject) {
            if (vc.credentialSubject.hasOwnProperty(claimType)) {
                const value = vc.credentialSubject[claimType];
                if (claimType !== 'id') {
                    const claim = {
                        hash: computeEntryHash(hash + claimType),
                        type: claimType,
                        value,
                        issuer,
                        subject,
                        issuanceDate,
                        expirationDate,
                        context: context,
                        credentialType: type,
                        credentialHash: hash,
                    };
                    claims.push(claim);
                }
            }
        }
        let oldTree;
        if (postUpdates) {
            oldTree = deserialize(serialize(this.cacheTree, { lossy: true }));
        }
        this.cacheTree.credentials[hash] = credential;
        for (const claim of claims) {
            this.cacheTree.claims[claim.hash] = claim;
        }
        // adding dummy DIDs is required to make `dataStoreORMGetIdentifiers` work
        if (issuer && !this.cacheTree.dids[issuer]) {
            this.cacheTree.dids[issuer] = { did: issuer, provider: '', keys: [], services: [] };
        }
        if (subject && !this.cacheTree.dids[subject]) {
            this.cacheTree.dids[subject] = { did: subject, provider: '', keys: [], services: [] };
        }
        if (postUpdates) {
            await this.notifyUpdate(oldTree, this.cacheTree);
        }
        return credential.hash;
    }
    async dataStoreSaveVerifiableCredential(args) {
        return this._dataStoreSaveVerifiableCredential(args);
    }
    async dataStoreDeleteVerifiableCredential(args) {
        const credential = this.cacheTree.credentials[args.hash];
        if (credential) {
            const claims = Object.values(this.cacheTree.claims)
                .filter((claim) => claim.credentialHash === credential.hash)
                .map((claim) => claim.hash);
            const oldTree = deserialize(serialize(this.cacheTree, { lossy: true }));
            delete this.cacheTree.credentials[args.hash];
            for (const claimHash of claims) {
                delete this.cacheTree.claims[claimHash];
            }
            await this.notifyUpdate(oldTree, this.cacheTree);
            return true;
        }
        return false;
    }
    async dataStoreGetVerifiableCredential(args) {
        const credentialEntity = this.cacheTree.credentials[args.hash];
        if (credentialEntity) {
            const { parsedCredential } = credentialEntity;
            return deserialize(serialize(parsedCredential));
        }
        else {
            throw Error('Verifiable credential not found');
        }
    }
    async _dataStoreSaveVerifiablePresentation(args, postUpdates = true) {
        const vp = args.verifiablePresentation;
        const canonicalPresentation = vp?.proof?.type === 'JwtProof2020' && typeof vp?.proof?.jwt === 'string' ? vp?.proof?.jwt : vp;
        const id = vp.id;
        const hash = computeEntryHash(canonicalPresentation);
        const holder = extractIssuer(vp);
        const verifier = asArray(vp.verifier);
        const context = asArray(vp['@context']);
        const type = asArray(vp.type);
        let issuanceDate = undefined;
        let expirationDate = undefined;
        if (vp.issuanceDate) {
            issuanceDate = new Date(vp.issuanceDate);
        }
        if (vp.expirationDate) {
            expirationDate = new Date(vp.expirationDate);
        }
        const credentials = asArray(vp.verifiableCredential).map((cred) => {
            if (typeof cred === 'string') {
                return normalizeCredential(cred);
            }
            else {
                return cred;
            }
        });
        const presentation = {
            hash,
            id,
            parsedPresentation: vp,
            canonicalPresentation,
            holder,
            verifier,
            issuanceDate,
            expirationDate,
            context,
            type,
            credentials,
        };
        let oldTree;
        if (postUpdates) {
            oldTree = deserialize(serialize(this.cacheTree, { lossy: true }));
        }
        this.cacheTree.presentations[hash] = presentation;
        for (const verifiableCredential of credentials) {
            await this._dataStoreSaveVerifiableCredential({ verifiableCredential }, false);
        }
        // adding dummy DIDs is required to make `dataStoreORMGetIdentifiers` work
        if (holder && !this.cacheTree.dids[holder]) {
            this.cacheTree.dids[holder] = { did: holder, provider: '', keys: [], services: [] };
        }
        asArray(verifier).forEach((did) => {
            if (!this.cacheTree.dids[did]) {
                this.cacheTree.dids[did] = { did, provider: '', keys: [], services: [] };
            }
        });
        if (postUpdates) {
            await this.notifyUpdate(oldTree, this.cacheTree);
        }
        return hash;
    }
    async dataStoreSaveVerifiablePresentation(args) {
        return this._dataStoreSaveVerifiablePresentation(args);
    }
    async dataStoreGetVerifiablePresentation(args) {
        const presentationEntry = this.cacheTree.presentations[args.hash];
        if (presentationEntry) {
            const { parsedPresentation } = presentationEntry;
            return parsedPresentation;
        }
        else {
            throw Error('Verifiable presentation not found');
        }
    }
    async dataStoreORMGetIdentifiers(args, context) {
        const identifiers = buildQuery(Object.values(this.cacheTree.dids), args, ['did'], context.authorizedDID);
        // FIXME: collect corresponding keys from `this.cacheTree.keys`?
        return deserialize(serialize(identifiers));
    }
    async dataStoreORMGetIdentifiersCount(args, context) {
        return (await this.dataStoreORMGetIdentifiers(args, context)).length;
    }
    async dataStoreORMGetMessages(args, context) {
        const messages = buildQuery(Object.values(this.cacheTree.messages), args, ['to', 'from'], context.authorizedDID);
        return deserialize(serialize(messages));
    }
    async dataStoreORMGetMessagesCount(args, context) {
        return (await this.dataStoreORMGetMessages(args, context)).length;
    }
    async dataStoreORMGetVerifiableCredentialsByClaims(args, context) {
        const filteredClaims = buildQuery(Object.values(this.cacheTree.claims), args, ['issuer', 'subject'], context.authorizedDID);
        let filteredCredentials = new Set();
        filteredClaims.forEach((claim) => {
            filteredCredentials.add(this.cacheTree.credentials[claim.credentialHash]);
        });
        return deserialize(serialize(Array.from(filteredCredentials).map((cred) => {
            const { hash, parsedCredential } = cred;
            return {
                hash,
                verifiableCredential: parsedCredential,
            };
        })));
    }
    async dataStoreORMGetVerifiableCredentialsByClaimsCount(args, context) {
        return (await this.dataStoreORMGetVerifiableCredentialsByClaims(args, context)).length;
    }
    async dataStoreORMGetVerifiableCredentials(args, context) {
        const credentials = buildQuery(Object.values(this.cacheTree.credentials), args, ['issuer', 'subject'], context.authorizedDID);
        return deserialize(serialize(credentials.map((cred) => {
            const { hash, parsedCredential } = cred;
            return {
                hash,
                verifiableCredential: parsedCredential,
            };
        })));
    }
    async dataStoreORMGetVerifiableCredentialsCount(args, context) {
        return (await this.dataStoreORMGetVerifiableCredentials(args, context)).length;
    }
    async dataStoreORMGetVerifiablePresentations(args, context) {
        const presentations = buildQuery(Object.values(this.cacheTree.presentations), args, ['holder', 'verifier'], context.authorizedDID);
        return deserialize(serialize(presentations.map((pres) => {
            const { hash, parsedPresentation } = pres;
            return {
                hash,
                verifiablePresentation: parsedPresentation,
            };
        })));
    }
    async dataStoreORMGetVerifiablePresentationsCount(args, context) {
        return (await this.dataStoreORMGetVerifiablePresentations(args, context)).length;
    }
}
function buildFilter(target, input) {
    let condition = true;
    if (input?.where) {
        for (const item of input.where) {
            let newCondition;
            const targetValue = target[item.column];
            switch (item.op) {
                case 'Between':
                    if (item.value?.length != 2)
                        throw Error('Operation Between requires two values');
                    newCondition = item.value[0] <= targetValue && targetValue <= item.value[1];
                    break;
                case 'Equal':
                    if (item.value?.length != 1)
                        throw Error('Operation Equal requires one value');
                    newCondition = item.value[0] === targetValue;
                    if (Array.isArray(targetValue)) {
                        // mimicking legacy SQL data-store behavior where array values are stored as joined strings
                        newCondition ||= targetValue.join(',').includes(item.value[0]);
                    }
                    break;
                case 'IsNull':
                    newCondition = targetValue === null || typeof targetValue === 'undefined';
                    break;
                case 'LessThan':
                    if (item.value?.length != 1)
                        throw Error('Operation LessThan requires one value');
                    newCondition = targetValue < item.value;
                    break;
                case 'LessThanOrEqual':
                    if (item.value?.length != 1)
                        throw Error('Operation LessThanOrEqual requires one value');
                    newCondition = targetValue <= item.value;
                    break;
                case 'Like':
                    if (item.value?.length != 1)
                        throw Error('Operation Like requires one value');
                    // FIXME: add support for escaping
                    const likeExpression = `^${(item.value?.[0] || '').replace(/_/g, '.').replace(/%/g, '.*')}$`;
                    newCondition = new RegExp(likeExpression).test(targetValue);
                    break;
                case 'MoreThan':
                    if (item.value?.length != 1)
                        throw Error('Operation MoreThan requires one value');
                    newCondition = targetValue > item.value;
                    break;
                case 'MoreThanOrEqual':
                    if (item.value?.length != 1)
                        throw Error('Operation MoreThanOrEqual requires one value');
                    newCondition = targetValue >= item.value;
                    break;
                case 'Any':
                case 'In':
                default:
                    if (!Array.isArray(item.value))
                        throw Error('Operator Any requires value to be an array');
                    if (Array.isArray(targetValue)) {
                        newCondition = item.value.find((val) => targetValue.includes(val)) !== undefined;
                        // mimicking legacy SQL data-store behavior where array values are stored as joined strings
                        newCondition ||= targetValue.join(',').includes(item.value.join(','));
                    }
                    else {
                        newCondition = item.value.includes(targetValue);
                    }
                    break;
            }
            if (item.not === true) {
                newCondition = !newCondition;
            }
            condition &&= newCondition;
        }
    }
    return condition;
}
function buildQuery(targetCollection, input, authFilterColumns, authFilterValue) {
    let filteredCollection = targetCollection.filter((target) => buildFilter(target, input));
    if (authFilterValue) {
        filteredCollection = filteredCollection.filter((target) => {
            let columnValues = [];
            for (const column of authFilterColumns) {
                columnValues = [...columnValues, ...asArray(target[column])];
            }
            return columnValues.includes(authFilterValue);
        });
    }
    if (input.order && input.order.length > 0) {
        filteredCollection.sort((a, b) => {
            let result = 0;
            let orderIndex = 0;
            while (result == 0 && input.order?.[orderIndex]) {
                const direction = input.order?.[orderIndex].direction === 'DESC' ? -1 : 1;
                const col = input.order?.[orderIndex]?.column;
                if (!col) {
                    break;
                }
                const colA = a[col];
                const colB = b[col];
                if (typeof colA?.getTime === 'function') {
                    const aTime = colA.getTime();
                    const bTime = typeof colB?.getTime === 'function' ? colB.getTime() : 0;
                    result = direction * (aTime - bTime || 0);
                }
                else if (typeof colA?.localeCompare === 'function') {
                    result = direction * colA.localeCompare(colB);
                }
                else {
                    result = direction * (colA - colB || 0);
                }
                orderIndex++;
            }
            return result;
        });
    }
    if (input.skip) {
        filteredCollection = filteredCollection.slice(input.skip);
    }
    if (input.take) {
        const start = (input.skip && input.skip - 1) || 0;
        const end = start + input.take;
        filteredCollection = filteredCollection.slice(start, end);
    }
    return filteredCollection;
}
//# sourceMappingURL=data-store-json.js.map