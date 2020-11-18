'use strict';

const sync_server = require('./sync_server');
const dummy_log = require('./dummy_log');
const handlers_controller = require('./handlers_controller');
const playfab_client = require('./playfab_client');

module.exports = handlers => (title, secret) => session_ticket => {
  const request_player_id = () => {
    const payload = {'SessionTicket': session_ticket};
    return playfab_client(title, secret)
      .perform_request('/Server/AuthenticateSessionTicket', payload);
  };

  const execute_cloudscript = payload => {
    const server = sync_server(title, secret);
    const log = dummy_log();
    return request_player_id().then(response => {
      if (response.body.code !== 200) {
        throw(response);
      }
      const currentPlayerId = response.body.data.UserInfo.PlayFabId;
      return handlers_controller({server, log, currentPlayerId}, handlers).execute_cloudscript(payload);
    });
  };

  return {
    execute_cloudscript
  };
};
