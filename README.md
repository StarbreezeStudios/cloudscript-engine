## Description
Framework designed to develop playfab's cloudscript handlers that lets you debug your handlers code locally, pack all handlers in just one file and deploy them.

## Installation  
  
Add `cloudscript-engine` to your list of dependencies in `package.json`:  
  
```bash  
$ npm install cloudscript-engine  
```  
  
## Setting up credentials file  
  
Create a file named `credentials.json` containing your secret keys by title as fllows:

```json
{
	"TITLE1": "TITLE-1-SECRET",
	"TITLE2": "TITLE-2-SECRET",
	...
}
```  

## Execute cloudscript engine
In order to have cloudscript server runnig, just execute

```bash
$ csengine <YOUR-TITLE> <PATH-TO-YOUR-HANDLERS-FILE>
Cloudscript Engine running at http://localhost:3000
```
Now you only have to change your playfab client to use the locahost endpoint

## Project structure and handlers format
In order to use this framework you should have to organize your project in an specific way and write your handlers in a specific way.

### Global variables resolution
Cloudscript code is intented to take some variables as globals as explained here
https://docs.microsoft.com/en-us/gaming/playfab/features/automation/cloudscript/writing-custom-cloudscript

These globals variables are:
* server
* http
* log
* currentPlayerId
* handlers
* script

As these variables are not available in local environment, cloudscript engine mocks some of them. Currently we only support the use of server, log and currentPlayerId variables.



### Simple handler example:

A simple handlers is structured as in the following code snippet. It exports a function that takes global variables  and returns your final handler function.
Within your function you have all these global variables available. You can use the same approach for aside functions injecting globals variables to them.

```js
"use strict";  

const SomeExternalFunction = require('./SomeExternalFunction')
  
module.exports = (globals) => (args, context) => {  
  const {server, log, currentPlayerId} = globals;
  const someExternalFunction = SomeExternalFunction(globals);

  const userInfoResult = server.GetUserAccountInfo({PlayFabId: currentPlayerId});  
  const userName = userInfoResult.UserInfo.TitleInfo.DisplayName;  
  log.debug("currentPlayerId: " + currentPlayerId);  
  log.debug("userInfoResult: " + JSON.stringify(userInfoResult));  
  log.debug("user name: " + userName);  
  log.debug("args: " + JSON.stringify(args));  
  return "Ok";  
};
```




## Build your project

## Deploy your project

