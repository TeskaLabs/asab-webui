// imports
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require("./common");

// extended configuration template
let extendedConfig = {
	entry: {},
	output: {},
	extraPlugins: [],
	optimization: {},
	module: {
		extraRules: []
	}
};

// load extended configuration
try {
	extendedConfig = { ...extendedConfig, ...require("../../asab-webui.config") } ;
	console.log("Extended webpack configuration has been loaded.");
} catch {
	console.log("Extended webpack configuration hasn't been found.");
}

module.exports = {
	build: function(config) {
		// version and build date of the app
		const version = common.getVersion();
		const buildDate = new Date();
		// paths
		const entry_path = path.resolve(config["dirs"]["src"], 'index.js');
		const html_template_path = path.resolve(config["dirs"]["public"], 'index.html');
		// TODO: This is temporary solution. It will be replaced by date-fns.
		let defaultLocales = /cs/; // Default moment locales (needed for backward compatibility)

		const globalVars = new webpack.DefinePlugin(
			common.JSONStringifyValues(Object.assign({
				"__CONFIG__": config["app"],
				"__DEV_CONFIG__": config["devConfig"],
				"__VERSION__": version,
				"__BUILD_DATE__": buildDate
			}))
		);

		const defaultPlugins = [
			new HtmlWebpackPlugin({
				template: html_template_path
			}),
			new InterpolateHtmlPlugin(
				common.convertKeysForHtml(config["app"])
				// Converts keys like this:
				// "publicUrl" -> "__PUBLIC_URL__"
				// "apiUrl" -> "__API_URL__"
			),
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments: false
					}
				}
			}),
			// Extracts file styles.css
			new MiniCssExtractPlugin({ filename: 'assets/css/styles.css' }),
			new OptimizeCssAssetsPlugin(),
			// Remove moment locales from bundle except those which are defined as second parameter
			new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, defaultLocales),
		];

		return {
			entry: {
				app: entry_path,
				...extendedConfig.entry
			},
			mode: 'production',
			output: {
				filename: 'assets/js/[name].[contenthash].bundle.js',
				chunkFilename: 'assets/js/[name].[contenthash].chunk.js',
				path: path.resolve(config["dirs"]["dist"]),
				publicPath: '',
				...extendedConfig.output
			},
			resolve: config["webpack"]["resolve"],
			module: {
				rules: [
					...common.getRules(config),
					...extendedConfig.module.extraRules
				]
			},
			plugins: [
				globalVars,
				...defaultPlugins,
				...extendedConfig.extraPlugins
			],
			optimization: {
				splitChunks: {
					chunks: "all",
					cacheGroups: {
						vendor: {
							name: 'vendors',
							test: /[\\/]node_modules[\\/]((?!(date-fns)).*)[\\/]/,
							chunks: 'all',
							enforce: true
						},
						commons: {
							test: /[\\/]node_modules[\\/]/,
							name(module, chunks, cacheGroupKey) {
							  const moduleFileName = module
								.identifier()
								.split('/')
								.reduceRight((item) => item);
							  const allChunksNames = chunks.map((item) => item.name).join('~');
							  return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
							},
							chunks: 'all',
						},
					}
				},
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
				],
				...extendedConfig.optimization
			},
		};
	}
}
