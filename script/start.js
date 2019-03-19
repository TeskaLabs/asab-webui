// imports
const path = require('path');
const webpack = require('webpack');
const common = require('./common');
const WebpackDevServer = require('webpack-dev-server');

// Parse arguments
var parser = common.getArgumentParser();
var args = parser.parseArgs();

// Load config
var config = common.loadConfig(args)


// Compiler
const webpackConf = require(path.resolve(__dirname, '..', 'webpack', 'webpack.dev.js')).build(config);
const webpackDevServerConf = require(path.resolve(__dirname, '..', 'webpack', 'webpackDevServer.js')).build(config);
const compiler = webpack(webpackConf)

// Dev server
const devServer = new WebpackDevServer(compiler, webpackDevServerConf);
devServer.listen(config.webpackDevServer.port)
