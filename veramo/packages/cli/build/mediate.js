import { Command } from 'commander';
import inquirer from 'inquirer';
import { getAgent } from './setup.js';
const ALLOW = 'ALLOW';
const DENY = 'DENY';
/**
 * private functions
 **/
const updatePolicies = async (options) => {
    const { dids, agent, policy, remove = false } = options;
    if (remove) {
        return dids.forEach(async (requesterDid) => await agent.mediationManagerRemoveMediationPolicy({ requesterDid }));
    }
    if (!policy)
        throw new Error('No policy provided');
    return dids.forEach(async (requesterDid) => await agent.mediationManagerSaveMediationPolicy({ requesterDid, policy }));
};
const promptForDids = async (action) => {
    const { dids } = await inquirer.prompt({
        type: 'input',
        name: 'dids',
        message: `Enter the dids you want to ${action.toLowerCase()} separated by spaces:`,
    });
    return dids.split(' ');
};
function handler(action) {
    return async (options, cmd) => {
        const agent = await getAgent(cmd.optsWithGlobals().config);
        /**
         * NOTE: check if the mediation-manager plugin is configured
         **/
        if ('isMediateDefaultGrantAll' in agent)
            return await action(options, cmd, agent);
        console.log('[warning] it appears that the Mediation Manager plugin is not configured.');
        console.log('[tip] refer to the README (packages/mediation-manager/README.md) for guidance. \n');
        throw new Error('[error] Mediation Manager not configured!');
    };
}
/**
 * cli action functions
 **/
const policy = (policy) => {
    return async function ({ fileJson, interactive }, cmd, agent) {
        try {
            if (fileJson && interactive)
                throw new Error('Please specify only one input method');
            if (fileJson) {
                const jsonData = await import(fileJson, { assert: { type: 'json' } });
                const dids = jsonData.default;
                await updatePolicies({ dids, agent, policy });
            }
            else if (interactive) {
                const dids = await promptForDids(policy);
                await updatePolicies({ dids, agent, policy });
            }
            else {
                const dids = cmd.args;
                await updatePolicies({ dids, agent, policy });
            }
            console.log('Mediation policies updated');
        }
        catch (e) {
            console.error(e.message);
        }
    };
};
const readPolicies = async (options, cmd, agent) => {
    let dids;
    if (options.interactive)
        dids = await promptForDids('read');
    else if (options.fileJson)
        dids = (await import(options.fileJson, { assert: { type: 'json' } })).default;
    else
        dids = cmd.args;
    if (!dids || !dids.length)
        throw new Error('No dids provided');
    const policies = {};
    for await (const requesterDid of dids) {
        policies[requesterDid] = await agent.mediationManagerGetMediationPolicy({ requesterDid });
    }
    console.log('POLICIES');
    console.table(policies);
};
const listPolicies = async (options, _cmd, agent) => {
    try {
        const res = await agent.mediationManagerListMediationPolicies();
        console.log('POLICIES');
        if (options.allowFrom)
            return console.table(Object.entries(res).filter(([, policy]) => policy === ALLOW));
        if (options.denyFrom)
            return console.table(Object.entries(res).filter(([, policy]) => policy === DENY));
        else
            console.table(res);
    }
    catch (e) {
        console.error(e.message);
    }
};
const listResponses = async (options, _cmd, agent) => {
    try {
        const { granted, denied } = options;
        const res = await agent.mediationManagerGetAllMediations();
        console.log('MEDIATIONS');
        if (granted)
            return console.table(Object.entries(res).filter(([, response]) => response === 'GRANTED'));
        if (denied)
            return console.table(Object.entries(res).filter(([, response]) => response === 'DENIED'));
        else
            console.table(res);
    }
    catch (e) {
        console.error(e.message);
    }
};
const removePolicies = async (options, cmd, agent) => {
    try {
        if (options.fileJson) {
            const jsonData = await import(options.fileJson, { assert: { type: 'json' } });
            const dids = jsonData.default;
            await updatePolicies({ dids, remove: true, agent });
        }
        else if (options.interactive) {
            const dids = await promptForDids('Remove');
            await updatePolicies({ dids, remove: true, agent });
        }
        else {
            const dids = cmd.args;
            await updatePolicies({ dids, remove: true, agent });
        }
        console.log('Mediation policies removed');
    }
    catch (e) {
        console.error(e.message);
    }
};
const mediate = new Command('mediate').description('Mediate allow or deny policy on dids').addHelpText('before', `
    IMPORTANT! in order to use the commands below, you need to configure the Mediate Manager in your agent.yml',
    see the README (packages/mediation-manager/README.md) for guidance.
  `);
mediate
    .command('allow-from')
    .description('add dids that should be allowed for mediation')
    .option('-f, --file-json <string>', 'read dids from json file')
    .option('-i, --interactive', 'interactively input dids')
    .action(handler(policy(ALLOW)));
mediate
    .command('deny-from')
    .description('deny dids that should be denied for mediation')
    .option('-f, --file-json <string>', 'read dids from json file')
    .option('-i, --interactive', 'interactively input dids')
    .action(handler(policy(DENY)));
mediate
    .command('read')
    .description('read mediation policy for a specific did (or list of dids)')
    .option('-i, --interactive', 'interactively input dids')
    .option('-f, --file-json <string>', 'read dids from json file')
    .action(handler(readPolicies));
mediate
    .command('list-policies')
    .description('list mediation policies')
    .option('-a, --allow-from', 'list allow policies')
    .option('-d, --deny-from', 'list deny policies')
    .action(handler(listPolicies));
mediate
    .command('list-responses')
    .description('list mediation responses')
    .option('-a, --granted', 'list granted policies')
    .option('-d, --denied', 'list denied policies')
    .action(handler(listResponses));
mediate
    .command('remove')
    .description('remove mediation policies')
    .option('-f, --file-json <string>', 'read dids from json file')
    .option('-i, --interactive', 'interactively input dids')
    .action(handler(removePolicies));
export { mediate };
//# sourceMappingURL=mediate.js.map