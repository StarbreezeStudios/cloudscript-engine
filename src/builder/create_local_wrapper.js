'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('underscore');

const create_local_wrapper = (source_path, wrapper_path) => {
  const webpack_wrapper_path = path.join(__dirname, 'webpack_wrapper_template.js');
  const webpack_wrapper = fs.readFileSync(webpack_wrapper_path, {encoding: 'utf-8'});
  const template = _.template(webpack_wrapper);
  source_path = path.resolve(source_path);
  fs.writeFileSync(wrapper_path, template({source_path}));
};

module.exports = create_local_wrapper;
