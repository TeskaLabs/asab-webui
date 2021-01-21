# ASAB Config

## Setup

React json view package must be installed to get the functionality of the ASAB Config.

```
yarn add react-json-view
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
