# Changing order of sidebar navigation items

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