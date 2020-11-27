'use strict';

const express = require('./custom_express');
const handlers_controller_injector = require('./handlers_controller_injector');

const index = ({title, secret, port, handlers, forwarder}) => {

  const controller = handlers_controller_injector(handlers)(title, secret);

  const app = express();

  app.post('/Client/ExecuteCloudScript', (req, res) => {
    const session_ticket = req.headers['x-authorization'];
    controller(session_ticket)
      .execute_cloudscript(req.body)
      .then(result => res.send(result))
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal server error. More information in cloudscript engine log.');
      });
  });

  const forward_url = `https://${title}.playfabapi.com`;
  app.post('*', forwarder(forward_url));

  return new Promise(resolve => {
    app.listen(port, () => {
      console.info(`Cloudscript Engine running at http://localhost:${port}`);
      return resolve();
    });
  });
};

module.exports = index;
