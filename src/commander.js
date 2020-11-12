#!/usr/bin/env node

const {version} = require('../package.json');
const { program } = require('commander');
program.version(version);

program
    .command('build <source>', 'build webpack bundle', {executableFile: ''})
    .command('run <source>', 'run cloudscript engine web server', { executableFile: '../src/web_server' });

program.parse(process.argv);
