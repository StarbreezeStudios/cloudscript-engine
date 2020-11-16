'use strict';

const assert = require('assert');
const local_require = require('../local_require');

module.exports = () => {
  const [, , title, source] = process.argv;
  assert(title, 'No title provided');
  assert(source, 'No handlers file path provided');

  const handlers = local_require(source);
  const credentials = local_require('credentials');

  const PORT = 3000;
  const forward_url = `https://${title}.playfabapi.com`;
  const secret = credentials[title];
  assert(secret, `No credentials found for title ${title}`);

  return {
    title,
    secret,
    port: PORT,
    forward_url,
    handlers
  };
};
