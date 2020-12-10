'use strict';

const {resolve, dirname, relative} = require('path');
const file_from_template = require('./file_from_template');

const HANDLER_TEMPLATE_FILE = './templates/handler.js.template';
const TEST_TEMPLATE_FILE = './templates/handler_test.js.template';
const JS_EXTENSION = '.js';


const build_test_template_options = (handlerName, options) => {
  const testPath = resolve(options.testPath, dirname(handlerName));
  const absoluteSrcPath = resolve(options.srcPath, dirname(handlerName));
  const relativeSrcPath = relative(testPath, absoluteSrcPath);
  const lowerCasedHandlerName = handlerName.charAt(0).toLowerCase() + handlerName.slice(1);

  return {
    ...options,
    handlerName,
    testPath,
    relativeSrcPath,
    lowerCasedHandlerName
  };
};

const resolve_file_path = file => src_path => {
  return resolve(src_path, file) + JS_EXTENSION;
};

module.exports = (handlerName, options) => {
  const resolve = resolve_file_path(handlerName);

  const handler_file_path = resolve(options.srcPath);
  const handler_template_options = {handlerName, ...options};
  file_from_template(HANDLER_TEMPLATE_FILE, handler_file_path, handler_template_options);

  if (options.tests) {
    const test_file_path = resolve(options.testPath);
    const test_template_options = build_test_template_options(handlerName, options);
    file_from_template(TEST_TEMPLATE_FILE, test_file_path, test_template_options);
  }
};
