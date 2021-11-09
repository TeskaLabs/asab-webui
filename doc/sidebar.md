# Sidebar configuration

## Changing order of sidebar navigation items

It is possible to change order of sidebar navigation items. Just add `sidebarItemsOrder` prop to Application component with value of Array of strings (each string represent sidebar item name) and sidebar items will be automatically sorted by this `sidebarItemsOrder` array (all items which are not listed in the array will just be added at the bottom of sidebar items list):

```
	const sidebarItemsOrder = ["Auth", "Discover", "Tools"]
	...
	<Application
		sidebarItemsOrder={sidebarItemsOrder}
		configdefaults={ConfigDefaults}
		modules={modules}
		defaultpath={__CONFIG__.defaultpath ? __CONFIG__.defaultpath : "/"}
	/>
```

## Setting resource for sidebar item

This option is handy when we want to limit the access to the item based on user's resources. The navigation item in sidebar is hidden for those, who does not have the appropriate rights.

**Exception**: Users with `superuser` rights are authorized by default.

The resource is set to the navigation `addItem` component.

```
	app.Navigation.addItem({
		name: 'Nowhere',
		url: '/nowhere',
		icon: 'cil-casino',
		resource: 'nowhere:access'
	});

	app.Navigation.addItem({
		name: 'Wrapped',
		icon: 'cil-chart',
		resource: 'wrapped:access'
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
		icon: 'cil-copy'
	})

```

## Setting resource for sidebar item's children

This option is handy when we want to limit the access to the item's children based on user's resources. The navigation item's children in sidebar is hidden for those, who does not have the appropriate rights.

**Exception**: Users with `superuser` rights are authorized by default.

The resource is set to the navigation `addItem` -> `children` component.

```
	app.Navigation.addItem({
		name: 'Wrapped',
		icon: 'cil-chart',
		resource: 'wrapped:access'
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

## Setting translations for the sidebar items 

Sidebar automatically adds translations for sidebar items with key `Sidebar`. In order to add translation to your `translation.json` add `Sidebar` object there and keys for items which is basically items names.

In example if you want to define translation for `About` item in Sidebar, add to your translation files:

```
"Sidebar": {
	"About": "About"
}
```
