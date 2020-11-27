'use strict';

const local_require = require('../local_require');
const web_server = require('./web_server');
const Inspect = require('./inspect');
const Monitor = require('./monitor');
const forwarders = require('./forwarders');
const validators = require('./validators');

const run = (source, {title, secret, port, monitor, inspect, forwardMethod}) => {
  const forwarder = forwarders[forwardMethod];

  const handlers = local_require(source);

  return web_server(forwarder)({title, port, secret, handlers})
    .then(() => monitor && Monitor(source))
    .then(() => inspect && Inspect());
};

module.exports = {
  validators: validators(forwarders),
  run
};
