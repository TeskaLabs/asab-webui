const path = require('path');

module.exports = {
	webpack: {
		resolve: {
			alias: {
				"asab-webui-kit-lite": path.resolve(__dirname, '..', 'src')
			},
		},
	}
}

