import { getAgent } from './setup.js';
import { Command } from 'commander';
import { printTable } from 'console-table-printer';
const discover = new Command('discover').description('Discovery');
discover
    .command('did')
    .description('did discovery')
    .option('-q, --query <string>', 'Query string')
    .action(async (opts, cmd) => {
    const agent = await getAgent(cmd.optsWithGlobals().config);
    const response = await agent.discoverDid({ query: opts.query });
    const list = [];
    response.results.forEach((r) => {
        r.matches.forEach((m) => {
            list.push({
                provider: r.provider,
                did: m.did,
            });
        });
    });
    if (list.length > 0) {
        printTable(list);
    }
    else {
        console.log('No dids discovered');
    }
});
export { discover };
//# sourceMappingURL=discover.js.map