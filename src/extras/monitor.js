'use strict';

const nodemon = require('nodemon');

module.exports = source => {
  nodemon({
    script: source,
    ext: 'js'
  });

  nodemon.on('start', function () {
    console.info('Monitoring changes on', source);
  }).on('quit', function () {
    console.info('Monitoring finished');
    process.exit();
  }).on('restart', function (files) {
    console.info('App restarted due to changes in: ', files);
  });
};

