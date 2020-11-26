'use strict';

const needle = require('./sync-needle');

const sync_playfab_client = (title, secret) => command => input => {
  const api = `https://${title}.playfabapi.com/Server/`;
  const url = api + command;
  const res = needle('POST', url, input, {
    json: true,
    headers: {
      'X-SecretKey': secret
    }
  });
  const body = res.body;
  if (body.code !== 200) {
    throw new Error(`PlayFab returned an error: ${JSON.stringify(body)}`);
  }
  return body.data;
};

module.exports = sync_playfab_client;
