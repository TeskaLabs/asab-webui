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

# Setting Dynamic Config URL

Dynamic config url is taken from content attribute of meta element with name `x-config` in `index.html` file:

```
<meta name="x-config" content="..." />
```

Note: Mechanism for auto adding this element to index.html doesn't exist yet. For test purposes just write inside of <head></head> in `public/index.html` this line of code:

```
<meta name="x-config" content="*dynamic config url*" />
```

And replace `*dynamic config url*` with your url to dynamic configuration.

# Configuration validation

Function for configuration validation with current tenant

It will work only when Tenant module is loaded in the application
It require app props and configuration
Configuration has to be of type `object` (not array of objects)
It returns `false` if configuration does not match validation criteria on tenant
It returns `true` if configuration match the validation criteria on tenant

Example of usage in the configuration:

```
	"Authorization" {
		"tenants": "tenant1, tenant2"
	}
```

Example of usage within the code:

```
import { validateConfiguration } from 'asab-webui';

...


	if (configuration && Object.keys(configuration).length > 0) {

		...

		// This part will manage if the configuration is suitable for further processing
		if (validateConfiguration(props, configuration)) {
			return;
		}

		// Processing configuration which passed the authorization criteria
		...
	}
```

Example of config for validateConfiguration function

```
	...

	let config = {
			...

			"SectionName:datasource" {
				...
			},
			"Authorization" {
				"tenants": "tenant1, tenant2"
			},
			...
		}

	if (validateConfiguration(props, config)) {
		return;
	}
	...

```

The result of processing after validation should be that configuration, which has specified tenants in the configuration and does match the criterion (match the configured tenants in the `Authorization` section with current tenant of the user), will be visible only to the users, whos current tenant matches the criteria.
