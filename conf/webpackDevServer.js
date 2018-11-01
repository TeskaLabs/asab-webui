module.exports = {
	build: function(config) {
		// var disableHostCheck = !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';

		return {
			// disableHostCheck: disableHostCheck
			compress: true,
			clientLogLevel: 'none',
			contentBase: config.public_dir,
			watchContentBase: true,
			hot: true,
			publicPath: '/', // the dafault is '/'
			quiet: true,
			// watchOptions: {
			// 	ignored: ignoredFiles(paths.appSrc),
			// },
			https: config.dev_https,
			host: config.dev_host,
			overlay: false,
			historyApiFallback: {
				disableDotRule: true,
			},
			// public: allowedHost,
			// proxy,
			// before(app, server) {
			// 		if (fs.existsSync(paths.proxySetup)) {
			// 		// This registers user provided middleware for proxy reasons
			// 		require(paths.proxySetup)(app);
			// 	}

			// 	app.use(evalSourceMapMiddleware(server));
			// 	app.use(errorOverlayMiddleware());
			// 	app.use(noopServiceWorkerMiddleware());
			// },
		};
	}
}
