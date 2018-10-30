// imports
const path = require('path');
const webpack = require('webpack');
const common = require('./common');

// Parse arguments
var parser = common.getArgumentParser();
var args = parser.parseArgs();

// Prepare config
var config = common.createConfigFromArgs(args);

// Build with webpack
const webpackConf = require(path.resolve(common.paths.conf_dir, 'webpack.build')).build(config);
webpack(webpackConf);

// TODO: Copy public folder
