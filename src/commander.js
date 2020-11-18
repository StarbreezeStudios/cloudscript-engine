#!/usr/bin/env node
'use strict';

const local_require = require('./local_require');
const secret = title => {
  let secrets;
  try {
    secrets = local_require('credentials.json');
  } catch(e) {
    console.error('Local credentials.json file missing.');
    process.exit(1);
  }
  return secrets[title];
};

const builder = require('./builder');
const engine = require('./engine');
const upload = require('./uploader');

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
  .command('run <title> <source>')
  .description('run cloudscript engine server')
  .action((title, source) => {
    const PORT = 3000;
    const handlers = local_require(source);
    const forward_url = `https://${title}.playfabapi.com`;
    return engine({
      title,
      secret: secret(title),
      port: PORT,
      forward_url,
      handlers
    });
  });

program
  .command('upload <title> [bundle_path]')
  .description('upload built bundle to PlayFab')
  .action((title, bundle_path = 'dist/main.js') =>
    report(upload(title, secret(title), bundle_path))
  );

program.parse(process.argv);
