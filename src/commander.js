#!/usr/bin/env node
'use strict';

const local_require = require('./local_require');
const secret = local_require('credentials.json');
const upload = require('./uploader/upload');
const builder = require('./builder');

const { version } = require('../package.json');
const { program } = require('commander');

const report = p => p
  .then(console.info)
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

program.version(version);

program
  .command('build <source> [bundle_path]')
  .description('build webpack bundle')
  .action((source, bundle_path = 'dist/main.js') =>
    report(builder(source, bundle_path))
  );

program
  .command('run <title> <source>', 'run cloudscript engine server', { executableFile: '../src/engine/index' });

program
  .command('upload <title> [bundle_path]')
  .description('upload built bundle to PlayFab')
  .action((title, bundle_path = 'dist/main.js') =>
    report(upload(title, secret[title], bundle_path))
  );

program.parse(process.argv);
