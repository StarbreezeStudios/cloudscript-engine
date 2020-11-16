'use strict';

const server = require('./server');

const config = require('./configuration_parser')();

server(config);
