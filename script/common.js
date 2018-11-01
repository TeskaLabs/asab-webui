const path = require('path');
const extend = require('extend');
const fs = require('fs-extra');
const ArgumentParser = require('argparse').ArgumentParser;
const formatWebpackMessages = require('./lib/formatWebpackMessages');

///
var exports = module.exports = {}
///

exports.getArgumentParser = function() {
	const CWD = process.cwd()
	var parser = new ArgumentParser();
	parser.addArgument(['-c', '--config-file'], {
			help: 'Config file'
		}
	);
	parser.addArgument(['-s', '--src-dir'], {
			help: 'Directory with jsx sources where index.js resides.',
		}
	);
	parser.addArgument(['-p', '--public-dir'], {
			help: 'Directory with public files like index.html.',
		}
	);
	parser.addArgument(['-d', '--dist-dir'], {
			help: 'Distribution directory where application is going to be built to.',
		}
	);
	return parser;
}

var getSiteConfig = function(configFile) {
	var _config = {};
	try {
		if (configFile.startsWith('/'))
			return require(configFile)
		else
			return require(path.resolve(process.cwd(), configFile));
	} catch (err) {
		if (configFile.length > 0) {
			console.error("Couldn't load config file \""+configFile+"\". "+err);
		}
		return null;
	}
}

exports.loadConfig = function(args) {
	// Prepare config
	var config = {}
	// Defaults
	extend(config, require(path.resolve(__dirname, '..', 'conf', 'configDefaults')));
	// Site config
	if (args.config_file) {
		var siteConfig = getSiteConfig(args.config_file)
		if (siteConfig)
			extend(config, siteConfig)
		else
			process.exit();
	}
	// Args
	for (key in args) {
		if (args[key] != null && args.isset(key)) {
			config[key] = args[key]
		}
	}
	return config
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
	fs.copySync(config.public_dir, config.dist_dir, {
		dereference: true,
		filter: file => file !== path.resolve(config.public_dir, 'index.html'),
	});
}
