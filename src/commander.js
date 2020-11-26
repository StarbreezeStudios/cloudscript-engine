#!/usr/bin/env node
'use strict';

const local_require = require('./local_require');
const secrets = require('./secret');
const report = require('./report');

const builder = require('./builder');
const engine = require('./engine');
const upload = require('./uploader');
const extras = require('./extras');

const { version } = require('../package.json');
const { program } = require('commander');

const TITLE = [
  '-t, --title <title>',
  'PlayFab title'
];

const CREDENTIALS = [
  '-c, --credentials <credentials>',
  'Credentials file where PlayFab secret tokens is stored.',
  'credentials.json'
];

const BUNDLE = [
  '-b, --bundle <bundle_path>',
  'Webpack bundle',
  'dist/main.js'
];

program
  .version(version);

program
  .command('build <source>')
  .description('build webpack bundle')
  .option(...BUNDLE)
  .action((source, {bundle}) =>
    report(builder(source, bundle))
      .then(() => console.info('csengine build done.'))
  );

program
  .command('run <source>')
  .description('run cloudscript engine server')
  .requiredOption(...TITLE)
  .option(...CREDENTIALS)
  .option('-p, --port <port>', 'server port to use', '3000')
  .option('-m, --monitor', 'Watch for changes in source directory')
  .option('-i, --inspect', 'Enable debugging (Node.js inspector)')
  .action((source, {title, port, credentials, monitor, inspect}) => {
    if(monitor) {
      extras.monitor(source);
    }

    if(inspect) {
      extras.inspect();
    }

    const handlers = local_require(source);
    const secret = secrets(credentials, title);
    return engine({title, secret, port, handlers});
  });

program
  .command('upload')
  .description('upload built bundle to PlayFab')
  .requiredOption(...TITLE)
  .option(...CREDENTIALS)
  .option(...BUNDLE)
  .action(({title, credentials, bundle}) =>
    report(upload(title, secrets(credentials, title), bundle))
      .then(() => console.info('csengine upload complete.'))
  );

program.parse(process.argv);
