# ASAB Services

ASAB WebUI Services is a page with a list of available instances. It use a websocket connection, so the data are propagated realtime.

## Setup

In `config` file, define ASAB Services as a service:

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

In the top-level `index.js` of your ASAB UI application, load the ASAB services module

```
const modules = [];

...

import ASABServicesModule from 'asab-webui/modules/maintenance/ServicesModule';
modules.push(ASABServicesModule);

...

ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
```

The module will be displayed as a subitem of `Maintenance` in the sidebar navigation.
