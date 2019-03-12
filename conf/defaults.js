const path = require('path');
const CWD = process.cwd();


module.exports = {
	app: {
		"publicUrl": "",
	},

	webpack: {
		resolve: {
			alias: {
				"asab-webui-kit-lite": path.resolve('asab-webui-kit')
			}
		}
	},

	webpackDevServer: {
		host: "0.0.0.0", // Overriden by --dev-listen [HOST]:[PORT] command line argument
		port: 3000, // Overriden by --dev-listen [HOST]:[PORT] command line argument
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				ws: true,
			},
		}
	},


}

