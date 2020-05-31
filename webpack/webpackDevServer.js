const path = require('path');
const escape = require('escape-string-regexp');

function allButDir(appSrc) {
  return new RegExp(
    `^(?!${escape(
      path.normalize(appSrc + '/').replace(/[\\]+/g, '/')
    )}).+/node_modules/`,
    'g'
  );
};

module.exports = {
	build: function(config) {
		return Object.assign(
			{
				// var disableHostCheck = !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true';
				// disableHostCheck: disableHostCheck
				compress: true,
				clientLogLevel: 'none',
				contentBase: config.dirs.public,
				watchContentBase: true,
				hot: true,
				publicPath: '/',
				quiet: true,
				watchOptions: {
					ignored: allButDir(config.dirs.src),
				},
				overlay: false,
				historyApiFallback: {
					disableDotRule: true,
				},
			},
			config.webpackDevServer
		);
	}
}
