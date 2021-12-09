# ASAB Config

## Setup

Before using this component in your project, `react-simple-tree-menu` and `react-hook-form` must be installed and added into the project's `package.json` file:

```
yarn add react-simple-tree-menu
yarn add react-hook-form
```


In `config` file, define ASAB Config as a service:

```
module.exports = {
	app: {

		...

	},
	webpackDevServer: {
		port: 3000,
		proxy: {
			'/api/asab_config': {
				target: 'http://localhost:8082',
				pathRewrite: {'^/api/asab_config' : ''},
				ws: true
			},
		}
	}
}
```

In the top-level `index.js` of your ASAB UI application, load the ASAB config module

```
const modules = [];

...

import ASABConfigModule from 'asab-webui/modules/asab-config';
modules.push(ASABConfigModule);

...

ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
```

## Schema and configuration files

TODO

## Language localisations

Language localizations for ASAB-Config configuration can be added to the translation.json files of `public/locales/en` & `public/locales/cs` of the product where ASAB Config module is used.

Example:

```
{
	"ASABConfig" : {
		"Nothing has been selected yet": "Nothing has been selected yet",
		"Please select the configuration from tree menu on the left side of the screen": "Please select the configuration from tree menu on the left side of the screen",
		"Save": "Save",
		"Read only": "Read only",
		"Basic": "Basic",
		"Advanced": "Advanced",
		"Data updated successfuly": "Data updated successfuly",
		"Something went wrong, failed to update data": "Something went wrong, failed to update data",
		"Something went wrong": "Something went wrong!",
		"We are sorry, but the file cannot be found": "We are sorry, but the file cannot be found :-(",
		"Config file does not exist": "Config file does not exist",
		"Something went wrong! Unable to get data": "Something went wrong! Unable to get {{type}} data",
		"Unable to get types": "Unable to get types",
		"Unable to get type data. Try to reload the page": "Unable to get type {{type}} data. Try to reload the page",
		"Unable to get config data. Try to reload the page": "Unable to get config {{config}} data. Try to reload the page"
	}
}
```
