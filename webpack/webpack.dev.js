// imports
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require("./common");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
	build: function(config) {
		// paths
		console.log(config);
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
				alias: {
					"asab-webui-kit": path.resolve('asab-webui-kit/asab-webui-kit/index.js')
				}
			},
			module: {
				rules: common.getRules(config)
			},
			plugins: [
				new webpack.DefinePlugin(
					common.JSONStringifyValues(Object.assign({
						"__PUBLIC_URL__": config.public_url.replace(/\/+$/, '')
					}), config.define)
				),
				new HtmlWebpackPlugin({
					template: html_template_path
				}),
				new InterpolateHtmlPlugin(
					Object.assign({
						"__PUBLIC_URL__": config.public_url.replace(/\/+$/, ''),
					}, config.define)
				),
				// Extracts file styles.css
				new ExtractTextPlugin('static/css/styles.css'),
				// Minimizes styles.css
				// new OptimizeCssAssetsPlugin()
			]
		};
	}
}

