'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const express_bunyan_logger = require('express-bunyan-logger');

const build_logger_options = () => {
  const timestamp = Date.now();
  return {
    name: timestamp.toString(),
    streams: [{
      path: `logs/${timestamp}.log`,
    }]
  };
};

module.exports = options => {
  const app = express(options);
  const logger_options = build_logger_options();

  app.use(bodyParser.json());
  app.use(express_bunyan_logger(logger_options));

  return app;
};
