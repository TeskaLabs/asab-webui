# External tools

External tools is a module, which serves the purpose of rendering dashboard with widgets (buttons), which on click redirect to an approriate external tool.

Configuration of the external tools module can be static or dynamic.

## Setup

In the top-level `index.js` of your ASAB UI application, load the Tools module 

```
const modules = [];

...

import ToolsModule from 'asab-webui/modules/tools';
modules.push(ToolsModule);

...

ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
```


## Setup in config file (static configuration)

External url's and paths of the image locations should be set.

This configuration is **not editable** once the application is build.

```
{
	"tools":[
		{
			"name": "Grafana",
			"url": "http://http://127.0.0.1.:3000/grafana",
			"image": "tools/grafana.svg"
		},
		{
			"name": "Kibana",
			"url": "http://http://127.0.0.1.:3000/kibana",
			"image": "tools/kibana.svg"
		}
	]
}
```

Example explanation: 

- `"name"` - the name of the tool you want to redirect to

- `"url"` - url of the tool to redirect to

- `"image"` - source path of the tool's logo/image location


## Setup in Zookeeper (dynamic configuration)

To obtain configuration from Zookeeper, `asab-config` service must be set up and running with the configuration pointing to the main node of Zookeeper.

The configuration loaded from Zookeeper is **editable**.

**One configuration** file stores just **one tool** configuration.


```
{
	"tool": {
		"name": "Grafana",
		"url": "http://http://127.0.0.1.:3000/grafana",
		"image": "tools/grafana.svg"
	}
}
```

### Zookeeper config and type structure

Configuration is stored in the Zookeeper node. It **must** be of JSON type.

Config structure in Zookeeper

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
- **type** is `Tools`
- **config** is the name of the tool

as defined in `index.js` properties of `Tools` module.

Example of above described Zookeeper structure for `logman` case:

```
- logman
	- config
		- Tools
			- Grafana
			- Kibana
	- type
		- Tools
```

### Config file example

Dynamic configuration in Zookeeper is the same as the static. The configuration should be stored directly to the `config.json` node.

```
- logman
	- config
		- Tools
			- Grafana # Here the configuration should be stored
```

Example of the Grafana config file

```
{
	"tool": {
		"name": "Grafana",
		"url": "http://http://127.0.0.1.:3000/grafana",
		"image": "tools/grafana.svg"
	}
}
```

### Type (schema) configuration

Schema configuration should be stored directly to the `Tools` node under the `type`.

**One schema** is used for **all tools** configuration files.

```
- logman
	- type
		- Tools # Here the schema should be stored
```

Example of the schema configuration

```
{
	"$id": "Tool schema",
	"type": "object",
	"title": "Tool schema",
	"description": "Configure Tools screen",
	"default": {},
	"examples": [
		{
			"tool": {
				"name": "MyTool",
				"url": "http://lm1/my-tool",
				"image": "tools/my-tool.svg"
			}
		}
	],
	"required": [
		"tool" // Required value is optional
	],
	"properties": {
		"tool": {
			"type": "object",
			"title": "Tool configuration",
			"description": "The Tool configuration",
			"default": {},
			"examples": [
				{
					"name": "MyTool",
					"url": "http://lm1/my-tool",
					"image": "tools/my-tool.svg"
				}
			],
			"required": [
				"name",
				"url",
				"image"
			],
			"properties": {
				"name": {
					"type": "string",
					"title": "Name",
					"description": "Fill the name of the Tool",
					"default": "",
					"examples": [
						"MyTool"
					]
				},
				"url": {
					"type": "string",
					"title": "URL",
					"description": "Fill the redirect URL of the Tool",
					"default": "",
					"examples": [
						"http://lm1/my-tool"
					]
				},
				"image": {
					"type": "string",
					"title": "Image",
					"description": "Fill the path to the tool image in public folder or add base64 image string",
					"default": "",
					"$defs": {
						"textarea": { "type": "textarea" }
					},
					"examples": [
						"tools/my-tool.svg"
					]
				}
			},
			"additionalProperties": false
		}
	},
	"additionalProperties": false
}
```

## Image settings

### Images loaded from `public` folder

Images are stored in `/public/tools/` folder of your ASAB UI application, but it can be anywhere on site, depends on the image location set in the config file.
Size of the image is restricted to `72x72px` and it should be `.svg` format. Other formats are not recommended.

Example of image loaded from `public` folder

```
{
	"tool": {
		...
		"image": "tools/grafana.svg"
	}
}
```

### Images loaded as base64 string

Images can be also loaded as `base64` string format. The rules for image size and format are the same as for images loaded from `public` folder.

Example of image inserted as base64 string

```
{
	"tool": {
		...
		"image": "data:image/svg;base64,iVBORw0KG..."
	}
}
```
