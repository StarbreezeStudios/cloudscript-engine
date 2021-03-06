'use strict';

const SimpleTestHandler = ({server, log, currentPlayerId}) => args => {
  const userInfoResult = server.GetUserAccountInfo({PlayFabId: currentPlayerId});
  const userName = userInfoResult.UserInfo.TitleInfo.DisplayName;
  log.debug('currentPlayerId: ' + currentPlayerId);
  log.debug('userInfoResult: ' + JSON.stringify(userInfoResult));
  log.debug('user name: ' + userName);
  log.debug('args: ' + JSON.stringify(args));
  return 'Ok';
};

const handlers = {
  SimpleTestHandler
};

module.exports = handlers;
