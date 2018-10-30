// imports
const path = require('path');
const extend = require('extend');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const common = require('./common');


module.exports = {
	build: function(_config) {
		// Enrich given config with default values
		var config = {}
		extend(config, common.defaults, _config);
		// paths
		const entry_path = path.resolve(common.dirs.demo_src_dir, 'index.js');
		const html_template_path = path.resolve(common.dirs.demo_dir, 'public', 'index.html');


		return {
			entry: entry_path,
			mode: 'production',
			output: {
				filename: 'static/js/[name].[chunkhash:8].js',
				chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
				path: common.dirs.demo_out_dir
			},
			resolve: {
				modules: [
					'node_modules',
					common.dirs.src_dir, // So that we can require('asab-webui-kit')
				]
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						options: require(common.paths.babel_conf_path)
					},
				]
			},
			plugins: [
				new UglifyJsPlugin({
					uglifyOptions: {
						output: {
						comments: false
						}
					}
				}),
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

