'use strict';

const {resolve, dirname, relative} = require('path');
const file_from_template = require('./file_from_template');

const HANDLER_TEMPLATE_FILE = './templates/handler.js.template';
const TEST_TEMPLATE_FILE = './templates/handler_test.js.template';
const JS_EXTENSION = '.js';


const build_test_template_options = (handlerPath, options) => {
  const handlerName = handlerPath.replace(dirname(handlerPath) + '/', '');
  const testPath = resolve(options.testPath, dirname(handlerPath));
  const absoluteHandlerPath = resolve(options.handlerPath, dirname(handlerPath));
  const relativeHandlerPath = relative(testPath, absoluteHandlerPath);
  const lowerCasedHandlerName = handlerName.slice(0, 1).toLowerCase() + handlerName.slice(1);

  return {
    ...options,
    handlerName,
    lowerCasedHandlerName,
    relativeHandlerPath,
    testPath
  };
};

module.exports = (handlerName, options) => {
  console.info('creating handler', handlerName, '...');

  const handler_file_path = resolve(options.handlerPath, handlerName) + JS_EXTENSION;
  const handler_template_options = options;
  file_from_template(HANDLER_TEMPLATE_FILE, handler_file_path, handler_template_options);

  if (options.tests) {
    const test_file_path = resolve(options.testPath, handlerName) + JS_EXTENSION;
    const test_template_options = build_test_template_options(handlerName, options);
    file_from_template(TEST_TEMPLATE_FILE, test_file_path, test_template_options);
  }
};
