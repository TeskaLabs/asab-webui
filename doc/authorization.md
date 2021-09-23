# Use of Authorization

## Authorization with tenant

The authorization is an optional **softcheck** feature of ASAB Web UI.

It is connected to `Tenant` module of ASAB Web UI.

It provides authorization of the user based on assigned tenants.

Authorization is enabled for every application, if not defined otherwise.

**Exception**: Users with `superuser` rights are authorized by default.

### Disable authorization

`authorization` - if set to `disabled`, then the authorization is not applied.

Example of disabling the authorization:

```
module.exports = {
	app: {
		...
		authorization: "disabled",
		...
	},
}
```

### Set logout timeout

When user is not authorized by tenant, timeout period is set before logouting the user. During that period, SplashScreen is displayed to the user. Default value is 60000 aka 60s.

Example of setting/modifying the logout timeout period:

```
module.exports = {
	app: {
		...
		authorizationLogoutTimeout: 120000,
		...
	},
}
```


## Sidebar item/child authorization with resource

This is an optional **softcheck** on user's resource and their ability to display particular item in the Sidebar navigation.

If resource implemented as a property of a Navigation item in the application Module does not meet user's resources, the Navigation item/child is not rendered in the Sidebar of the application.

This behavior is convenient, when limited access for users without particular rights is needed.

**Exception**: Users with `superuser` rights are authorized by default.

For more info about Sidebar, please refer to `/doc/sidebar.md`

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
