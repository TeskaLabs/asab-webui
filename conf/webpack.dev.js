// imports
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const constants = require('./constants');


module.exports = {
	build: function(config) {
		// paths
		const entry_path = path.resolve(config.src_dir, 'index.js');
		const html_template_path = path.resolve(config.public_dir, 'index.html');

		return {
			entry: entry_path,
			mode: 'development',
			watch: true,
			output: {
				filename: 'static/js/bundle.js',
				chunkFilename: 'static/js/[name].chunk.js',
				path: config.dist_dir,
				// Point sourcemap entries to original disk location (format as URL on Windows)
				devtoolModuleFilenameTemplate: info =>
					path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
			},
			resolve: {
				modules: [
					'node_modules',
				],
				alias: {
					'asab-webui-kit': constants.lib_src_dir,
				}
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						options: require(constants.babel_conf_path)
					},
				]
			},
			plugins: [
				new HtmlWebpackPlugin({
					template: html_template_path
				}),
				new InterpolateHtmlPlugin({
					'PUBLIC_URL': config.public_url.replace(/\/+$/, '')
				})
			]
		};
	}
}

