'use strict';

const {expect} = require('chai');

const web_server_port = require('../../src/engine/validators/web_server_port');

describe('web_server_port validator', () => {

  it('Should throw an exception if port is not an integer', () => {
    const port = 'some_invalid_port';
    const call = () => {
      web_server_port(port);
    };

    expect(call).to.throw(`Error: ${port} is not a valid web server port`);
  });

  it('Should return port if valid', () => {
    const port = 3000;

    expect(web_server_port(port)).be.equal(port);
  });

});
