#!/usr/bin/env node
'use strict';

const { version } = require('../package.json');
const { program } = require('commander');

program.version(version);

program
  .command('build <source>', 'build webpack', {executableFile: '../src/builder/index'})
  .command('run <title>', 'run cloudscript engine server', { executableFile: '../src/engine/index' });

program.parse(process.argv);
