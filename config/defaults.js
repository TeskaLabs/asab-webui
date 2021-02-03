const path = require('path');
const CWD = process.cwd();


module.exports = {
	app: {
		"publicUrl": "",	// Overriden by --public-url [PUBLIC_URL] command line argument
		// API_PATH: "api",
	},

	webpack: {
		resolve: {
			alias: {
				"asab-webui": path.resolve('asab-webui', 'src')
			}
		}
	},

	webpackDevServer: {
		host: "0.0.0.0", 	// Overriden by --dev-listen [HOST]:[PORT] command line argument
		port: 3000, 		// Overriden by --dev-listen [HOST]:[PORT] command line argument
	},

	dirs: {
		dist: path.resolve(CWD, 'dist'),		// Overriden by --dist-dir [DIST_DIR] command line argument
		public: path.resolve(CWD, 'public'),	// Overriden by --public-dir [PUBLIC_DIR] command line argument
		src: path.resolve(CWD, 'src'),			// Overriden by --src-dir [SRC_DIR] command line argument
	}

}
