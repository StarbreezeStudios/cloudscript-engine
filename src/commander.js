#!/usr/bin/env node

const {version} = require('../package.json');
const { program } = require('commander');
program.version(version);
const builder = require('./builder');

program
    .command('build', 'build webpack', {executableFile: '../src/csengine-build'})
    .command('run <source>', 'run cloudscript engine web server', { executableFile: '../src/web_server' });

program.parse(process.argv);
