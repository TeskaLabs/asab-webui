# Changing order of sidebar navigation items

It is possible to change order of sidebar navigation items with configuration of app. Just add items names to property `sidebarItemsOrder` as list in that order which you want it to appear in sidebar: 

```
let ConfigDefaults = {
	...
	sidebarItemsOrder: ["Home", "Configuration", "Dashboard"]
};

```

This will show items in sidebar in order:
1) Home
2) Configuration
3) Dashboard