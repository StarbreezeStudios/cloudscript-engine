'use strict';

module.exports = port => {
  const parsed_port = parseInt(port);
  if (Number.isNaN(parsed_port)) {
    const error_message = `Error: ${port} is not a valid web server port`;
    throw(error_message);
  }

  return parsed_port;
};
