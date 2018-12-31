const path = require('path');
const CWD = process.cwd();
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
	parser.addArgument(['--conf-dir'], {
			help: 'A directory that contains defaults.js configuration file.'
		}
	);
	parser.addArgument(['-c', '--conf-file'], {
			help: 'Full or relative path to a config file that extends defaults.'
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
	var config = {
		conf_dir: args.conf_dir ? args.conf_dir : path.resolve(CWD, 'conf'),		// --conf-dir CONF_DIR
		dist_dir: path.resolve(CWD, 'dist'),		// -d --dist-dir DIST_DIR
		public_dir: path.resolve(CWD, 'public'),	// -p --public-dir PUBLIC_DIR
		src_dir: path.resolve(CWD, 'src'),			// -s --src-dir SRC_DIR
		public_url: '',								// -u --public-url PUBLIC_URL

		dev_https: false,
		dev_listen: '0.0.0.0:3000',					// --dev-listen DEV_LISTEN
		dev_proxy: {},

		define: {},
		resolve: {},
	}
	// Defaults
	extend(config, require(path.resolve(config.conf_dir, 'defaults')));
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
	// Expand functions
	for (key in config) {
		if (key && typeof config[key] === "function")
			config[key] = config[key](config)
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
