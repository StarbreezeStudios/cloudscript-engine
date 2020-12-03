#!/usr/bin/env node
'use strict';

const secrets = require('./secret');
const report = require('./report');

const builder = require('./builder');
const engine = require('./engine');
const upload = require('./uploader');
const {
  create_compiler,
  create_handler
} = require('./scaffold');

const {version} = require('../package.json');
const {program} = require('commander');

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

const FORWARD_METHOD = [
  '-f, --forward-method <method>',
  'Forward method. Choose between redirect and proxy',
  engine.validators.forward_method,
  'redirect'
];

const WEB_SERVER_PORT = [
  '-p, --port <port>',
  'server port to use',
  engine.validators.web_server_port,
  '3000'
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
  .command('upload')
  .description('upload built bundle to PlayFab')
  .requiredOption(...TITLE)
  .option(...CREDENTIALS)
  .option(...BUNDLE)
  .action(({title, credentials, bundle}) =>
    report(upload(title, secrets(credentials, title), bundle))
      .then(() => console.info('csengine upload complete.'))
  );

program
  .command('run <source>')
  .description('run cloudscript engine server')
  .requiredOption(...TITLE)
  .option(...CREDENTIALS)
  .option(...WEB_SERVER_PORT)
  .option(...FORWARD_METHOD)
  .option('-m, --monitor', 'Watch for changes in source directory')
  .option('-i, --inspect', 'Enable debugging (Node.js inspector)')
  .action((source, {title, credentials, ...options}) => {
    const secret = secrets(credentials, title);
    report(engine.run(source, {title, secret, ...options}));
  });

program
  .command('create-handler <handler-name>')
  .description('Creates a new empty handler')
  .option('-s, --handler-path <handler-path>', 'Path where handler should be located.', './src')
  .option('-t, --test-path <test-path>', 'Path where handler should be located.', './test')
  .option('-n, --no-tests', 'Don\'t create tests for this handler', false)
  .option('-d, --double-quotes', 'Use double quotes for strings or single quotes otherwise')
  .option('-f, --force', 'Force file overwrite if already exists', false)
  .action(create_handler);

const optionUnwrap = (a, b, c) => {
  console.log();
};

program
  .command('init')
  .description('create base project structure with a sample handler and tests')
  .option('-s, --handler-path <handler-path>', 'Path where handler should be located.', './src')
  .option('-t, --test-path <test-path>', 'Path where handler should be located.', './test')
  .option('-n, --no-tests', 'Don\'t create tests for this handler', false)
  .option('-d, --double-quotes', 'Use double quotes for strings or single quotes otherwise')
  .option('-f, --force', 'Force file overwrite if already exists', false)
  .action(options => {
    create_compiler('HelloWorld', options);
    create_handler('HelloWorld', options);
  });


program.parse(process.argv);
