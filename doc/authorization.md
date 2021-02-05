# Use of Authorization

The authorization is an optional feature of ASAB Web UI.

It is connected to `Tenant` module of ASAB Web UI.

It provides two main functions:

 1. Authorize user based on assigned tenants
 2. The list of user's authorized tenants for application in the TenantDropdown menu
 3. The active/current tenant

This includes also the tob-bar selector for switching the current tenant.

Notes:

The tenant-enabled URL of the endpoint should start with the tenant: `/{tenant-id}/path...`

The active/current tenant is set in the React application initialization and stay constant.
If the user decides to change the tenant, React application is restarted/reloaded.
Only tenants authorized for the user are displayed.


## Setup

In the top-level `index.js` of your ASAB UI application, load the Tenant module and add to ConfigDefaults `Authorization` with keys and values.

`Authorize` must be set to `true` to enable the feature

`Resource` is used for setting up resource for `rbac` endpoint. By default is set to `tenant:access`

`UnauthorizedLogoutTimeout` is a timeout period on which the screen will stay in SplashScreen mode before it log out the unauthorized user. Default value is 60000 aka 60s.

<!-- TODO: Set up also BASE_URL, Microservice, Subpaths, etc... -->

```
const modules = [];

...

import TenantModule from 'asab-webui/modules/tenant';
modules.push(TenantModule);

let ConfigDefaults = {
	Authorization: { Authorize: true, Resource: "tenant:access", UnauthorizedLogoutTimeout: 60000},
};

...

ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
```
