'use strict';

const express = require('./custom_express');

const server = ({title, secret, port, forward_url, handlers}) => {

  const handlers_controller_injector = require('./handlers_controller_injector')(handlers);
  const injector = handlers_controller_injector(title, secret);

  const app = express();

  app.post('/Client/ExecuteCloudScript', (req, res) => {
    const session_ticket = req.headers['x-authorization'];
    injector(session_ticket)
      .execute_cloudscript(req.body)
      .then(result => res.send(result))
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal server error. More information in cloudscript engine log.');
      });
  });

  app.post('*', (req, res) => {
    res.redirect(307, forward_url + req.url);
    console.info('redirecting to', forward_url + req.url);
  });

  app.listen(port, () => {
    console.info(`Cloudscript Engine running at http://localhost:${port}`);
  });

};

module.exports = server;
