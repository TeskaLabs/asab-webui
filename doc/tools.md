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
	"tools":[
		{"name":"Kibana","url":"http://127.0.0.1.:5601/kibana","image":"tools/kibana.svg"},
		{"name":"Grafana","url":"http://127.0.0.1.:3000/grafana","image":"tools/grafana.png"}
	]
}
```

Example explanation: 

- `"name"` - the name of the tool you want to redirect to

- `"url"` - url of the tool to redirect to

- `"image"` - source path of the tool's logo/image location



## Image settings

Images are stored in `/public/tools/` folder of your ASAB UI application, but it can be anywhere on site, depends on the image location set in the config file.
Size of the image is restricted to `72x72px` and it can be either .svg or .png format. Other formats are not recommended.
