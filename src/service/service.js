'use strict';

const {Cli} = require(`./cli`);
const {ExitCode} = require(`../constants`);

const DEFAULT_COMMAND = `--info`;

const [, , ...userArguments] = process.argv;
if (!userArguments.length || !Cli[userArguments[0]]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}
Cli[userArguments[0]].run(userArguments[1]);

