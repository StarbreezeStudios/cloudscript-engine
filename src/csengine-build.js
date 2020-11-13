'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const webpack = require('webpack');
const config = {
    mode: "none",
    entry: "./tmp/entry.js"
};

let main_entry_path = `../${process.argv[2]}`;
console.log('Using ', main_entry_path);

// write tmp/entry.js
let webpack_wrapper_path = path.join(__dirname, 'webpack.js');
let webpack_wrapper = fs.readFileSync(webpack_wrapper_path, {encoding: "utf-8"});
const template = _.template(webpack_wrapper);
fs.writeFileSync('./tmp/entry.js', template({main_entry_path}));

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error("Error!");
        return;
    }
    console.log('Done!')
});
