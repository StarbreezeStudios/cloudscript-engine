'use strict';

const local_require = require('../local_require');
const web_server = require('./web_server');
const inspect = require('./inspect');
const monitor = require('./monitor');
const forward_methods = require('./forward_methods');
const validators = require('./validators');

const run = secrets => (source, {title, port, credentials, ...options}) => {
  const forward_method = forward_methods[options.forwardMethod];

  const handlers = local_require(source);
  const secret = secrets(credentials, title);

  return web_server(forward_method)({title, port, secret, handlers})
    .then(() => options.monitor && monitor(source))
    .then(() => options.inspect && inspect());
};

module.exports = {
  validators: validators(forward_methods),
  run
};
