const ExtractTextPlugin = require("extract-text-webpack-plugin");

///
var exports = module.exports = {}
///


exports.JSONStringifyValues = function(obj) {
	let ret = Object.assign({}, obj);
	for (key in ret)
		ret[key] = JSON.stringify(ret[key])
	return ret;
}

exports.getRules = function(config) {
	return [
		{
			test: /\.(js)$/,
			use: [{
				loader: 'babel-loader',
				options: { presets: [['@babel/env'],['@babel/react']], plugins: ["transform-object-rest-spread"] }
			}]
		},
		{
			test: /\.(css)$/,
			use: ExtractTextPlugin.extract({fallback: 'style-loader', use:'css-loader'})
		},
		{
			test: /\.(scss|sass)$/,
			use: ExtractTextPlugin.extract({fallback: 'style-loader', use:['css-loader', 'sass-loader']}),
		},
		{
			test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*)?$/,
			use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[hash].[ext]',
						publicPath: config.public_url.replace(/\/+$/, '')+'/assets/',
						outputPath: 'assets/',
					}
			}]
		},
	]
}
