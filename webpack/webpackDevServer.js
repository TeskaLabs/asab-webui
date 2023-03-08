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
				compress: true,
				hot: true,
				devMiddleware: {
					publicPath: '/'
				},
				historyApiFallback: {
					disableDotRule: true,
				},
				client: {
					overlay: false,
					logging: 'none'
				  },
				static: {
					directory: config.dirs.public,
					watch: {ignored: allButDir(config.dirs.src)},
				}
			},
			config.webpackDevServer
		);
	}
}
