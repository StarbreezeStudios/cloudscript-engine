'use strict';

module.exports = forward_methods => {
  const available_methods = Object.keys(forward_methods).join(', ');

  return forward_method => {
    if (!forward_methods[forward_method]) {
      const error_message = `Error: no such forward method: '${forward_method}'. Choose between [${available_methods}]`;
      throw(error_message);
    }

    return forward_method;
  };
};

