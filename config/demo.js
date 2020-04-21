const path = require('path');

module.exports = {
	webpack: {
		resolve: {
			alias: {
				"asab-webui-kit-lite": path.resolve(__dirname, '..', 'src'),
				"bitswan-webui": path.resolve(__dirname, '..', '..', 'bitswan-webui', 'src', 'modules')
			},
		},
	}
}

