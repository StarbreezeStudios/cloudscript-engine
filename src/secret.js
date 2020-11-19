'use strict';

const local_require = require('./local_require');

const secret = (credentials, title) => {
  let secrets;
  try {
    secrets = local_require(credentials);
  } catch(e) {
    console.error(`Local ${credentials} file missing.`);
    console.error('To authenticate with PlayFab a credentials file is needed. See documentation.');
    process.exit(1);
  }
  return secrets[title];
};

module.exports = secret;
