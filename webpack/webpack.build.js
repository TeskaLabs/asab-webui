// imports
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./common");

// initial extended configuration
let extendedConfig = {
	extraEntries: {},
	extraOutputs: {},
	extraPlugins: [],
	extraOptimization: {},
	extraModule: {
		extraRules: []
	}
};

const listOfRenamedProps = ["extraEntries", "extraOutputs", "extraPlugins", "extraOptimization", "extraModule"];

// load extended configuration
try {
	extendedConfig = { ...extendedConfig, ...require("../../asab-webui.config") };
	console.log("Extended webpack configuration has been loaded.");
} catch {
	console.log("Extended webpack configuration hasn't been found.");
}

module.exports = {
	build: function(config) {
		// version and build date of the app
		const version = common.getVersion();
		const repository = common.getRepository();
		const buildDate = new Date();
		// paths
		const entry_path = path.resolve(config["dirs"]["src"], 'index.js');
		const html_template_path = path.resolve(config["dirs"]["public"], 'index.html');
		// TODO: This is temporary solution. It will be replaced by date-fns.
		let defaultLocales = /cs/; // Default moment locales (needed for backward compatibility)

		const globalVars = new webpack.DefinePlugin(
			common.JSONStringifyValues({
				"__CONFIG__": config["app"],
				"__DEV_CONFIG__": {},
				"__VERSION__": version,
				"__BUILD_DATE__": buildDate,
				"__REPOSITORY__": repository
			})
		);

		const defaultPlugins = [
			new HtmlWebpackPlugin({
				template: html_template_path,
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					minifyJS: true,
					minifyCSS: true
					// TODO: eventually uncomment for better performance of the page
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeStyleLinkTypeAttributes: true,
					// keepClosingSlash: true,
					// minifyURLs: true
				}
			}),
			new InterpolateHtmlPlugin(
				common.convertKeysForHtml(config["app"])
				// Converts keys like this:
				// "publicUrl" -> "__PUBLIC_URL__"
				// "apiUrl" -> "__API_URL__"
			),
			/*
				Extracts `.css` files.
				CSS files are generated to folder `'build/assets/'` on purpose. Generating them to `'build/assets/css/'` causes issues with fonts, icons and images (defined in `webpack/common.js`). Webpack then creates path for such files as a combination of folders configured under 'filename' here in MiniCssExtractPlugin and in Asset Module's generator. E.g. svg files paths end up as a combination of `'assets/css/'` and `'svg/'` resulting in invalid path `'build/assets/css/svg'`.
			*/
			new MiniCssExtractPlugin({ filename: 'assets/[name].[contenthash:8].css' }),
			// Remove moment locales from bundle except those which are defined as second parameter
			new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, defaultLocales),
		];

		const filteredExtendedConfig = {...extendedConfig};
		listOfRenamedProps.forEach(prop => delete filteredExtendedConfig[prop]);

		const newModule = {...extendedConfig.extraModule};
		delete newModule.extraRules;

		return {
			entry: {
				app: entry_path,
				...extendedConfig.extraEntries
			},
			mode: 'production',
			output: {
				filename: 'assets/js/[name].[contenthash:8].bundle.js',
				chunkFilename: 'assets/js/[name].[contenthash:8].chunk.js',
				path: path.resolve(config["dirs"]["dist"]),
				publicPath: '',
				...extendedConfig.extraOutputs
			},
			resolve: config["webpack"]["resolve"],
			module: {
				rules: [
					{
						test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
						type: 'asset/resource',
						generator: {
							filename: 'svg/[name][contenthash:8][ext]',
							outputPath: 'assets/'
						}
					},
					{
						test: /\.(woff|woff2|ttf|eot|ico)(\?.*)?$/,
						type: 'asset/resource',
						generator: {
							filename: 'fonts/[name][contenthash:8][ext]',
							outputPath: 'assets/'
						}
					},
					...common.getRules(config),
					...extendedConfig.extraModule.extraRules
				],
				...newModule
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
				minimize: true,
				minimizer: [
					// Minimizes output javascript
					new TerserPlugin({
						test: /\.js(\?.*)?$/i,
						parallel: true,
						minify: TerserPlugin.terserMinify,
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
							format: {
								comments: false,
							},
						},
						extractComments: false,
					}),
					new CssMinimizerPlugin(),
					// `...` applies webpack's default minimizers which would otherwise be completely overwritten by our config
					`...`
				],
				...extendedConfig.extraOptimization
			},
			...filteredExtendedConfig
		};
	}
}
