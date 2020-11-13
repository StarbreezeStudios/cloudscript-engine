/* global handlers, server, http, script, log, currentPlayerId, entity */

const all_handlers = require("<%= source_path %>");

const handler = f => (args, context) => {
    const globals = {server, http, log, script, currentPlayerId, entity};
    return f(globals)(args, context);
};

Object.entries(all_handlers).forEach(([name, f]) => {
    handlers[name] = handler(f);
});
