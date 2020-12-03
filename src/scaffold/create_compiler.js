'use strict';

const {resolve} = require('path');
const file_from_template = require('./file_from_template');

const COMPILER_TEMPLATE = './templates/index.js.template';
const COMPILER_FILE_NAME = 'index.js';
module.exports = (handlerName, {handlerPath}) => {

  console.info('creating handlers index ...');

  const handler_file_path = resolve(handlerPath, COMPILER_FILE_NAME);

  const template_options = {handlerName};

  file_from_template(COMPILER_TEMPLATE, handler_file_path, template_options);
};
