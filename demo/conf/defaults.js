const path = require('path');


module.exports = {
	public_url: "",
	define: {
		"__API_URL__": "",
	},
	resolve: {
		alias: {
			"asab-webui-kit": path.resolve('asab-webui-kit/index.js')
		}
	},
	dev_proxy: {
		'/api': {
			target: 'http://localhost:8080',
			ws: true,
		},
	},
}

