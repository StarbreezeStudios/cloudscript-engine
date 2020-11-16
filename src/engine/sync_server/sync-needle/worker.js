'use strict';

const needle = require('needle');

const init = () =>
  ({method, url, data, options}) =>
    needle(method, url, data, options)
      .then(({headers, complete, statusCode, statusMessage, body, bytes}) => {
        return {headers, complete, statusCode, statusMessage, body, bytes};
      });

module.exports = init;
