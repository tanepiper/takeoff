import chalk from 'chalk';
import { normalize } from 'path';
import fg from 'fast-glob';
import { TakeoffCmdParameters } from 'takeoff';
import { TakeoffCommand } from 'commands';

/**
 * Load plugins from the basePath. Will attempt to load both Typescript and JavaScript plugins
 * Returns a map of plugins with the key as the command and value as the plugin object
 */
export = async (cwdList: string[], params: TakeoffCmdParameters): Promise<Map<string, TakeoffCommand>> => {
  const commandMap: Map<string, TakeoffCommand> = new Map<string, TakeoffCommand>();

  for (const cwd of cwdList) {
    const commandPath = normalize(cwd);

    let commandPaths = [];
    try {
      commandPaths = await fg([`**/*.js`, `**/*.ts`], {
        cwd: cwd,
        ignore: [`**/*.spec.js`, `**/*spec.js`, `**/*.d.ts`],
      });
    } catch (e) {
      throw e;
    }

    commandPaths.forEach((path: string) => {
      const requirePath = `${commandPath}/${path}`;
      try {
        const plugin: TakeoffCommand = require(requirePath)(params);
        commandMap.set(`${plugin.group}:${plugin.command}`, plugin);
      } catch (e) {
        console.error(e);
        throw new Error(`${chalk.red('[Takeoff]')} Unable to load command ${chalk.cyan(`${requirePath}`)}`);
      }
    });
  }
  return commandMap;
};