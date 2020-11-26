[![Build Status](https://github.com/StarbreezeStudios/cloudscript-engine/workflows/NPM%20Publish/badge.svg)](https://github.com/StarbreezeStudios/cloudscript-engine/actions?query=workflow%3A%22NPM+Publish%22)
[![Tests](https://github.com/StarbreezeStudios/cloudscript-engine/workflows/Run%20Tests/badge.svg)](https://github.com/StarbreezeStudios/cloudscript-engine/actions?query=workflow%3A%22Run+Tests%22)
[![NPM Version](http://img.shields.io/npm/v/cloudscript-engine.svg?style=flat)](https://www.npmjs.org/package/cloudscript-engine)

# cloudscript-engine

Node.js based Framework to simplify PlayFab's Cloudscript handlers development.

Key features:

* Run and debug your handlers locally using actual PlayFab title database
* Pack your handlers in just one file bundle
* Deploy your handlers easily

## Why ?

If you have developed games using PlayFab backend, you know that you start with simple Cloudscript functions.
As the game gets more complex, so does your Cloudscript.

Unfortunately, PlayFab doesn't provide a good way to develop or **debug** your functions. The naive way is to
edit directly in Cloudscript web editor or to keep uploading development revisions full of Logs, and watch
those Logs to see what's going on. 

This is extremely inefficient and error prone.

Additionally, you may want to **Unit Test** your Cloudscript functions. But this is not easy job because Cloudscript
functions rely on a set of globals that get automagically set for you at runtime. To use any modern standard test
framework you need isolation and modularity.

On the other hand, Node.js provides an excellent environment to execute javascript (and Cloudscript is nothing
but javascript). Node.js also provides a proven module stack and a huge amount of tools. 

If we could only write Cloudscript handlers as node modules, where all the contexts are function parameters, and
have tools to pack and upload to PlayFab Cloudscript format, then we would be able to version control, write tests,
run locally, debug, release management, etc.

This is exactly what **cloudscript-engine** module does.

It requires you to write your handlers as node modules with a fixed function signature, 
and in exchange clears the way to agile development and project complexity management.

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
