/**
 * This plugin can be used to access the methods of a remote Veramo agent as if they were implemented locally.
 *
 * The remote agent should be provided by {@link @veramo/remote-server#AgentRouter | AgentRouter}, or a similar
 * implementation of this API.
 *
 * The schema of the remote agent is usually provided by {@link @veramo/remote-server#ApiSchemaRouter |
 * ApiSchemaRouter}.
 *
 * @public
 */
export class AgentRestClient {
    methods = {};
    schema;
    url;
    constructor(options) {
        this.url = options.url;
        this.schema = options.schema;
        for (const method of options.enabledMethods) {
            this.methods[method] = async (args) => {
                const res = await fetch(this.url + '/' + method, {
                    headers: { ...options.headers, 'Content-Type': 'application/json' },
                    method: 'post',
                    body: JSON.stringify(args),
                });
                const json = await res.json();
                if (res.status >= 400) {
                    throw Error(json.error);
                }
                return json;
            };
        }
    }
}
//# sourceMappingURL=client.js.map