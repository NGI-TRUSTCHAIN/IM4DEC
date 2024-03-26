import schema from '@veramo/core-types/build/plugin.schema.json' assert { type: 'json' };
/**
 * Agent plugin that implements {@link @veramo/core-types#IDIDManager} interface
 * @public
 */
export class DIDManager {
    /**
     * Plugin methods
     * @public
     */
    methods;
    schema = schema.IDIDManager;
    providers;
    defaultProvider;
    store;
    constructor(options) {
        this.providers = options.providers;
        this.defaultProvider = options.defaultProvider;
        this.store = options.store;
        this.methods = {
            didManagerGetProviders: this.didManagerGetProviders.bind(this),
            didManagerFind: this.didManagerFind.bind(this),
            didManagerGet: this.didManagerGet.bind(this),
            didManagerGetByAlias: this.didManagerGetByAlias.bind(this),
            didManagerCreate: this.didManagerCreate.bind(this),
            didManagerSetAlias: this.didManagerSetAlias.bind(this),
            didManagerGetOrCreate: this.didManagerGetOrCreate.bind(this),
            didManagerUpdate: this.didManagerUpdate.bind(this),
            didManagerImport: this.didManagerImport.bind(this),
            didManagerDelete: this.didManagerDelete.bind(this),
            didManagerAddKey: this.didManagerAddKey.bind(this),
            didManagerRemoveKey: this.didManagerRemoveKey.bind(this),
            didManagerAddService: this.didManagerAddService.bind(this),
            didManagerRemoveService: this.didManagerRemoveService.bind(this),
        };
    }
    getProvider(name) {
        let provider = this.providers[name];
        if (!provider) {
            provider = Object.values(this.providers).find((p) => typeof p.matchPrefix === 'function' && p.matchPrefix(name));
        }
        if (!provider)
            throw Error('Identifier provider does not exist: ' + name);
        return provider;
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerGetProviders} */
    async didManagerGetProviders() {
        return Object.keys(this.providers);
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerFind} */
    async didManagerFind(args) {
        return this.store.listDIDs(args);
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerGet} */
    async didManagerGet({ did }) {
        return this.store.getDID({ did });
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerGetByAlias} */
    async didManagerGetByAlias({ alias }) {
        return this.store.getDID({ alias });
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerCreate} */
    async didManagerCreate(args, context) {
        const providerName = args?.provider || this.defaultProvider;
        if (args?.alias !== undefined) {
            let existingIdentifier;
            try {
                existingIdentifier = await this.store.getDID({ alias: args.alias });
            }
            catch (e) { }
            if (existingIdentifier) {
                throw Error(`illegal_argument: Identifier with alias: ${args.alias} already exists: ${existingIdentifier.did}`);
            }
        }
        const identifierProvider = this.getProvider(providerName);
        const partialIdentifier = await identifierProvider.createIdentifier({ kms: args?.kms, alias: args?.alias, options: { providerName, ...args?.options } }, context);
        const identifier = { ...partialIdentifier, provider: providerName };
        if (args?.alias) {
            identifier.alias = args.alias;
        }
        await this.store.importDID(identifier);
        return identifier;
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerGetOrCreate} */
    async didManagerGetOrCreate({ provider, alias, kms, options }, context) {
        let identifier;
        try {
            identifier = await this.store.getDID({ alias });
        }
        catch {
            const providerName = provider || this.defaultProvider;
            return this.didManagerCreate({ provider: providerName, alias, kms, options }, context);
        }
        if (identifier && provider && identifier.provider !== provider) {
            if (this.getProvider(identifier.provider) !== this.getProvider(provider)) {
                throw Error(`illegal_argument: Identifier with alias: ${alias}, already exists ${identifier.did}, but was created with a different provider: ${identifier.provider}!==${provider}`);
            }
        }
        return identifier;
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerUpdate} */
    async didManagerUpdate({ did, document, options }, context) {
        /**
         * 1. Check if the identifier is already in the store
         * 2. If not, throw
         * 3. Check if provider implements updateIdentifier (handles ledger resolution logic)
         * 4. If not, throw
         * 5. If yes, execute updateIdentifier
         * 6. Update the identifier in the store
         * 7. Return the identifier
         */
        const identifier = await this.store.getDID({ did });
        const identifierProvider = this.getProvider(identifier.provider);
        if (typeof identifierProvider?.updateIdentifier !== 'function') {
            throw new Error(`not_supported: ${identifier?.provider} provider does not implement full document updates`);
        }
        const updatedIdentifier = await identifierProvider.updateIdentifier({ did, document, options }, context);
        await this.store.importDID(updatedIdentifier);
        return updatedIdentifier;
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerSetAlias} */
    async didManagerSetAlias({ did, alias }, context) {
        const identifier = await this.store.getDID({ did });
        identifier.alias = alias;
        return await this.store.importDID(identifier);
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerImport} */
    async didManagerImport(identifier, context) {
        const keys = [];
        for (const key of identifier.keys) {
            const importedKey = await context.agent.keyManagerImport(key);
            keys.push(importedKey);
        }
        const services = [...(identifier?.services || [])];
        const importedDID = {
            ...identifier,
            keys,
            services,
        };
        await this.store.importDID(importedDID);
        return importedDID;
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerDelete} */
    async didManagerDelete({ did }, context) {
        const identifier = await this.store.getDID({ did });
        const provider = this.getProvider(identifier.provider);
        await provider.deleteIdentifier(identifier, context);
        return this.store.deleteDID({ did });
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerAddKey} */
    async didManagerAddKey({ did, key, options }, context) {
        const identifier = await this.store.getDID({ did });
        const provider = this.getProvider(identifier.provider);
        const result = await provider.addKey({ identifier, key, options }, context);
        identifier.keys.push(key);
        await this.store.importDID(identifier);
        return result;
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerRemoveKey} */
    async didManagerRemoveKey({ did, kid, options }, context) {
        const identifier = await this.store.getDID({ did });
        const provider = this.getProvider(identifier.provider);
        const result = await provider.removeKey({ identifier, kid, options }, context);
        identifier.keys = identifier.keys.filter((k) => k.kid !== kid);
        await this.store.importDID(identifier);
        return result;
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerAddService} */
    async didManagerAddService({ did, service, options }, context) {
        const identifier = await this.store.getDID({ did });
        const provider = this.getProvider(identifier.provider);
        const result = await provider.addService({ identifier, service, options }, context);
        identifier.services.push(service);
        await this.store.importDID(identifier);
        return result;
    }
    /** {@inheritDoc @veramo/core-types#IDIDManager.didManagerRemoveService} */
    async didManagerRemoveService({ did, id, options }, context) {
        const identifier = await this.store.getDID({ did });
        const provider = this.getProvider(identifier.provider);
        const result = await provider.removeService({ identifier, id, options }, context);
        identifier.services = identifier.services.filter((s) => s.id !== id);
        await this.store.importDID(identifier);
        return result;
    }
}
//# sourceMappingURL=id-manager.js.map