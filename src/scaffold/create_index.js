'use strict';

const {resolve} = require('path');
const file_from_template = require('./file_from_template');

const COMPILER_TEMPLATE = './templates/index.js.template';
const COMPILER_FILE_NAME = 'index.js';
module.exports = (handlerName, options) => {
  console.info('creating handlers index');

  const handler_file_path = resolve(options.srcPath, COMPILER_FILE_NAME);
  const template_options = {handlerName, ...options};

  file_from_template(COMPILER_TEMPLATE, handler_file_path, template_options);
};
