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
	parser.addArgument(['-r', '--root-dir'], {
			defaultValue: CWD,
			help: 'Root directory of your project',
		}
	);
	parser.addArgument(['-s', '--src-dir'], {
			defaultValue: path.resolve(CWD, 'src'),
			help: 'Directory with jsx sources where index.js resides.',
		}
	);
	parser.addArgument(['-p', '--public-dir'], {
			defaultValue: path.resolve(CWD, 'public'),
			help: 'Directory with public files like index.html.',
		}
	);
	parser.addArgument(['-d', '--dist-dir'], {
			defaultValue: path.resolve(CWD, 'dist'),
			help: 'Distribution directory where application is going to be built to.',
		}
	);
	return parser;
}

exports.extendConfigWithSiteConfig = function(config, configFile) {
	// Extend config with site configuration
	var _config = {};
	try {
		if (configFile.startsWith('/'))
			extend(_config, config, require(configFile))
		else
			extend(_config, config, require(path.resolve(process.cwd(), configFile)))
	} catch (err) {
		if (configFile.length > 0) {
			console.error("Couldn't load config file \""+configFile+"\". "+err);
		}
		return null;
	}
	return _config;

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
