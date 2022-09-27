# ASAB Instances

ASAB WebUI Instances is a page with a list of available instances. It use a websocket connection, so the data are propagated realtime.

## Setup

In `config` file, define ASAB Instances as a service:

```
module.exports = {
	app: {

		...

	},
	webpackDevServer: {
		port: 3000,
		proxy: {
			'/api/lmio_remote_control': {
				target: 'http://localhost:8086',
				ws: true,
				pathRewrite: {'^/api/lmio_remote_control' : ''}
			},
		}
	}
}
```

In the top-level `index.js` of your ASAB UI application, load the ASAB microservices module

```
const modules = [];

...

import ASABInstancesModule from 'asab-webui/modules/maintenance/InstancesModule';
modules.push(ASABInstancesModule);

...

ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
```

The module will be displayed as a subitem of `Maintenance` in the sidebar navigation.
