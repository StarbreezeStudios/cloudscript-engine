"use strict";

const cwd = process.cwd();
const path = require('path').posix;
const handlers = require(path.join(cwd, 'src'));

const assert = require("assert");
const presenter = require("./cloudscrpt_presenter");

module.exports = globals => ({
    execute_cloudscript: request => {
        assert(handlers[request.FunctionName], `No implementation for handler named ${request.FunctionName}`);

        const handler = handlers[request.FunctionName];
        const handler_result = handler(globals)(request.FunctionParameter);

        return presenter(request.FunctionName, globals.log, handler_result);
    }
});
