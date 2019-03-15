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
		var c = Object.assign({
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
				ignored: ignoredFiles(config.dirs.src),
			},
			overlay: false,
			historyApiFallback: {
				disableDotRule: true,
			},
		}, config.webpackDevServer);

		console.log(c);
		return c;
	}
}
