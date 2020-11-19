'use strict';
const {dirname, basename, resolve} = require('path');
const {promisify} = require('util');
const webpack = promisify(require('webpack'));
const create_local_wrapper = require('./create_local_wrapper');

// This path is relative to cwd
const WRAPPER_PATH = './tmp/entry.js';

module.exports = async (source, bundle_path) => {

  const config = {
    mode: 'none',
    entry: WRAPPER_PATH,
    output: {
      path: resolve(dirname(bundle_path)),
      filename: basename(bundle_path)
    }
  };

  create_local_wrapper(source, config.entry);

  return webpack(config)
    .then(stats => {
      if (stats.hasErrors()) {
        throw stats.compilation.errors;
      }
      return `Webpack bundle ${bundle_path} Done!`;
    });
};
