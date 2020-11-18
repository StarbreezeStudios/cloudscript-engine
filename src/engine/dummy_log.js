'use strict';

module.exports = () => {
  const log_array = [];
  const log_function = Level => (...messages) => {
    log_array.push({Message: messages.join(" "), Level});
    console.log(...messages);
  };

  return {
    debug: log_function('Debug'),
    info: log_function('Info'),
    error: log_function('Error'),
    dump: () => log_array
  };
};
