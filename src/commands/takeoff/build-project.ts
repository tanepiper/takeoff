import { TakeoffResult, TakeoffCommand } from 'commands';
import { Task, TaskRunnerOptions } from 'task';
import { TakeoffHelpers } from 'helpers';

/**
 * Handler for building projects
 */
async function handler({
  args,
  execCommand,
  getProjectDetails,
  opts,
  rcFile,
  pathExists,
  printMessage,
  workingDir,
  silent,
}: TakeoffHelpers): Promise<TakeoffResult> {
  const { project, projectDir } = getProjectDetails(args, workingDir, rcFile);

  if (!pathExists(projectDir)) {
    return { code: 1, fail: `The project ${project} doesn't exist in ${projectDir}` };
  }

  printMessage(`Building project ${project}`);

  let cmd = `docker-compose -f docker/docker-compose.yml build`;
  if (opts['n'] || opts['no-cache']) {
    cmd = `${cmd} --no-cache`;
  }

  const cmdOptions: TaskRunnerOptions = {
    cwd: projectDir,
    fail: `Error building ${project}.`,
    silent,
    success: `Successfully built ${project}`,
    task: {
      script: cmd,
    },
  };

  return await execCommand(cmdOptions);
}

/**
 * Builds an project based on a docker-compose file
 */

const command: TakeoffCommand = {
  args: '<name>',
  command: 'build',
  description: 'Builds containers based on a docker-compose file',
  group: 'takeoff',
  handler,
  options: [
    {
      description: `Build fresh and don't use the cache`,
      option: '-n, --no-cache',
    },
  ],
};

export = command;
