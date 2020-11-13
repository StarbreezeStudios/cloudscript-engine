'use strict';

const cwd = process.cwd();
const path = require('path').posix;

module.exports = module => require(path.join(cwd, module));
