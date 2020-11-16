'use strict';

const sinon = require('sinon');

module.exports = () => {
  return {
    server: {
      GetTitleData: sinon.stub(),
      GetUserReadOnlyData: sinon.stub(),
      GetPlayerCombinedInfo: sinon.stub(),
      UpdateUserReadOnlyData: sinon.stub(),
      SubtractUserVirtualCurrency: sinon.stub(),
      GetUserInventory: sinon.stub(),
      GetCatalogItems: sinon.stub(),
      GrantItemsToUsers: sinon.stub(),
      UpdateUserData: sinon.stub(),
      GetTitleInternalData: sinon.stub(),
      UpdatePlayerStatistics: sinon.stub(),
      RevokeInventoryItems: sinon.stub(),
      GetUserData: sinon.stub(),
      AddUserVirtualCurrency: sinon.stub(),
      RemoveSharedGroupMembers: sinon.stub(),
      UpdateSharedGroupData: sinon.stub(),
      GetSharedGroupData: sinon.stub(),
      AddSharedGroupMembers: sinon.stub(),
      CreateSharedGroup: sinon.stub(),
      DeleteSharedGroup: sinon.stub(),
      GetUserAccountInfo: sinon.stub(),
      RemoveFriend: sinon.stub(),
      GetFriendsList: sinon.stub(),
      GetPlayerStatisticVersions: sinon.stub(),
      SetTitleData: sinon.stub(),
      WritePlayerEvent: sinon.stub(),
      UnlockContainerItem: sinon.stub(),
      AddPlayerTag: sinon.stub(),
      GetRandomResultTables: sinon.stub(),
      UpdateUserInventoryItemCustomData: sinon.stub(),
      DeleteUsers: sinon.stub(),
      ModifyItemUses: sinon.stub()
    },
    log: {
      debug: sinon.stub(),
      error: sinon.stub()
    }
  };
};
