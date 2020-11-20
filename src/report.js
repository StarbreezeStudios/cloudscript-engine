'use strict';

const report = p => p
  .then(console.info)
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

module.exports = report;
