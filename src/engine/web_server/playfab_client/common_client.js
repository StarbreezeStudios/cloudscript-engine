'use strict';

const needle = require('needle');
const HTTP_METHOD = 'POST';

module.exports = title => headers => {
  const forward_url = `https://${title}.playfabapi.com`;
  return (path, payload) => {
    const options = {
      headers,
      json: true,
      rejectUnauthorized: false
    };
    console.warn(HTTP_METHOD, forward_url + path, payload, options);
    return needle(HTTP_METHOD, forward_url + path, payload, options);
  };
};
