# Use of Authorization

## Authorization with tenant

The authorization is an optional feature of ASAB Web UI.

It is connected to `Tenant` module of ASAB Web UI.

It provides two main functions:

- Authorize user based on assigned tenants
- The list of user's authorized tenants for application in the TenantDropdown menu

This includes also the tob-bar selector for switching the active tenant.

Notes:

The tenant-enabled URL of the endpoint should start with the tenant: `/{tenant-id}/path...`

The active tenant is set in the React application initialization and stay constant.
If the user decides to change the tenant, React application is restarted/reloaded.
Only tenants authorized for the user are displayed.


### Setup

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

## Authorization with resource

This is an optional **softcheck** on user's resource and their ability to display particular item in the Sidebar navigation.

If resource implemented as a property of a Navigation item in the application Module does not meet user's resource via request on `rbac` endpoint, the Navigation is not rendered in the Sidebar of the application.

This behavior is convenient, when limited acces for users without particular rights is needed.

### Setup

The application resource has to be set in the application's Module, e.g.

```

...

	export default class MyAppModule extends Module {
		constructor(app, name) {
			super(app, "MyAppModule");

			app.Router.addRoute({
				path: '/myitem/credentials',
				exact: true,
				name: 'Credentials',
				component: CredentialsListContainer
			});

			app.Navigation.addItem({
				name: 'My Sidebar Item',
				icon: 'cil-address-book',
				resource: 'myitem:access', // Here the resource property has to be implemented
				children: [
					{
						name: 'Credentials',
						url: '/myitem/credentials',
						icon: 'cil-people'
					}
				]
			});
		}
	}

...

```
