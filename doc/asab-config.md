# ASAB Config

## Setup

Before using this component in your project, `react-simple-tree-menu` and `react-hook-form` must be installed and added into the project's `package.json` file:

```
yarn add react-simple-tree-menu
yarn add react-hook-form
```


In `config` file, define ASAB Config as a service:

```
module.exports = {
	app: {
		BASE_URL: 'http://localhost:3000',
		API_PATH: 'api',
		SERVICES: {
			asab_config: 'asab-config',
		},

		...

	},
	webpackDevServer: {
		port: 3000,
		proxy: {
			'/api/asab-config': {
				target: 'http://localhost:8082',
				pathRewrite: {'^/api/asab-config' : ''},
				ws: true,
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
