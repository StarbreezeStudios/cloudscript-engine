'use strict';

const create_handler = require('./create_handler');
const create_index = require('./create_index');

const SAMPLE_HANDLER_NAME = 'HelloWorld';

module.exports = options => {
  create_handler(SAMPLE_HANDLER_NAME, options);
  create_index(SAMPLE_HANDLER_NAME, options);
};
