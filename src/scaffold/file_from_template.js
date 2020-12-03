'use strict';

const _ = require('lodash');
const {dirname, resolve, relative} = require('path');
const fs = require('fs');

const create_path = path => {
  fs.mkdirSync(path, {recursive: true});
};

const QUOTE_CHARACTER_SINGLE = '\'';
const QUOTE_CHARACTER_DOUBLE = '"';

module.exports = (template_file, dst_path, options) => {
  options.relative = relative;
  options.dirname = dirname;

  if (fs.existsSync(dst_path) && !options.force) {
    throw(`file ${dst_path} already exists`);
  }

  create_path(dirname(dst_path));
  const quote_character = options.doubleQuotes ? QUOTE_CHARACTER_DOUBLE : QUOTE_CHARACTER_SINGLE;
  const template_buffer = fs.readFileSync(resolve(__dirname, template_file));

  let compiled = _
    .template(template_buffer)(options)
    .replace(/'/g, quote_character);
  fs.writeFileSync(dst_path, compiled);
  //console.log(compiled);
};

