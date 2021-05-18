// imports
const path = require('path');
const webpack = require('webpack');
const common = require('./common');
const createBuildDescriptor = require("./lib/createBuildDescriptor");

// Parse arguments
var parser = common.getArgumentParser();
var args = parser.parseArgs();

// Load config
var config = common.loadConfig(args)

// Copy public folder
console.log("Copying public folder...");
common.copyPublicFolder(config);
console.log("OK");

// Build with webpack
console.log("Building sources...");
const webpackConf = require(path.resolve(__dirname, '..', 'webpack', 'webpack.build.js')).build(config);
webpack(webpackConf).run((err, stats) => {
	var messages = common.getBuildMessages(err, stats);
	if (messages.errors.length) {
		console.error(messages);
	} else {
		console.log("OK");
		createBuildDescriptor(config);
	}
});



