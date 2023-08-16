# Unauthorized access screen

Unauthorized Access screen replace the content of the container by its own screen with information about what resource is missing to enable the access to the desired (blocked) screen.

Unauthorized Access screen can be displayed only when:

	- AuthModule is present within the application
	- user does not have a particular resource and user is not superuser

**Exception**: Users with `superuser` rights are authorized by default.

## Setup

For activating the validation, the `resource` must be set as a prop of route when adding it to the Router.

```
	app.Router.addRoute({
		path: "/somescreen",
		name: "Some screen",
		component: SomeContainer,
		resource: 'asab:some:access'
	});
```

It is **highly recommended** to combine this approach with validation on Navigation (Sidebar) to remove the item from sidebar, when user is not authorized with resource.

```
	app.Router.addRoute({
		name: "Some screen",
		path: "/somescreen",
		component: SomeContainer,
		resource: 'asab:some:access'
	});

	app.Navigation.addItem({
		name: "Some screen",
		url: "/somescreen",
		icon: 'cil-some',
		resource: 'asab:some:access'
	});
```
