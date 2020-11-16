'use strict';

const local_require = require('../local_require');
const express = require('express');
const assert = require('assert');
const bodyParser = require('body-parser');

const title = process.argv[2];
assert(title, 'No title provided');
const handlers_path = process.argv[3];
assert(handlers_path, 'No handlers file path provided');

const handlers = local_require(handlers_path);
const credentials = local_require('credentials');

const handlers_controller_injector = require('./handlers_controller_injector')(handlers);

const PORT = 3000;
const FORWARD_URL = `https://${title}.playfabapi.com`;
const secret = credentials[title];
assert(secret, `No credentials found for title ${title}`);

const injector = handlers_controller_injector(title, secret);

const app = express();
app.use(bodyParser.json());

app.post('/Client/ExecuteCloudScript', (req, res) => {
  const session_ticket = req.headers['x-authorization'];
  injector(session_ticket)
    .execute_cloudscript(req.body)
    .then(result => res.send(result))
    .catch(() => {
      res.send(502, 'Bad Gateway');
    });
});

app.post('*', (req, res) => {
  res.redirect(307, FORWARD_URL + req.url);
  console.info('redirecting to ', FORWARD_URL + req.url);
});

app.listen(PORT, () => {
  console.info(`Cloudscript Engine running at http://localhost:${PORT}`);
});
