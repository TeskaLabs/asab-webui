# ASAB Config

## Setup

Before using this component in your project, `react-simple-tree-menu` and `react-hook-form - v7` must be installed and added into the project's `package.json` file:

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

To obtain / save configuration, ASAB config service must be running.

Configuration and schema has to be saved in Zookeeper.

Config structure in Zookeeper should be set as following:

```
- **main Zookeeper node**
	- config
		- **type**
			- **config**
	- type
		- **type**
			- schema
```

where

- **main Zookeeper node** is the main node in the Zookeeper
- **type** is the name of the section
- **config** is the name of the configuration

Configuration, which will not fit the schema will fall into adHoc value/section, which is strictly read-only.


### Basic config and schema example for Section properties

Config example:

```
{
	"my-source": {
		"source": "my-data-source*",
		"datetime_field": "@timestamp",
		"type": "elasticsearch"
	}
}
```

Schema example:

```
{
	"$id": "Props schema",
	"type": "object",
	"title": "Props schema",
	"description": "My props schema",
	"default": {},
	"examples": [
		{
			"my-source": {
				"source": "my-data-source*",
				"datetime_field": "@timestamp",
				"type": "elasticsearch"
			}
		}
	],
	"required": ["my-source"], // Required value is optional for properties
	"properties": {
		"my-source": {
			"type": "string",
			"title": "Some source",
			"description": "My Some source",
			"default": {},
			"examples": [
				{
					"source": "my-data-source*",
					"datetime_field": "@timestamp",
					"type": "elasticsearch"
				}
			],
			"required": [
				"source",
				"datetime_field",
				"type"
			],
			"properties": {
				"source": {
					"type": "string",
					"title": "Data source",
					"description": "Value for Data source",
					"default": "",
					"examples": [
						"my-data-source*"
					]
				},
				"datetime_field": {
					"type": "string",
					"title": "Datetime",
					"description": "Datetime value",
					"default": "",
					"examples": [
						"@timestamp"
					]
				},
				"type": {
					"type": "string",
					"title": "Type",
					"description": "Select type",
					"default": ["elasticsearch", "api"],
					"$defs": {
						"select": { "type": "select" }
					 },
					"examples": [
						"elasticsearch"
					]
				}
			},
			"additionalProperties": false
		}
	},
	"additionalProperties": false
}
```

### Basic schema example for Section pattern properties

Config example:

```
{
	"Some:source:my-source": {
		"source": "my-data-source*",
		"datetime_field": "@timestamp",
		"type": "elasticsearch"
	}
}
```

Schema example:

```
{
	"$id": "Pattern props schema",
	"type": "object",
	"title": "Pattern props schema",
	"description": "My pattern props schema",
	"default": {},
	"examples": [
		{
			"Some:source:my-source": {
				"source": "my-data-source*",
				"datetime_field": "@timestamp",
				"type": "elasticsearch"
			}
		}
	],
	"required": [], // For pattern properties section, required should be left empty
	"patternProperties": {
		"^Some:source:.*$": {
			"type": "string",
			"title": "Some source",
			"description": "My Some source",
			"default": {},
			"examples": [
				{
					"source": "my-data-source*",
					"datetime_field": "@timestamp",
					"type": "elasticsearch"
				}
			],
			"required": [
				"source",
				"datetime_field",
				"type"
			],
			"properties": {
				"source": {
					"type": "string",
					"title": "Data source",
					"description": "Value for Data source",
					"default": "",
					"examples": [
						"my-data-source*"
					]
				},
				"datetime_field": {
					"type": "string",
					"title": "Datetime",
					"description": "Datetime value",
					"default": "",
					"examples": [
						"@timestamp"
					]
				},
				"type": {
					"type": "string",
					"title": "Type",
					"description": "Select type",
					"default": ["elasticsearch", "api"],
					"$defs": {
						"select": { "type": "select" }
					 },
					"examples": [
						"elasticsearch"
					]
				}
			},
			"additionalProperties": false
		}
	},
	"additionalProperties": false
}
```

## Supported inputs types

### String values

#### Single string

```
"properties": {
	"name": {
		"type": "string",
		"title": "Name",
		"description": "Fill your name",
		"default": "",
		"examples": [
			"Your Name"
		]
	}
}
```

#### Password

```
"properties": {
	"email": {
		"type": "string",
		"title": "Password",
		"description": "Fill your secret",
		"default": "",
		"$defs": {
			"password": {
				"type": "password"
			}
		},
		"examples": [
			"S0meSecr3t"
		]
	}
}
```

#### Email

```
"properties": {
	"email": {
		"type": "string",
		"title": "Email",
		"description": "Fill your email",
		"default": "",
		"$defs": {
			"email": {
				"type": "email"
			}
		},
		"examples": [
			"your@email.ex"
		]
	}
}
```

#### URL

```
"properties": {
	"url": {
		"type": "string",
		"title": "URL",
		"description": "Fill the redirect URL",
		"default": "",
		"$defs": {
			"url": {
				"type": "url"
			}
		},
		"examples": [
			"http://my-url.my"
		]
	}
}
```

#### Text area

```
"properties": {
	"image": {
		"type": "string",
		"title": "Base64 image",
		"description": "Add base64 image string",
		"default": "",
		"$defs": {
			"textarea": {
				"type": "textarea"
			}
		},
		"examples": [
			"data:image/svg;base64,iVBORw0KG..."
		]
	}
}
```

#### Select

```
"properties": {
	"slct": {
		"type": "string",
		"title": "Select a string",
		"description": "Please select a string value",
		"default": ["string one", "string two"],
		"$defs": {
			"select": { "type": "select" }
		 },
		"examples": [
			"string one"
		]
	}
}
```

### Number values

#### Single number

```
"properties": {
	"nmbr": {
		"type": "number",
		"title": "Random number",
		"description": "Add any number",
		"default": "",
		"$defs": {
			"number": {
				"type": "number"
			}
		},
		"examples": [
			666
		]
	}
}
```

#### Select

```
"properties": {
	"nmbrslct": {
		"type": "number",
		"title": "Select the number you like",
		"description": "Please select some number",
		"default": [1,2,3],
		"$defs": {
			"select": {
				"type": "select"
			}
		},
		"examples": [
			1
		]
	}
}
```

### Boolean values

Using checkbox

```
"properties": {
	"chckbx": {
		"type": "boolean",
		"title": "Turn on/off my checkbox",
		"description": "Turn me on/off",
		"default": true,
		"$defs": {
			"checkbox": {
				"type": "checkbox"
			}
		},
		"examples": [
			true
		]
	}
}
```

### Array values

```
"properties": {
	"arr": {
		"type": "array",
		"title": "Array values",
		"description": "Please write string values separated by comma",
		"default": "",
		"examples": [
			"string one", "string two"
		]
	}
}
```

## Language localisations

Language localizations for ASAB-Config configuration can be added to the translation.json files of `public/locales/en` & `public/locales/cs` of the product where ASAB Config module is used.

Example:

```
{
	"ASABConfig": {
		"Nothing has been selected": "Nothing has been selected",
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
		"Something went wrong! Unable to get schema": "Something went wrong! Unable to get schema {{type}}",
		"Unable to get data for tree menu": "Unable to get data for tree menu",
		"Unable to get schema. Try to reload the page": "Unable to get schema {{type}}. Try to reload the page",
		"Unable to get config data. Try to reload the page": "Unable to get config {{config}} data. Try to reload the page",
		"Configuration name can't be empty!": "Configuration name can't be empty!",
		"Remove": "Remove",
		"Something went wrong, failed to create configuration": "Something went wrong, failed to create configuration",
		"Configuration created successfully": "Configuration created successfully",
		"Name": "Name",
		"Configuration name": "Configuration name",
		"Fill out configuration name": "Fill out configuration name",
		"Create": "Create",
		"New": "New",
		"Something went wrong! Unable to get configurations": "Something went wrong! Unable to get configurations for {{config}}",
		"Unable to get configurations. Try to reload the page": "Unable to get configurations for {{config}}. Try to reload the page",
		"Create configuration": "Create configuration",
		"Do you want to remove this configuration?": "Do you want to remove this configuration?",
		"Something went wrong, failed remove configuration": "Something went wrong, failed remove configuration",
		"New configuration": "New configuration",
		"Section added": "Section added",
		"Add new section": "Add new section",
		"Add": "Add",
		"Type": "Type",
		"Do you want to remove this section?": "Do you want to remove this section?"
	}
}
```
