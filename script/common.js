const path = require('path');
const CWD = process.cwd();
const fs = require('fs-extra');
const ArgumentParser = require('argparse').ArgumentParser;
const formatWebpackMessages = require('./lib/formatWebpackMessages');
const assigndeep = require('assign-deep');

///
var exports = module.exports = {}
///

exports.getArgumentParser = function() {
	const CWD = process.cwd()
	var parser = new ArgumentParser();
	parser.addArgument(['--conf-dir'], {
			help: 'A directory that contains defaults.js configuration file.'
		}
	);
	parser.addArgument(['-c', '--conf-file'], {
			help: 'Full or relative path to a config file that extends defaults. (Default: ./config/config.js)'
		}
	);
	parser.addArgument(['-d', '--dist-dir'], {
			help: 'Directory where application will be built',
		}
	);
	parser.addArgument(['-p', '--public-dir'], {
			help: 'Directory with index.html and static files',
		}
	);
	parser.addArgument(['-s', '--src-dir'], {
			help: 'Sources directory',
		}
	);
	parser.addArgument(['-u', '--public-url'], {
			help: 'URL where application will be deployed',
		}
	);
	parser.addArgument(['--dev-listen'], {
			help: 'Host and port where webpack dev server listens at, such as "0.0.0.0:3000"',
		}
	);
	return parser;
}

var loadConfigFromFile = function(configFile) {
	try {
		if (configFile.startsWith('/'))
			return require(configFile)
		else
			return require(path.resolve(process.cwd(), configFile));
	} catch (err) {
		return null;
	}
}

var evalFuncInObj = function(obj) {
	var ret = {}
	var keys = Object.keys(obj);
	for (var i in keys) {
		var key = keys[i];
		if (key && typeof obj[key] === "function")
			ret[key] = obj[key](config)
		else if (key && typeof obj[key] === "object")
			ret[key] = evalFuncInObj(obj[key])
		else
			ret[key] = obj[key]
	}
	return ret;
}

exports.loadConfig = function(args) {
	// Prepare config
	// var config = {
	// 	conf_dir: args.conf_dir ? args.conf_dir : path.resolve(CWD, 'conf'),		// --conf-dir CONF_DIR
	// 	dist_dir: path.resolve(CWD, 'dist'),		// -d --dist-dir DIST_DIR
	// 	public_dir: path.resolve(CWD, 'public'),	// -p --public-dir PUBLIC_DIR
	// 	src_dir: path.resolve(CWD, 'src'),			// -s --src-dir SRC_DIR
	// 	public_url: '',								// -u --public-url PUBLIC_URL

	// 	dev_https: false,
	// 	dev_listen: '0.0.0.0:3000',					// --dev-listen DEV_LISTEN
	// 	dev_proxy: {},

	// }

	var config = {};

	// Load defaults
	config = Object.assign(config, require(path.resolve(__dirname, '..', 'config','defaults')));

	// Load config file, if specified in command line argument
	// arg: -c [FILE] / --conf-file [FILE]
	if(args.conf_file) {
		var cf = args.conf_file
		if (!cf.startsWith('/'))
			cf = path.resolve(CWD, cf)

		var confFileConfig = loadConfigFromFile(cf)
		if (confFileConfig) {
			config = assigndeep(config, confFileConfig);
		}
		else {
			console.error("Couldn't load config file: "+args.conf_file);
			process.exit();
		}
	}

	// Otherwise attempt to load ${conf_dir}/config.js
	// arg: --conf-dir [DIR]
	else {
		confDir = args.conf_dir ?
				  args.conf_dir : path.resolve(CWD, 'conf');
		confDirConfig = loadConfigFromFile(path.resolve(confDir, 'config.js'));
		if (confDirConfig !== null)
			config = assigndeep(config, confDirConfig);
	}

	// Load args
	if (args.public_dir)	config["dirs"]["public"] = args.public_dir;
	if (args.dist_dir)		config["dirs"]["dist"] = args.dist_dir;
	if (args.src_dir)		config["dirs"]["src"] = args.src_dir;
	if (args.public_url)	config["app"]["publicUrl"] = args.public_url;
	if (args.dev_listen) {
		config["webpackDevServer"]["host"] = args.dev_listen.split(":")[0];
		config["webpackDevServer"]["port"] = parseInt(args.dev_listen.split(":")[1]);
	}

	// Expand functions
	config = evalFuncInObj(config);
	return config;
}


exports.getBuildMessages = function(err, stats) {
	var messages;
	if (err) {
		if (!err.message) {
			return null;
			// return reject(err);
		}
		messages = formatWebpackMessages({
			errors: [err.message],
			warnings: [],
		});
	} else {
		messages = formatWebpackMessages(
			stats.toJson({ all: false, warnings: true, errors: true })
		);
	}
	return messages;
}

exports.copyPublicFolder = function(config) {
	fs.copySync(config["dirs"]["public"], config["dirs"]["dist"], {
		dereference: true,
		filter: file => file !== path.resolve(config["dirs"]["public"], 'index.html'),
	});
}
