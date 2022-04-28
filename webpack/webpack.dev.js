// imports
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
		console.log(config);
		const entry_path = path.resolve(config["dirs"]["src"], 'index.js');
		const html_template_path = path.resolve(config["dirs"]["public"], 'index.html');
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
			// Extracts file styles.css
			new MiniCssExtractPlugin({ filename: 'assets/css/styles.css' }),
			
			// Remove moment locales from bundle except those which are defined as second parameter
			new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, defaultLocales),
		];

		return {
			entry: {
				app: entry_path,
				...extendedConfig.entry
			},
			mode: 'development',
			watch: true,
			output: {
				filename: 'assets/js/[name].bundle.js',
				chunkFilename: 'assets/js/[name].chunk.js',
				path: config["dirs"]["dist"],
				publicPath: '/',
				// Point sourcemap entries to original disk location (format as URL on Windows)
				devtoolModuleFilenameTemplate: info =>
					path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
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
					chunks: 'all',
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
				...extendedConfig.optimization
			}
		};
	}
}
