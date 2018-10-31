// imports
const path = require('path');
const webpack = require('webpack');
const common = require('./common');

// Parse arguments
var parser = common.getArgumentParser();
var args = parser.parseArgs();

// Prepare config
var config = args;
if (args.config_file) {
	config = common.extendConfigWithSiteConfig(config, args.config_file)
	if (config == null)
		process.exit();
}

// Copy public folder
console.log("Copying public folder...");
common.copyPublicFolder(config);
console.log("OK");

// Build with webpack
console.log("Building sources...");
const webpackConf = require(path.resolve(__dirname, '..', 'conf', 'webpack.build.js')).build(config);
webpack(webpackConf).run((err, stats) => {
	var messages = common.getBuildMessages(err, stats);
	if (messages.errors.length) {
		console.error(messages);
	} else {
		console.log("OK");
	}
});



