const path = require('path');

//// defaults
const public_url = '';


//// dirs
const root_dir = path.resolve(__dirname, '..');
const dist_dir = path.resolve(root_dir, 'dist');
const src_dir  = path.resolve(root_dir, 'src');
const conf_dir  = path.resolve(root_dir, 'conf');
// demo
const demo_dir = path.resolve(src_dir, 'demo');
const demo_src_dir = path.resolve(demo_dir, 'src');
const demo_pub_dir = path.resolve(demo_dir, 'public');
const demo_out_dir  = path.resolve(dist_dir, 'demo');
// lib
const lib_src_dir = path.resolve(src_dir, 'asab-webui-kit');
const lib_out_dir  = path.resolve(dist_dir, 'asab-webui-kit');


//// paths
const babel_conf_path = path.resolve(conf_dir, 'babel.conf.js');


////
module.exports = {
	defaults: {
		public_url: public_url,
	},
	dirs: {
		root_dir: root_dir,
		dist_dir: dist_dir,
		src_dir: src_dir,
		demo_dir: demo_dir,
		demo_src_dir: demo_src_dir,
		demo_pub_dir: demo_pub_dir,
		demo_out_dir: demo_out_dir,
		lib_src_dir: lib_src_dir,
		lib_out_dir: lib_out_dir,
	},
	paths: {
		babel_conf_path: babel_conf_path,
	},
}
