// imports
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

// constants
const mode = 'production';

// dirs
const dist_dir = path.resolve(__dirname, 'dist');
const src_dir  = path.resolve(__dirname, 'src');
const out_dir  = path.resolve(dist_dir, 'demo');

// filenames
const out_file = 'index.js';

// paths
const entry_path = path.resolve(src_dir, 'demo', 'src', 'index.js');
const babel_conf_path = path.resolve(__dirname, 'babel.conf.js');


module.exports = {
	entry: entry_path,
	mode: mode,
	output: {
		filename: out_file,
		path: out_dir
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'src'), // So that we can require('asab-webui-kit')
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: require(babel_conf_path)
			}
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
			template: path.resolve(src_dir, 'demo/public/index.html')
		}),
		new InterpolateHtmlPlugin({
			'PUBLIC_URL': 'kek'
		})
	]

};
