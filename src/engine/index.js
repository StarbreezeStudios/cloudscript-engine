'use strict';

const local_require = require('../local_require');
const web_server = require('./web_server');
const Inspect = require('./inspect');
const Monitor = require('./monitor');
const forward_methods = require('./forward_methods');
const validators = require('./validators');

const run = (source, {title, secret, port, monitor, inspect, forwardMethod}) => {
  const forward_method = forward_methods[forwardMethod];

  const handlers = local_require(source);

  return web_server(forward_method)({title, port, secret, handlers})
    .then(() => monitor && Monitor(source))
    .then(() => inspect && Inspect());
};

module.exports = {
  validators: validators(forward_methods),
  run
};
