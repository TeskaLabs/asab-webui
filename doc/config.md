# Use of Config

The unified configuration in ASAB Web UI provides:

* configuration defaults values (provided in the application source code)
* static configuration (compiled in the ASAB Web UI application)
* dynamic configuration (downloaded during ASAB Web UI application init time, also known as a site config)

The configuration is available at `App.Config`, it is a dictionary, built from defauls, static and dynamic configuration.

The order is `default < static < dymamic`


## Loading custom modules to the Application

This setting allows user to define modules to be loaded from configuration into the Application. Custom modules not listed in the configuration will not be loaded into the Application.

Setting example in *static configuration*:

```
module.exports = {
	app: {
		modules: [
			"HomeModule"
		],
	},
}
```

Custom module implementation in to the Application is done within the `index.js` file.

Example of use:

```
const modules = [];

import HomeModule from './modules/home';

if (__CONFIG__.modules !== null) {
	Object.values(__CONFIG__.modules).map((module_name) => {
		switch(module_name) {
			case "HomeModule": modules.push(HomeModule); break;
		}
	});
}
```

Example of use with custom and default modules:

```
const modules = [];

//Load default module
import I18nModule from 'asab-webui/modules/i18n';
modules.push(I18nModule);

// Load custom module
import HomeModule from './modules/home';

if (__CONFIG__.modules !== null) {
	Object.values(__CONFIG__.modules).map((module_name) => {
		switch(module_name) {
			case "HomeModule": modules.push(HomeModule); break;
		}
	});
}
```
