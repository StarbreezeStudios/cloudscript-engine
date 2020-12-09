'use strict';

const {template} = require('lodash');
const {dirname, resolve} = require('path');
const {
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync
} = require('fs');

const check_file_exists = (dst_path, {force}) => {
  if (existsSync(dst_path) && !force) {
    throw(`file ${dst_path} already exists`);
  }
};

const read_template = path => readFileSync(resolve(__dirname, path));

const write_file = (dst_path, string) => {
  mkdirSync(dirname(dst_path), {recursive: true});
  writeFileSync(dst_path, string);
};

const compile_template = (options, template_buffer) => {
  let compiled = template(template_buffer)(options);

  if(options.doubleQuotes) {
    return compiled.replace(/'/g, '"');
  }

  return compiled;
};

module.exports = (template_file, dst_path, options) => {
  check_file_exists(dst_path, options);

  const template_buffer = read_template(template_file);
  const compiled = compile_template(options, template_buffer);

  write_file(dst_path, compiled);
};

