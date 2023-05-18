const { execSync } = require("child_process");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

///
var exports = module.exports = {}

var camelToUnderscore = function(str) {
	return str.split(/(?=[A-Z])/).join('_');
}
///


exports.JSONStringifyValues = function(obj) {
	let ret = Object.assign({}, obj);
	for (key in ret)
		ret[key] = JSON.stringify(ret[key])
	return ret;
}

exports.getRules = function(config, mode) {
	return [
		{
			test: /\.(js)$/,
			use: [{
				loader: 'babel-loader',
				options: { presets: [[
					'@babel/preset-env', 
					{
						useBuiltIns: "entry",
						targets: {
							esmodules: true,
						},
						corejs: {
							version: "3",
							proposals: true
						}
					}],['@babel/react']],
					plugins: ["transform-object-rest-spread"],
					generatorOpts: { compact: false }
				}
			}],
			exclude: '/node_modules/' // we can exclude node_modules b/c they're already complied
		},
		{
			test: /\.(s[ac]|c)ss$/i,
			use: [
				MiniCssExtractPlugin.loader, //extracs CSS into files
				{
					loader: 'css-loader',
					options: { sourceMap: true }
				},
				{
					loader: 'postcss-loader',
					options: { sourceMap: true }
				},
				{
					loader: 'sass-loader',
					options: { sourceMap: true }
				}
			],
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			type: 'asset/resource',
			generator: {
				filename: 'svg/[name][contenthash:8][ext]',
				outputPath: mode === 'dev' ? '' : 'assets/'
			}
		},
		{
			test: /\.(woff|woff2|ttf|eot|ico)(\?.*)?$/,
			type: 'asset/resource',
			generator: {
				filename: 'fonts/[name][contenthash:8][ext]',
				outputPath: mode === 'dev' ? '' : 'assets/'
			}
		},
	]
}

exports.convertKeysForHtml = function(obj){
	var ret = {}
	Object.keys(obj).map(function(k){
		ret["__"+camelToUnderscore(k).toUpperCase()+"__"] = obj[k];
	})
	// TODO: remove trailing slash from URLs
	return ret;
}

exports.getVersion = function(){
	try {
		const stdout = execSync("git describe --abbrev=7 --tags --dirty=+dirty --always", { encoding: 'utf8' }).toString();
		return stdout;
	} catch (e) {
		console.log("Error when getting version from git. This error doesn't affect build process but you won't be able to see current git version of the repository");
		console.error(e);
		return "local";
	}
}

exports.getRepository = function(){
	try {
		const url = execSync("git config --get remote.origin.url", { encoding: 'utf8' }).toString();
		const suburl = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf(".git"));
		return suburl;
	} catch (e) {
		console.log("Error when getting repository from git. This error doesn't affect build process but you won't be able to see repository name");
		console.error(e);
		return undefined;
	}
}
