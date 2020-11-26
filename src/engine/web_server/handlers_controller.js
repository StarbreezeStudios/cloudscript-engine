'use strict';

const assert = require('assert');
const presenter = require('./cloudscript_presenter');

module.exports = (globals, handlers) => ({
  execute_cloudscript: request => {
    assert(handlers[request.FunctionName], `No implementation for handler named ${request.FunctionName}`);

    const handler = handlers[request.FunctionName];
    const handler_result = handler(globals)(request.FunctionParameter);

    return presenter(request.FunctionName, globals.log, handler_result);
  }
});
