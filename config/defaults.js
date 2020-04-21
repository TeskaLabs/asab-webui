const path = require('path');
const CWD = process.cwd();


module.exports = {
	app: {
		"publicUrl": "",	// Overriden by --public-url [PUBLIC_URL] command line argument
		"title": "TeskaLabs ASAB Web UI Kit",
	},

	webpack: {
		resolve: {
			alias: {
				"asab-webui-kit-lite": path.resolve('asab-webui-kit-lite', 'src'),
				"bitswan-webui": path.resolve(__dirname, '..', '..', 'bitswan-webui', 'src', 'modules')
			}
		}
	},

	webpackDevServer: {
		host: "0.0.0.0", 	// Overriden by --dev-listen [HOST]:[PORT] command line argument
		port: 3000, 		// Overriden by --dev-listen [HOST]:[PORT] command line argument
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				ws: true,
			},
		}
	},

	dirs: {
		dist: path.resolve(CWD, 'dist'),		// Overriden by --dist-dir [DIST_DIR] command line argument
		public: path.resolve(CWD, 'public'),	// Overriden by --public-dir [PUBLIC_DIR] command line argument
		src: path.resolve(CWD, 'src'),			// Overriden by --src-dir [SRC_DIR] command line argument
	}

}
