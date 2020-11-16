'use strict';

const {expect} = require('./util/chai');
const presenter = require('../src/engine/cloudscrpt_presenter');

describe('cloudscript presenter', () => {

  it('should convert handler result to cloudscript response format', () => {
    const log = {
      dump: () => [
        {Level: 'Debug', Message: 'Some debug message'},
        {Level: 'Info', Message: 'Some info message'}
      ]
    };

    const handler_result = 'Ok';
    const function_name = 'WebpackTest';

    const result = presenter(function_name, log, handler_result);

    expect(result).to.be.deep.equal({
      code: 200,
      status: 'OK',
      data: {
        FunctionName: 'WebpackTest',
        Revision: -1,
        FunctionResult: 'Ok',
        ExecutionTimeSeconds: 0.0,
        ProcessorTimeSeconds: 0.0,
        MemoryConsumedBytes: 0,
        APIRequestsIssued: 1,
        HttpRequestsIssued: 0,
        Logs: [
          {Level: 'Debug', Message: 'Some debug message'},
          {Level: 'Info', Message: 'Some info message'}
        ]
      }
    });
  });

});
