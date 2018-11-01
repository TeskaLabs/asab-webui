// imports
const path = require('path');
//// dirs
const root_dir = path.resolve(__dirname, '..');
const src_dir  = path.resolve(root_dir, 'src');
const conf_dir  = path.resolve(root_dir, 'conf');
// lib
const lib_src_dir = path.resolve(src_dir, 'asab-webui-kit');
const babel_conf_path = path.resolve(conf_dir, 'babel.conf.js');

module.exports = {
	babel_conf_path: babel_conf_path,
	lib_src_dir: lib_src_dir,
}
