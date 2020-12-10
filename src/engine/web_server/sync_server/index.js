'use strict';

// This list of commands has been extracted from PlayFabSDK for C#
const commands = require('./server_commands');
const SyncPlayfabClient = require('./sync_playfab_client');

const sync_server = (title, secret) => {
  const playfab = SyncPlayfabClient(title, secret);

  const server = {};
  commands.forEach(command => {
    server[command] = playfab(command);
  });

  return server;
};

module.exports = sync_server;
