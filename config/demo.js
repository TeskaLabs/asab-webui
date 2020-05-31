const path = require('path');

module.exports = {
	webpack: {
		resolve: {
			alias: {
				"asab-webui": path.resolve(__dirname, '..', 'src')
			},
		},
	}
}

