'use strict';

const {expect} = require('./util/chai');
const dummy_log = require('../src/engine/web_server/dummy_log');

describe('dummy_log', () => {

  it('Should store logs by level and dump them when requested', () => {
    const log = dummy_log();
    log.debug('Some debug here');
    log.info('Some info here 1');
    log.info('Some info here 2');
    log.error('Some error here');

    expect(log.dump()).to.be.deep.equal([
      {Level: 'Debug', Message: 'Some debug here'},
      {Level: 'Info', Message: 'Some info here 1'},
      {Level: 'Info', Message: 'Some info here 2'},
      {Level: 'Error', Message: 'Some error here'}
    ]);
  });

});
