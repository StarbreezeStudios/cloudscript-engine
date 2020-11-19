#!/usr/bin/env node
'use strict';

const local_require = require('./local_require');
const secret = local_require('credentials.json');
const upload = require('./uploader/upload');

const { version } = require('../package.json');
const { program } = require('commander');

program.version(version);

program
  .command('build <source>', 'build webpack', {executableFile: '../src/builder/index'})
  .command('run <title> <source>', 'run cloudscript engine server', { executableFile: '../src/engine/index' });

program
  .command('upload <title> [bundle_path]')
  .description('upload built bundle to PlayFab')
  .action((title, bundle_path = 'dist/main.js') =>
    upload(title, secret[title], bundle_path)
      .then(console.info)
      .catch(error => {
        console.error(error);
        process.exit(1);
      }));

program.parse(process.argv);
