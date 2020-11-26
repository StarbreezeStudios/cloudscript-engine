'use strict';

const needle = require('needle');

const FORWARD_HEADERS = [
  'x-entitytoken',
  'x-authorization'
];

const propagate_header = (src, dest) => header => {
  if (src[header]) {
    dest[header] = src[header];
  }
};

module.exports = forward_url => (req, res) => {
  const url = forward_url + req.url;

  const method = req.method;
  const headers = {};
  const options = {headers, json: true};

  FORWARD_HEADERS.forEach(propagate_header(req.headers, headers));

  needle(method, url, req.body, options)
    .then(({statusCode, body}) => {
      res
        .status(statusCode)
        .send(body);
    });
};
