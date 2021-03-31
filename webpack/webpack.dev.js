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
		const entry_path = path.resolve(config["dirs"]["src"], 'index.js');
		const html_template_path = path.resolve(config["dirs"]["public"], 'index.html');

		return {
			entry: entry_path,
			mode: 'development',
			watch: true,
			output: {
				filename: 'static/js/bundle.js',
				chunkFilename: 'static/js/[name].chunk.js',
				path: config["dirs"]["dist"],
				publicPath: '/',
				// Point sourcemap entries to original disk location (format as URL on Windows)
				devtoolModuleFilenameTemplate: info =>
					path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
			},
			resolve: config["webpack"]["resolve"],
			module: {
				rules: common.getRules(config)
			},
			plugins: [
				new webpack.DefinePlugin(
					common.JSONStringifyValues(Object.assign({
						"__CONFIG__": config["app"],
						"__DEV_CONFIG__": config["devConfig"]
					}))
				),
				new HtmlWebpackPlugin({
					template: html_template_path
				}),
				new InterpolateHtmlPlugin(
					common.convertKeysForHtml(config["app"])
					// Converts keys like this:
					// "publicUrl" -> "__PUBLIC_URL__"
					// "apiUrl" -> "__API_URL__"
				),
				// Extracts file styles.css
				new ExtractTextPlugin('static/css/styles.css'),
				// Minimizes styles.css
				// new OptimizeCssAssetsPlugin()
			]
		};
	}
}

