const path = require('path');


module.exports = {
	config: {
		"publicUrl": "",
		"apiUrl": "",
		"multitenancy": false,
	},
	resolve: {
		alias: {
			"asab-webui-kit": path.resolve('asab-webui-kit/index.js'),
			"asab-webui-kit-lite": path.resolve('asab-webui-kit/index.js')
		}
	},
	dev_proxy: {
		'/api': {
			target: 'http://localhost:8080',
			ws: true,
		},
	},
}

