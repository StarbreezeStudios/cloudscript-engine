'use strict';

const {assert} = require('./util/chai');
const SyncServer = require('../src/engine/web_server/sync_server');

const TEST_TITLE = process.env.TEST_TITLE;
const TEST_TITLE_SECRET = process.env.TEST_TITLE_SECRET;
const TEST_PLAYER_ID = process.env.TEST_PLAYER_ID;

describe('Synchronous Server', function () {
  const server = SyncServer(TEST_TITLE, TEST_TITLE_SECRET);

  it('GetUserAccountInfo can be called', () => {

    const result = server.GetUserAccountInfo({PlayFabId: TEST_PLAYER_ID});

    assert(result);
    assert(result.UserInfo);
    assert(result.UserInfo.TitleInfo);
    assert.strictEqual(result.UserInfo.TitleInfo.DisplayName, 'WebpackTest');
  });

  it('GetUserReadOnlyData can be called', () => {

    const result = server.GetUserReadOnlyData({
      PlayFabId: TEST_PLAYER_ID,
      Keys: ['QuestStats']
    });

    assert(result);
    assert(result.Data);
    assert(result.Data.QuestStats);
    let value = JSON.parse(result.Data.QuestStats.Value);
    assert.deepStrictEqual(value, {
      LoggedDays: 18,
      LogInARow: 2,
      CasualGames: 1,
      CasualWin: 1,
      RankedGames: 9,
      RankedWin: 9
    });
  });

});
