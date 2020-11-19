'use strict';

const {promisify} = require('util');
const readFile = promisify(require('fs').readFile);
const needle = require('needle');

const HTTP_METHOD = 'POST';

module.exports = async (title, secret, file_path) => {
  const file_content = await readFile(file_path, {encoding: 'utf-8'});

  const payload = {
    'Files': [{
      'FileContents': file_content,
      'FileName': file_path
    }],
    'Publish': true
  };

  const headers = {
    'X-SecretKey': secret
  };

  const options = {
    headers,
    json: true
  };

  const upload_url = `https://${title}.playfabapi.com/Admin/UpdateCloudScript`;
  return needle(HTTP_METHOD, upload_url, payload, options)
    .then(res => {
      if(res.statusCode !== 200) {
        throw(res.body);
      }
      return res.body;
    });
};
