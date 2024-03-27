class Oidc4vcController < ApplicationController
    protect_from_forgery with: :null_session
    include ApplicationHelper

    def auth_response
        session_id = params[:id]
        vp_token = params[:vp_token]
        data = JWT.decode(vp_token, nil, false)
        @store = Store.find_by_key(session_id)
        item = @store.item
        item["holder-did"] = data.first["iss"]
        @store.item = item
        @store.save

        render plain: '', #json: {"hello": "world"},
               status: 200

    end

    def auth_request
        request_id = params.permit!["id"]
        algorithm = 'EdDSA'
        oidc4vci_nonce = SecureRandom.uuid
        oidc4vci_state = SecureRandom.uuid
        oidc4vci_jti = SecureRandom.uuid

        # get from did:oyd of Issuer
        issuer_did = ENV['ISSUER_DID'] # 'did:oyd:123#doc-key'
        # private_key = RbNaCl::Signatures::Ed25519::SigningKey.new('abcdefghijklmnopqrstuvwxyzABCDEF')
        # public_key = private_key.verify_key
        private_key = RbNaCl::Signatures::Ed25519::SigningKey.new(RbNaCl::Hash.sha256(ENV['ISSUER_PWD']))
        public_key = private_key.verify_key

        oidc4vci_registration = {
            id_token_signing_alg_values_supported: [
              'EdDSA'
            ],
            request_object_signing_alg_values_supported: [
              'EdDSA'
            ],
            response_types_supported: ['id_token'],
            scopes_supported: ['openid did_authn'],
            subject_types_supported: ['pairwise'],
            subject_syntax_types_supported: ['did:oyd'],
            vp_formats: {
              jwt_vc: {
                alg: [
                  'EdDSA'
                ]
              },
              jwt_vp: {
                alg: [
                  'EdDSA'
                ]
              }
            }
        }
        oidc4vci_claims = {
            vp_token: {
                presentation_definition: {
                    id: 'sphereon',
                    purpose: 'You need to prove your Wallet Identity data',
                    submission_requirements: [{
                        name: 'Sphereon Wallet Identity',
                        rule: 'pick',
                        min: 0,
                        max: 1,
                        from: 'A'
                    }],
                    input_descriptors: [{
                        id: 'SphereonWalletId',
                        purpose: 'Checking your Sphereon Wallet information',
                        name: 'Wallet Identity',
                        group: ['A'],
                        schema: [{
                            uri: "https://sphereon-opensource.github.io/ssi-mobile-wallet/context/sphereon-wallet-identity-v1.jsonld"
                        }]
                    }]
                }
            }
        }

        header_fields = {
            alg: algorithm,
            kid: issuer_did + '#key-doc',
            typ: 'JWT'
        }
        payload = {
            iat: Time.now.to_i,
            exp: Time.now.to_i+120,
            response_type: 'id_token',
            scope: 'openid',
            client_id: issuer_did,
            redirect_uri: 'https://' + ENV['RAILS_CONFIG_HOSTS'] + '/agent/siop/definitions/sphereonWallet/auth-responses/' + request_id,
            response_mode: 'post',
            nonce: oidc4vci_nonce,
            state: oidc4vci_state,
            registration: oidc4vci_registration,
            claims: oidc4vci_claims,
            nbf: Time.now.to_i,
            jti: oidc4vci_jti,
            iss: issuer_did,
            sub: issuer_did
        }
        token = JWT.encode(payload, private_key, algorithm, header_fields)

        render plain: token,
               status: 200

    end
end