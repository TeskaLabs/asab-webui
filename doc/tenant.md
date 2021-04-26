# Use of Tenants

The multitenancy in ASAB Web UI is supported via the _Tenant module_.

It provides two main functions:

 1. The list of available tenants
 2. The current tenant

This includes also the tob-bar selector for switching the current tenant.

Notes:

The tenant-enabled URL of the endpoint should start with the tenant: `/{tenant-id}/path...`

The current tenant is set in the React application initialization and stay constant.
If the user decides to change the tenant, React application is restarted/reloaded.


## Setup

In the top-level `index.js` of your ASAB UI application, load the Tenant module 

```
const modules = [];

...

import TenantModule from 'asab-webui/modules/tenant';
modules.push(TenantModule);

...

ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
```


## Redux Store

The tenant information is available in the application Redux store at `state.tenant`. The tenants are obtained from `userinfo` of ASAB WebUI's `auth` module.

```
{

	"current": "test"

	"tenants": ["test", "test1"]

}
```

* `current` contains the information about the currently active tenant.
* `tenants` contains a list of the available tenants that the app can switch into (or use)


## Usage in the component

```
import React from 'react';
import { connect } from 'react-redux';

function TenantExample(props) {

	// This is how you obtain the Axios API with prefixed tenant
	let axios = props.app.axiosCreate(props.tenant+'/endpoint');

	// Display the id of the current tenant
	return (<div>{props.tenant}</div>);
}

function mapStateToProps(state) {
	return { tenant: state.tenant.current }
}

export default connect(mapStateToProps)(TenantExample);
```


## Statically configured tenants

Sometimes it is useful to operate the WebUI with statically specified tenant(s).
This means that WebUI can operate without need of the Auth backend.

It is done by inclusion of the list of `tenants` information in the static configuration:

```
module.exports = {
	app: {
		...
		tenants: [
			'tenant1',
			'tenant2',
		]
		...
	},
	...
}

```

The first tenant in the list is the default tenant.

_Note: This method cannot be combined with other tenant sources, such as API._

