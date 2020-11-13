'use strict';

const assert = require('assert');
const webpack = require('webpack');
const create_local_wrapper = require('./create_local_wrapper')

// This path is relative to cwd
const WRAPPER_PATH = './tmp/entry.js';

const webpack_config = {
    mode: 'none',
    entry: WRAPPER_PATH
};

const handlers = process.argv[2];
assert(handlers, 'Handlers source must be provided.');

create_local_wrapper(handlers, WRAPPER_PATH);

webpack(webpack_config, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error('Error!', stats);
        return;
    }
    console.log('Webpack Done!')
});
