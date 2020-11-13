'use strict';

const cwd = process.cwd();
const path = require('path').posix;

module.exports = file_name => require(path.join(cwd, file_name));
