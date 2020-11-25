'use strict';
const {dirname, basename, resolve, join} = require('path');
const {promisify} = require('util');
const webpack = promisify(require('webpack'));

const webpack_wrapper = resolve(join(__dirname, 'webpack_wrapper.js'));

module.exports = async (source, bundle_path) => {

  const config = {
    mode: 'none',
    entry: webpack_wrapper,
    resolve: {
      alias: {
        Handlers: resolve(source)
      }
    },
    output: {
      path: resolve(dirname(bundle_path)),
      filename: basename(bundle_path)
    }
  };

  return webpack(config)
    .then(stats => {
      if (stats.hasErrors()) {
        throw stats.compilation.errors;
      }
      return `cloudscript-engine created bundle: ${bundle_path}!`;
    });
};
