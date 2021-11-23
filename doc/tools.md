# External tools

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
		{"name":"Kibana","url":"http://127.0.0.1.:5601/kibana","image":"tools/kibana.svg"},
		{"name":"Grafana","url":"http://127.0.0.1.:3000/grafana","image":"tools/grafana.svg"}
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

### Zookeeper config and type structure

Configuration is stored in the Zookeeper node. It **must** be of JSON type.

Config structure in Zookeeper

```
- **main Zookeeper node**
	- config
		- **type**
			- **config** + **variant**
	- type
		- **type**
			- schema
```

where

- **main Zookeeper node** is the main node in the Zookeeper
- **type** is `tools`
- **config** is `config`
- **variant** is `.json`

as defined in `index.js` properties of `Tools` module.

Example of above described Zookeeper structure for `logman` case:

```
- logman
	- config
		- tools
			- config.json
	- type
		- tools
```

### Config file example

Dynamic configuration in Zookeeper is the same as the static. The configuration should be stored directly to the `config.json` node.

```
- logman
	- config
		- tools
			- config.json # Here the configuration should be stored
```

Example of the config file

```
{
	"tools":[
		{"name":"Kibana","url":"http://127.0.0.1.:5601/kibana","image":"tools/kibana.svg"},
		{"name":"Grafana","url":"http://127.0.0.1.:3000/grafana","image":"tools/grafana.png"}
	]
}
```

### Type (schema) configuration

Schema configuration should be stored directly to the `tools` node under the `type`.

```
- logman
	- type
		- tools # Here the schema should be stored
```

Example of the schema configuration

```
{
	"type": "object",
	"title": "Tools schema",
	"description": "Tools schema",
	"default": {},
	"examples": [
		{}
	],
	"required": [],
	"additionalProperties": true
}
```

## Image settings

Images are stored in `/public/tools/` folder of your ASAB UI application, but it can be anywhere on site, depends on the image location set in the config file.
Size of the image is restricted to `72x72px` and it should be `.svg` format. Other formats are not recommended.
