[![Build Status](https://github.com/StarbreezeStudios/cloudscript-engine/workflows/NPM%20Publish/badge.svg)](https://github.com/StarbreezeStudios/cloudscript-engine/actions?query=workflow%3A%22NPM+Publish%22)
[![Tests](https://github.com/StarbreezeStudios/cloudscript-engine/workflows/Run%20Tests/badge.svg)](https://github.com/StarbreezeStudios/cloudscript-engine/actions?query=workflow%3A%22Run+Tests%22)
[![NPM Version](http://img.shields.io/npm/v/cloudscript-engine.svg?style=flat)](https://www.npmjs.org/package/cloudscript-engine)

# cloudscript-engine

Node.js based Framework to simplify PlayFab's Cloudscript handlers development.
Key features:

* Run and debug your handlers locally using actual PlayFab title database
* Pack your handlers in just one file bundle
* Deploy your handlers easily

## Installation  
  
Add **cloudscript-engine** to your list of dependencies in `package.json`:  
  
```bash  
$ npm install cloudscript-engine  
```  
  
## Setting up credentials file  
  
Create a file named `credentials.json` containing your secret keys by title as follows:

```json
{
	"TITLE_1": "TITLE_1_SECRET",
	"TITLE_2": "TITLE_2_SECRET"
}
```  

## Execute **cloudscript-engine**
In order to have cloudscript server running, just execute

```bash
$ csengine -t <YOUR_TITLE> <PATH_TO_YOUR_HANDLERS_FILE>
Cloudscript Engine running at http://localhost:3000
```

Where:

* **YOUR_TITLE** is the name of the PlayFab title you want to use. It must be present in your credentials file
* **PATH_TO_YOUR_HANDLERS_FILE** is the path to your handlers' entry point (usually an index.js file).

See [Handler example](https://github.com/StarbreezeStudios/cloudscript-engine/wiki#simple-handler-example) 
for additional information regarding handlers format and implementation.

Now you only have to change your PlayFab client to use the localhost endpoint

## Extended documentation
More deep knowledge on how to use **cloudscript-engine** see [Github wiki here](https://github.com/StarbreezeStudios/cloudscript-engine/wiki) 
