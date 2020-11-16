'use strict';

const common_client = require('./common_client');
const EXEC_CLOUDSCRIPT_PATH = '/Client/ExecuteCloudScript';

module.exports = title => session_ticket => {
  const title_client = common_client(title);
  const execute_cloudscript = payload => {
    return title_client({'x-authorization': session_ticket})(EXEC_CLOUDSCRIPT_PATH, payload)
      .then(res => res.body);
  };

  return {
    execute_cloudscript
  };
};
