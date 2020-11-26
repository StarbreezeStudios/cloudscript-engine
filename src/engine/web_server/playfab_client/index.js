'use strict';

const common_client = require('./common_client');

module.exports = (title, secret) => {
  const title_client = common_client(title);
  const perform_request = (path, payload) => {
    return title_client({'X-SecretKey': secret})(path, payload);
  };

  return {
    perform_request
  };
};
