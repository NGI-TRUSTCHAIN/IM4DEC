import yaml from 'yaml';
import { createAgentFromConfig } from './lib/agentCreator.js';
import fs from 'fs';
/**
 * Parses a yaml config file and returns a config object
 * @param filePath
 */
export const getConfig = async (filePath) => {
    let fileContent;
    // read file async
    try {
        fileContent = await fs.promises.readFile(filePath, 'utf8');
    }
    catch (e) {
        console.log('Config file not found: ' + filePath);
        console.log('Use "veramo config create" to create one');
        process.exit(1);
    }
    let config;
    try {
        config = yaml.parse(fileContent, { prettyErrors: true });
    }
    catch (e) {
        console.error(`Unable to parse config file: ${e.message} ${e.linePos}`);
        process.exit(1);
    }
    if (config?.version != 3) {
        console.error('Unsupported configuration file version:', config.version);
        process.exit(1);
    }
    return config;
};
export async function getAgent(fileName) {
    try {
        return await createAgentFromConfig(await getConfig(fileName));
    }
    catch (e) {
        console.log('Unable to create agent from ' + fileName + '.', e.message);
        process.exit(1);
    }
}
//# sourceMappingURL=setup.js.map