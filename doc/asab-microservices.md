# ASAB Microservices

ASAB WebUI Microservices is a page with a list of available microservices. It contains information about their hosts and launch time. By clicking on the particular microservice you will be able to watch the content of that microservice.

## Attention required — yellow flag

In case some microservice contains mistakes, a yellow flag will appear near the title.

## Setup

In `config` file, define ASAB Microservices as a service:

```
module.exports = {
	app: {

		...

	},
	webpackDevServer: {
		port: 3000,
		proxy: {
			'/api/lmio_correlator_builder': {
				target: 'http://localhost:8086',
				pathRewrite: {'^/api/lmio_correlator_builder' : ''},
				ws: true
			},
		}
	}
}
```

In the top-level `index.js` of your ASAB UI application, load the ASAB microservices module

```
const modules = [];

...

import ASABMicroservicesModule from 'asab-webui/modules/maintenance/MicroservicesModule';
modules.push(ASABMicroservicesModule);

...

ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
```

The module will be displayed as a subitem of `Maintenance` in the sidebar navigation.
