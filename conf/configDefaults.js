const path = require('path');
const CWD = process.cwd()

module.exports = {
	public_dir: path.resolve(CWD, 'public'),
	dist_dir: path.resolve(CWD, 'dist'),
	src_dir: path.resolve(CWD, 'src'),

	public_url: '',

	dev_https: false, // Whether or not the dev server should run in https mode
	dev_host: '0.0.0.0', // Host where dev server listens at
	dev_port: 3000, // Dev server port
}
