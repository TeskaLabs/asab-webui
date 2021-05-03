// imports
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require("./common");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
	build: function(config) {
		// paths
		console.log(config);
		const entry_path = path.resolve(config["dirs"]["src"], 'index.js');
		const html_template_path = path.resolve(config["dirs"]["public"], 'index.html');
		// TODO: This is temporary solution. It will be replaced by date-fns.
		let momentLocales = /en-gb|cs/; // Default locales
		if (config["app"]["momentLocales"]) {
			momentLocales = new RegExp(Object.values(config["app"]["momentLocales"]).join("|"));
		}

		return {
			entry: entry_path,
			mode: 'development',
			watch: true,
			output: {
				filename: 'assets/js/bundle.js',
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
				new ExtractTextPlugin('assets/css/styles.css'),
				// Minimizes styles.css
				// new OptimizeCssAssetsPlugin()
				// Remove moment locales from bundle except those which are defined as second parameter
				new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, momentLocales),
				// Uncomment BundleAnalyzerPlugin in case you want to analyze bundle size (also uncomment import of this plugin above)
				// And comment it before making Pull Request/ Merge Request
				// new BundleAnalyzerPlugin()
			]
		};
	}
}

