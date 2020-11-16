'use strict';

module.exports = () => {
  const log_array = [];
  const log_function = Level => Message => log_array.push({Message, Level});

  return {
    debug: log_function('Debug'),
    info: log_function('Info'),
    error: log_function('Error'),
    dump: () => log_array
  };
};
