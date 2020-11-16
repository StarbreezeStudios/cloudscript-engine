'use strict';

const express = require('express');
const bodyParser = require('body-parser');

module.exports = options => {
  const app = express(options);
  app.use(bodyParser.json());
  return app;
};
