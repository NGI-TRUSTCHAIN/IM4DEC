import { AbstractIdentifierProvider } from '@veramo/did-manager';
/**
 * A DID method that uses the information stored by the DID manager to resolve
 */
export class FakeDidProvider extends AbstractIdentifierProvider {
    defaultKms;
    constructor({ defaultKms } = { defaultKms: 'local' }) {
        super();
        this.defaultKms = defaultKms;
    }
    async createIdentifier({ kms, alias, options }, context) {
        const key = await context.agent.keyManagerCreate({
            kms: kms || this.defaultKms,
            type: options?.type || 'Secp256k1',
        });
        const identifier = {
            did: 'did:fake:' + alias,
            controllerKeyId: key.kid,
            keys: [key],
            services: [],
        };
        return identifier;
    }
    async updateIdentifier(args, context) {
        throw new Error('FakeDIDProvider updateIdentifier not supported yet.');
    }
    async deleteIdentifier(identifier, context) {
        for (const { kid } of identifier.keys) {
            await context.agent.keyManagerDelete({ kid });
        }
        return true;
    }
    async addKey({ identifier, key, options }, context) {
        return { success: true };
    }
    async addService({ identifier, service, options }, context) {
        return { success: true };
    }
    async removeKey(args, context) {
        return { success: true };
    }
    async removeService(args, context) {
        return { success: true };
    }
}
export class FakeDidResolver {
    getAgent;
    force2020;
    constructor(getAgent, force2020 = false) {
        this.getAgent = getAgent;
        this.force2020 = force2020;
    }
    resolveFakeDid = async (didUrl, _parsed, _resolver, options) => {
        try {
            const contexts = new Set();
            const agent = this.getAgent();
            const identifier = await agent.didManagerGet({ did: _parsed.did });
            const did = _parsed.did;
            const verificationMethod = identifier.keys.map((key) => {
                const vm = { ...key, controller: did, id: `${did}#${key.kid}` };
                switch (key.type) {
                    case 'Secp256k1':
                        vm.type = 'EcdsaSecp256k1VerificationKey2019';
                        contexts.add('https://w3id.org/security/v2');
                        contexts.add('https://w3id.org/security/suites/secp256k1recovery-2020/v2');
                        break;
                    case 'Ed25519':
                        if (this.force2020) {
                            vm.type = 'Ed25519VerificationKey2020';
                            contexts.add('https://w3id.org/security/suites/ed25519-2020/v1');
                        }
                        else {
                            vm.type = 'Ed25519VerificationKey2018';
                            contexts.add('https://w3id.org/security/suites/ed25519-2018/v1');
                        }
                        break;
                    case 'X25519':
                        if (this.force2020) {
                            vm.type = 'X25519KeyAgreementKey2020';
                            contexts.add('https://w3id.org/security/suites/x25519-2020/v1');
                        }
                        else {
                            vm.type = 'X25519KeyAgreementKey2019';
                            contexts.add('https://w3id.org/security/suites/x25519-2019/v1');
                        }
                        break;
                    default:
                        break;
                }
                const { meta, description, kid, ...result } = vm;
                return result;
            });
            const vmIds = verificationMethod.map((vm) => vm.id);
            const service = identifier.services.map((service) => {
                service.id = `${did}#${service.id}`;
                delete service.description;
                return service;
            });
            const didResolution = {
                didResolutionMetadata: {},
                didDocument: {
                    '@context': ['https://www.w3.org/ns/did/v1', ...contexts],
                    id: did,
                    service,
                    verificationMethod,
                    keyAgreement: vmIds,
                    authentication: vmIds,
                    assertionMethod: vmIds,
                },
                didDocumentMetadata: {},
            };
            return didResolution;
        }
        catch (err) {
            return {
                didDocumentMetadata: {},
                didResolutionMetadata: { error: 'invalidDid', message: err.toString() },
                didDocument: null,
            };
        }
    };
    getDidFakeResolver() {
        return { fake: this.resolveFakeDid.bind(this) };
    }
}
//# sourceMappingURL=fake-did.js.map