# cloudscript-engine

Framework designed ease playfab's cloudscript handlers development.
Highlight features:<br>

* Run and debug your handlers locally using actual playfab title's environment
* Pack your handlers in just one file bundle
* Deploy your handlers so easily

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
$ csengine <YOUR_TITLE> <PATH_TO_YOUR_HANDLERS_FILE>
Cloudscript Engine running at http://localhost:3000
```

Where:
* **YOUR_TITLE** is the name of the title you want to use. It must be present in your credentials file
* **PATH_TO_YOUR_HANDLERS_FILE** is the path to your handlers' entry point (usually an index.js file).<br> See [Handler example](https://github.com/StarbreezeStudios/cloudscript-engine/wiki#simple-handler-example) 
for additional information regarding handlers format and implementation.

Now you only have to change your playfab client to use the localhost endpoint

## Extended documentation
More deep knowledge on how to use **cloudscript-engine** see [Github wiki here](https://github.com/StarbreezeStudios/cloudscript-engine/wiki) 
