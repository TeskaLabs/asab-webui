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


## Setup in config file

To load the configuration, external url's and paths of the image locations must be set.

```
{
	"TOOLS":{
		"Kibana":{"url":"http://127.0.0.1.:5601/kibana","path":"tools/kibana.svg"},
		"Grafana":{"url":"http://127.0.0.1.:3000/grafana","path":"tools/grafana.png"}
	}
}
```

Example explanation: 

- `"Kibana"` - the name of the tool you want to redirect to

- `"url"` - url of the tool to redirect to

- `"path"` - path to the location of the tool's logo/image



## Image settings

Images are stored in `/public/tools/` folder of your ASAB UI application, but it can be anywhere on site, depends on the image location set in the config file.
Size of the image is restricted to `200x200px` and it can be either .svg or .png format. Other formats are not recommended.
