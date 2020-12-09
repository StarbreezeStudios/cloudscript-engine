#!/usr/bin/env node
'use strict';

const secrets = require('./secret');
const report = require('./report');

const builder = require('./builder');
const engine = require('./engine');
const upload = require('./uploader');
const {
  create_base_project,
  create_handler,
  compile_handlers
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

const SCAFFOLD_OPTIONS = [
  ['-s, --src-path <handler-path>', 'Path where handlers should be located.', './src'],
  ['-t, --test-path <test-path>', 'Path where tests should be located.', './test'],
  ['-n, --no-tests', 'Don\'t create tests for this handler', false],
  ['-d, --double-quotes', 'Use double quotes for strings. Single quotes by default'],
  ['-f, --force', 'Force file overwrite if already exists', false]
];

const unroll_options = options => program => {
  options.forEach(args => program.option(...args));
  return program;
};

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

unroll_options(SCAFFOLD_OPTIONS)(
  program
    .command('create-handler <handler-name>')
    .description('Creates a new empty handler')
).action(create_handler);

unroll_options(SCAFFOLD_OPTIONS)(
  program
    .command('init')
    .description('Creates base project structure with a sample handler and its tests')
).action(create_base_project);

program.parse(process.argv);
