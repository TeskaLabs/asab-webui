# ASAB WebUI Library

## Add module to your project

### 1. import Library module into `src/index.js` of your application based on asab-webui:

```js
import LibraryModule from './modules/library';
```

### 2. Add module to default or custom modules (`modules` array should be defined for this step, check `Loading custom modules to the Application` paragraph in `config.md` file if you're not sure what it is)

a) default module
```js
modules.push(LibraryModule);
```

b) custom module
```js
if (__CONFIG__.modules != undefined) {
	Object.values(__CONFIG__.modules).map((module_name) => {
		switch(module_name) {
			case "LibraryModule": modules.push(LibraryModule); break;
		}
	});
}
```

### 3. Set up configuration

If you added `Library` as custom module then you should also define it in your configuration file in order to add it to your project:
```js
module.exports = {
	app: {
		modules: ["LibraryModule"]
	},
}
```

In order to connect microservice with `Library` module you should also define target for api.

Example of defining api for webpackDevServer (used for staring locale dev server):
```js
module.exports = {
	app: {
		modules: ["LibraryModule"]
	},
	'/api/lmio_library': {
		target: "http://127.0.0.1:8089", // Note that target adress may differ base on address where microservice is running
		pathRewrite: { '^/api/lmio_library': '' }
	},
}
```

## Translations for Library module

English:
```json
	"ASABLibraryModule": {
		"Search": "Search",
		"Failed to load data": "Failed to load data",
		"Failed to load content of the file": "Failed to load content of the file",
		"Enable file": "Enable file",
		"Disable file": "Disable file",
		"File was successfully enabled": "File was successfully enabled",
		"File was successfully disabled": "File was successfully disabled",
		"Failed to enable file": "Failed to enable file",
		"Failed to disable file": "Failed to disable file",
		"File has been updated": "File has been updated",
		"Failed to update the file": "Failed to update the file",
		"Are you sure you want to cancel changes?": "Are you sure you want to cancel changes?",
		"Edit": "Edit",
		"Save":"Save",
		"Cancel": "Cancel",
		"Download all": "Download all"
	},
```

Czech:
```json
	"ASABLibraryModule": {
		"Search": "Hledat",
		"Failed to load data": "Nepodařilo se načíst data",
		"Failed to load content of the file": "Nepodařilo se načíst obsah souboru",
		"Enable file": "Aktivovat soubor",
		"Disable file": "Deaktivovat soubor",
		"File was successfully enabled": "Soubor byl úspěšně aktivovan",
		"File was successfully disabled": "Soubor byl úspěšně deaktivovan",
		"Failed to enable file": "Soubor se nepodařilo aktivovat",
		"Failed to disable file": "Soubor se nepodařilo deaktivovat",
		"File has been updated": "Soubor byl aktualizován",
		"Failed to update the file": "Soubor se nepodařilo aktualizovat",
		"Are you sure you want to cancel changes?": "Opravdu chcete zahodit změny?",
		"Edit": "Upravit",
		"Save":"Uložit",
		"Cancel": "Zahodit",
		"Download all": "Stáhnout vše"
	},
```