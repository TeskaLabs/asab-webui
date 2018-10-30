const path = require('path');
const ArgumentParser = require('argparse').ArgumentParser;

///
var exports = module.exports = {}
///

exports.getArgumentParser = function() {
	const CWD = process.cwd()
	var parser = new ArgumentParser();
	parser.addArgument(['-c', '--config'], {
			help: 'Config file'
		}
	);
	parser.addArgument(['-r', '--root-dir'], {
			defaultValue: CWD
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
	return parser;
}

exports.createConfigFromArgs = function(args) {
	var config = {
		root_dir: args.root_dir,
		src_dir: args.src_dir,
		public_dir: args.public_dir
	}

	// Extend config with site configuration
	if (args.config) {
		var _config = {};
		try {
			if (configFile.startsWith('/'))
				extend(config, require(configFile))
			else
				extend(config, require(path.resolve(process.cwd(), configFile)))
		} catch (err) {
			if (configFile.length > 0) {
				console.error("Config file "+configFile+" not found.");
				// Terminate
				process.exit();
			}
			return null;
		}
	}
}
