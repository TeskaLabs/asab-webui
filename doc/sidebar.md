# Sidebar configuration

## Changing order of sidebar navigation items

It is possible to change order of sidebar navigation items when you add items to Navigation. Just add `order` property with number value to object which you pass into `app.Navigation.addItem()` and sidebar items will be automatically sorted from smallest to highest: 

```
	app.Navigation.addItem({
		name: 'Nowhere',
		url: '/nowhere',
		icon: 'cil-casino',
		order: 3
	});

	app.Navigation.addItem({
		name: 'Wrapped',
		icon: 'cil-chart',
		order: 1,
		children: [
			{
				name: 'Home',
				url: '/',
				icon: 'cil-home',
			},
			{
				name: 'Table',
				url: '/Table',
				icon: 'cil-chart',
			}
		]
	});

	app.Navigation.addItem({
		name: 'Fancy',
		url: '/fancy',
		icon: 'cil-copy',
		order: 2
	})

```

This will show items in sidebar in order:
1) Wrapped
2) Fancy
3) Nowhere

Note: `order` property can be either number or string which can be parsed as number (i.e. `2` or `"2"`). If `order` property is `undefined` or value is set incorrect (i.e. `"2a"`) then sidebar will count such item for `9999` and such item will take place at the bottom of the sidebar navigation items list.

## Setting resource for sidebar item

This option is handy when we want to limit the access to the item based on user's resources. The navigation item in sidebar is hidden for those, who does not have the appropriate rights. Authorization of the user is controlled by `rbac` API endpoint.

The resource is set to the navigation `addItem` component.

```
	app.Navigation.addItem({
		name: 'Nowhere',
		url: '/nowhere',
		icon: 'cil-casino',
		resource: 'nowhere:access',
		order: 3
	});

	app.Navigation.addItem({
		name: 'Wrapped',
		icon: 'cil-chart',
		resource: 'wrapped:access',
		order: 1,
		children: [
			{
				name: 'Home',
				url: '/',
				icon: 'cil-home',
			},
			{
				name: 'Table',
				url: '/Table',
				icon: 'cil-chart',
			}
		]
	});

	app.Navigation.addItem({
		name: 'Fancy',
		url: '/fancy',
		icon: 'cil-copy',
		order: 2
	})

```

## Setting resource for sidebar item's children

This option is handy when we want to limit the access to the item's children based on user's resources. The navigation item's children in sidebar is hidden for those, who does not have the appropriate rights. Authorization of the user is controlled by `rbac` API endpoint.

The resource is set to the navigation `addItem` -> `children` component.

```
	app.Navigation.addItem({
		name: 'Wrapped',
		icon: 'cil-chart',
		resource: 'wrapped:access',
		order: 1,
		children: [
			{
				name: 'Home',
				url: '/',
				icon: 'cil-home'
			},
			{
				name: 'Table',
				url: '/Table',
				icon: 'cil-chart',
				resource: "table:access"
			}
		]
	});
```
