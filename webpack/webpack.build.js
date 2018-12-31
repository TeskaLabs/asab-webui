// imports
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require("./common");


module.exports = {
	build: function(config) {
		// paths
		const entry_path = path.resolve(config.src_dir, 'index.js');
		const html_template_path = path.resolve(config.public_dir, 'index.html');

		return {
			entry: entry_path,
			mode: 'production',
			output: {
				filename: 'static/js/[name].[chunkhash:8].js',
				chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
				path: path.resolve(config.dist_dir)
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
					}, config.define))
				),
				new HtmlWebpackPlugin({
					template: html_template_path,
					minify: {
						removeComments: true,
						collapseWhitespace: true,
						removeRedundantAttributes: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
						removeStyleLinkTypeAttributes: true,
						keepClosingSlash: true,
						minifyJS: true,
						minifyCSS: true,
						minifyURLs: true,
					},
				}),
				new InterpolateHtmlPlugin(
					Object.assign({
						"__PUBLIC_URL__": config.public_url.replace(/\/+$/, ''),
					}, config.define)
				),
				// Extracts file styles.css
				new ExtractTextPlugin('static/css/styles.css'),
				new UglifyJsPlugin({
					uglifyOptions: {
						output: {
						comments: false
						}
					}
				}),
				new OptimizeCssAssetsPlugin()
			],
			optimization: {
				minimize: true,
				minimizer: [
					// Minimizes output javascript
					new TerserPlugin({
						terserOptions: {
							parse: {
								ecma: 8,
							},
							compress: {
								ecma: 5,
								warnings: false,
								comparisons: false,
								inline: 2
							},
							mangle: {
								safari10: true,
							},
							output: {
								ecma: 5,
								comments: false,
								ascii_only: true
							}
						}
					})
				]
			},
		};
	}
}

