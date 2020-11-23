/* global handlers, server, http, script, log, currentPlayerId, entity */
'use strict';

const all_handlers = require('Handlers');

const handler = f => (args, context) => {
  const globals = {server, http, log, script, currentPlayerId, entity};
  return f(globals)(args, context);
};

Object.entries(all_handlers).forEach(([name, f]) => {
  handlers[name] = handler(f);
});
