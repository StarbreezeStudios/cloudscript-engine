'use strict';

const sinon = require('sinon');
const server_commands = require('./web_server/sync_server/server_commands');

module.exports = () => {
  const server = server_commands.reduce((server, command) => {
    server[command] = sinon.stub();
    return server;
  },  {});

  return {
    server,
    log: {
      debug: sinon.stub(),
      info: sinon.stub(),
      info: sinon.stub(),
      error: sinon.stub()
    }
  };
};
