'use strict';

const forward_method = require('./forward_method');
const web_server_port = require('./web_server_port');

module.exports = forward_methods => {
  return {
    forward_method: forward_method(forward_methods),
    web_server_port
  };
};
