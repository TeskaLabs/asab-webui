// imports
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require("./common");


module.exports = {
	build: function(config) {
		// paths
		const entry_path = path.resolve(config["dirs"]["src"], 'index.js');
		const html_template_path = path.resolve(config["dirs"]["public"], 'index.html');
		// TODO: This is temporary solution. It will be replaced by date-fns.
		let momentLocales = /en-gb|cs/; // Default locales
		if (config["app"]["momentLocales"]) {
			momentLocales = new RegExp(Object.values(config["app"]["momentLocales"]).join("|"));
		}

		return {
			entry: entry_path,
			mode: 'production',
			output: {
				filename: 'assets/js/[name].[chunkhash:8].js',
				chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js',
				path: path.resolve(config["dirs"]["dist"]),
				publicPath: '/',
			},
			resolve: config["webpack"]["resolve"],
			module: {
				rules: common.getRules(config)
			},
			plugins: [
				new webpack.DefinePlugin(
					common.JSONStringifyValues({
						"__CONFIG__": config["app"],
						"__DEV_CONFIG__": {}
					})
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
					common.convertKeysForHtml(config["app"])
					// Converts keys like this:
					// "publicUrl" -> "__PUBLIC_URL__"
					// "apiUrl" -> "__API_URL__"
				),
				// Extracts file styles.css
				new ExtractTextPlugin({
					filename: 'assets/css/styles.css',
					allChunks: true
				}),
				new UglifyJsPlugin({
					uglifyOptions: {
						output: {
						comments: false
						}
					}
				}),
				new OptimizeCssAssetsPlugin(),
				// Remove moment locales from bundle except those which are defined as second parameter
				new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, momentLocales),
				// Uncomment BundleAnalyzerPlugin in case you want to analyze bundle size (also uncomment import of this plugin above)
				// And comment it before making Pull Request/ Merge Request
				// new BundleAnalyzerPlugin()
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

