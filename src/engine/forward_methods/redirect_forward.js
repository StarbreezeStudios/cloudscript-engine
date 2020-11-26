'use strict';

module.exports = forward_url => (req, res) => {
  res.redirect(307, forward_url + req.url);
  console.info('redirecting to', forward_url + req.url);
};
