// imports
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require("./common");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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

		return {
			entry: entry_path,
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
			},
			resolve: config["webpack"]["resolve"],
			module: {
				rules: common.getRules(config)
			},
			plugins: [
				new webpack.DefinePlugin(
					common.JSONStringifyValues(Object.assign({
						"__CONFIG__": config["app"],
						"__DEV_CONFIG__": config["devConfig"],
						"__VERSION__": version,
						"__BUILD_DATE__": buildDate
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
				new MiniCssExtractPlugin({ filename: 'assets/css/styles.css' }),
				// Minimizes styles.css
				// new OptimizeCssAssetsPlugin()
				// Remove moment locales from bundle except those which are defined as second parameter
				new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, defaultLocales),
				// Uncomment BundleAnalyzerPlugin in case you want to analyze bundle size (also uncomment import of this plugin above)
				// And comment it before making Pull Request/ Merge Request
				// new BundleAnalyzerPlugin()
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
			}
		};
	}
}
