import express from 'express';
import { Command } from 'commander';
import { getConfig } from './setup.js';
import { createObjects } from './lib/objectCreator.js';
const server = new Command('server')
    .description('Launch OpenAPI server')
    .option('-p, --port <number>', 'Optionally set port to override config')
    .action(async (opts, cmd) => {
    const app = express();
    let server;
    try {
        const config = await createObjects(await getConfig(cmd.optsWithGlobals().config), { server: '/server' });
        server = config.server;
    }
    catch (e) {
        console.error(e.message);
        process.exit(1);
    }
    for (let router of server.use) {
        app.use(...router);
        if (typeof router[0] === 'string') {
            console.log(`Listening to route: ${server.baseUrl}${router[0]}`);
        }
    }
    app.listen(opts.port || server.port, async () => {
        console.log(`🚀 Cloud Agent ready at ${server.baseUrl}`);
    });
});
export { server };
//# sourceMappingURL=server.js.map