'use strict';

const SyncPlayfabClient = require('./sync_playfab_client');

const sync_server = (title, secret) => {
  const playfab = SyncPlayfabClient(title, secret);

  const commands = [
    'GetTitleData',
    'GetUserReadOnlyData',
    'GetPlayerCombinedInfo',
    'UpdateUserReadOnlyData',
    'SubtractUserVirtualCurrency',
    'GetUserInventory',
    'GetCatalogItems',
    'GrantItemsToUsers',
    'UpdateUserData',
    'GetTitleInternalData',
    'UpdatePlayerStatistics',
    'RevokeInventoryItems',
    'GetUserData',
    'AddUserVirtualCurrency',
    'RemoveSharedGroupMembers',
    'UpdateSharedGroupData',
    'GetSharedGroupData',
    'AddSharedGroupMembers',
    'CreateSharedGroup',
    'DeleteSharedGroup',
    'GetUserAccountInfo',
    'RemoveFriend',
    'GetFriendsList',
    'GetPlayerStatisticVersions',
    'SetTitleData',
    'WritePlayerEvent',
    'UnlockContainerItem',
    'AddPlayerTag',
    'GetRandomResultTables',
    'UpdateUserInventoryItemCustomData',
    'DeleteUsers',
    'ModifyItemUses'
  ];

  const server = {};
  commands.forEach(command => {
    server[command] = playfab(command);
  });

  return server;
};

module.exports = sync_server;
