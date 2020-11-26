'use strict';

const nodemon = require('nodemon');

module.exports = source => new Promise(resolve => {
  nodemon({
    script: source,
    ext: 'js'
  });

  nodemon
    .once('start', () => {
      resolve();
    })
    .on('start', () => {
      console.info('Monitoring changes on', source);
    })
    .on('quit', () => {
      console.info('Monitoring finished');
      process.exit();
    })
    .on('restart', files => {
      console.info('App restarted due to changes in: ', files);
    });
});

