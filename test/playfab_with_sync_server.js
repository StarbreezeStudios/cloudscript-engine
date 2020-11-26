/* eslint-disable comma-dangle */
'use strict';

const {assert} = require('./util/chai');
const SyncServer = require('../src/engine/web_server/sync_server');

const TEST_TITLE = process.env.TEST_TITLE;
const TEST_TITLE_SECRET = process.env.TEST_TITLE_SECRET;
const TEST_PLAYER_ID = process.env.TEST_PLAYER_ID;

describe('Synchronous Server - All PlayFab calls used', function () {
  const server = SyncServer(TEST_TITLE, TEST_TITLE_SECRET);

  const commands = {
    'GetTitleData': {},
    'GetUserReadOnlyData': {PlayFabId: TEST_PLAYER_ID, Keys: []},
    'GetPlayerCombinedInfo': {PlayFabId: TEST_PLAYER_ID, InfoRequestParameters: {GetTitleData: true}},
    'UpdateUserReadOnlyData': {PlayFabId: TEST_PLAYER_ID, Data: {TestPassed: 1}},
    'SubtractUserVirtualCurrency': {PlayFabId: TEST_PLAYER_ID, VirtualCurrency: 'GO', Amount: 1},
    'GetUserInventory': {PlayFabId: TEST_PLAYER_ID},
    'GetCatalogItems': {},
    'UpdateUserData': {PlayFabId: TEST_PLAYER_ID, Data: {TestPassed: 1}},
    'GetTitleInternalData': {},
    'UpdatePlayerStatistics': {PlayFabId: TEST_PLAYER_ID, Statistics: []},
    'GrantItemsToUsers': {
      CatalogVersion: 'TestCatalog',
      ItemGrants: [{PlayFabId: TEST_PLAYER_ID, ItemId: 'One', Data: ''}]
    },
    'RevokeInventoryItems': {Items: [{PlayFabId: TEST_PLAYER_ID, ItemInstanceId: 'C6EBFE8239BEF049'}]},
    'GetUserData': {PlayFabId: TEST_PLAYER_ID},
    // "AddUserVirtualCurrency": {},
    // "UpdateSharedGroupData": {},
    'CreateSharedGroup': {SharedGroupId: 'test_shared_group'},
    'GetSharedGroupData': {SharedGroupId: 'test_shared_group'},
    'AddSharedGroupMembers': {SharedGroupId: 'test_shared_group', PlayFabIds: [TEST_PLAYER_ID]},
    'RemoveSharedGroupMembers': {SharedGroupId: 'test_shared_group', PlayFabIds: ['F17ED176DF55EF2C']},
    'DeleteSharedGroup': {SharedGroupId: 'test_shared_group'},
    'GetUserAccountInfo': {PlayFabId: TEST_PLAYER_ID},
    // "RemoveFriend": {},
    'GetFriendsList': {PlayFabId: TEST_PLAYER_ID},
    // "GetPlayerStatisticVersions": {},
    // "SetTitleData": {},
    // "WritePlayerEvent": {},
    // "UnlockContainerItem": {},
    // "AddPlayerTag": {},
    // "GetRandomResultTables": {},
    // "UpdateUserInventoryItemCustomData": {},
    // "DeleteUsers": {},
    // "ModifyItemUses": {}
  };

  Object.keys(commands).forEach(command => {

    it.skip(`${command} can be called`, () => {
      const result = server[command](commands[command]);
      assert(result);
    });

  });

});
