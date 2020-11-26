'use strict';

const {expect} = require('chai');

const forward_method = require('../../src/engine/validators/forward_method');

const forward_methods = {
  redirect: () => {},
  proxy: () => {}
};

describe('forward_method validator', () => {

  it('Should throw an exception if forward_method is not among valid values', () => {
    const method = 'invalid_method';
    const call = () => {
      forward_method(forward_methods)(method);
    };

    expect(call).to.throw(`Error: no such forward method: '${method}'. Choose between [redirect, proxy]`);
  });

  it('Should return value if among valid values', () => {
    const method = 'redirect';

    expect(forward_method(forward_methods)(method)).be.equal(method);
  });

});
