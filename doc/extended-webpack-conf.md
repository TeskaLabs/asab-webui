# Extending webpack configuration for specific project

In case you need to extend default `asab-webui` webpack confgiration you can use `asab-webui`'s rules for extending configuration.

First you need to create `asab-webui.config.js` file in root of your project. This file which will contain your extended configuration.

You can copy this file from `asab-webui/demo` or use template from below:
```js
module.exports = {
	extraEntries: { /* add more entries here */ },
	extraOutputs: { /* add more outputs here */ },
	extraPlugins: [ /* add more plugins here */ ],
	extraOptimization: { /* add more optimizations rules here */ },
	extraModule: {
		extraRules: [ /* add more module rules here */ ]
	}
};
```

After creating this file you can start to fill it up with your configuration.

## Important note

Please note that some of webpack configuration properties were renamed in order to avoid conflicts with default `asab-webui` webpack configuration. List of renamed properties can be found below in `Renamed properties` section.
However you still can replace default configuration with your own but in this case we cannot guarantee that your build will run smoothly. So this is recommended only in case you know what you're doing.

Example of completely rewriting optimization properties and module rules property (but keep other default module properties) instead of extending default `asab-webui` optimization properties and module rules:
```js
module.exports = {
	optimization: {/* Your optimization configuration that will replace default optimication */},
	extraModule: {
		rules: [ /* Your rules that will replace default module.rules */ ]
	}
}
```

## Renamed properties

```
entry -> extraEntries
output -> extraOutputs
plugins -> extraPlugins
optimization -> extraOptimization
module -> extraModule
module.rules -> extraModule.extraRules
```