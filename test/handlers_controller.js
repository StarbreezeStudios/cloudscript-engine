'use strict';

const {expect} = require('./util/chai');
const build_fake_globals = require('./util/build_base_fake_globals');
const handlers_controller = require('../src/engine/handlers_controller');
const dummy_log = require('../src/engine/dummy_log');

const handlers = require('./fixtures/handlers');

describe('Handlers controller', function () {

  it('Should throw an exception if handler is not found', async () => {
    const globals = {...build_fake_globals(), log: dummy_log()};
    const controller = handlers_controller(globals, handlers);
    const FunctionName = 'WrongHandlerName';

    const request = {
      FunctionName
    };

    const call = () => controller.execute_cloudscript(request);

    expect(call).to.throw(`No implementation for handler named ${FunctionName}`);
  });

  it('Should perform call against playfab api through handlers controller', async () => {
    const globals = {...build_fake_globals(), log: dummy_log()};
    const controller = handlers_controller(globals, handlers);
    globals.server.GetUserAccountInfo.returns({
      UserInfo: {
        TitleInfo: {
          DisplayName: 'MY_DISPLAY_NAME'
        }
      }
    });

    const request = {
      FunctionName: 'SimpleTestHandler',
      GeneratePlayStreamEvent: true,
      FunctionParameter: {
        param_1_key: 'param_1_value',
        param_2_key: 'param_1_value'
      }
    };

    const response = controller.execute_cloudscript(request);

    expect(response).to.be.deep.equal({
      code: 200,
      data: {
        APIRequestsIssued: 1,
        ExecutionTimeSeconds: 0,
        FunctionName: 'SimpleTestHandler',
        FunctionResult: 'Ok',
        HttpRequestsIssued: 0,
        Logs: [
          {
            Level: 'Debug',
            Message: 'currentPlayerId: undefined'
          },
          {
            Level: 'Debug',
            Message: 'userInfoResult: {"UserInfo":{"TitleInfo":{"DisplayName":"MY_DISPLAY_NAME"}}}'
          },
          {
            Level: 'Debug',
            Message: 'user name: MY_DISPLAY_NAME'
          },
          {
            Level: 'Debug',
            Message: 'args: {"param_1_key":"param_1_value","param_2_key":"param_1_value"}'
          }
        ],
        MemoryConsumedBytes: 0,
        ProcessorTimeSeconds: 0,
        Revision: -1
      },
      status: 'OK'
    });
  });

});
