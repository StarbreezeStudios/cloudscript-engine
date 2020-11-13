"use strict";

const rpc = require("sync-rpc");
const worker = rpc(__dirname + "/worker.js");

module.exports = (method, url, data, options) =>
    worker({method, url, data, options});
