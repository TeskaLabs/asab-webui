const path = require('path');

module.exports = {
	resolve: {
		alias: {
			"asab-webui-kit": path.resolve('.'),
			"asab-webui-kit-lite": path.resolve('.')
		},
		// modules: [
		// 	path.resolve('..'),
		// 	'node_modules',
		// ]
	},
}

