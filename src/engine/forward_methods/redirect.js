'use strict';

module.exports = forward_url => (req, res) => {
  const url = forward_url + req.url;
  console.info('redirecting to', url);

  res.redirect(307, url);
};
