const path = require('path');
const escape = require('escape-string-regexp');

function ignoredFiles(appSrc) {
  return new RegExp(
    `^(?!${escape(
      path.normalize(appSrc + '/').replace(/[\\]+/g, '/')
    )}).+/node_modules/`,
    'g'
  );
};

module.exports = {
	build: function(config) {

		const listenParts = config.dev_listen.split(":");
		const listenHost = listenParts[0],
			  listenPort = parseInt(listenParts[1]);

		if (!config.dev_host)
			config.dev_host = listenHost;
		if (!config.dev_port)
			config.dev_port = listenPort;

		return {
			// var disableHostCheck = !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';
			// disableHostCheck: disableHostCheck
			compress: true,
			clientLogLevel: 'none',
			contentBase: config.public_dir,
			watchContentBase: true,
			hot: true,
			publicPath: '/',
			quiet: true,
			watchOptions: {
				ignored: ignoredFiles(config.src_dir),
			},
			overlay: false,
			historyApiFallback: {
				disableDotRule: true,
			},
			https: config.dev_https,
			host: config.dev_host,
			proxy: config.dev_proxy,
		};
	}
}
