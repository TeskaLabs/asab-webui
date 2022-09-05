import Service from '../abc/Service';
import Axios from 'axios';
import ConfigReducer from './ConfigReducer';
import { CHANGE_CONFIG, SET_DEV_CONFIG } from '../actions';

export default class ConfigService extends Service {


	constructor(app, serviceName = "ConfigService") {
		super(app, serviceName);
		app.ReduxService.addReducer("config", ConfigReducer);

		this.Config = new Config();
		this.DevConfig = new DevConfig();
	}


	initialize() {
		const headerLogoFull = document.getElementsByName('header-logo-full')[0]?.content;
		const headerLogoMini = document.getElementsByName('header-logo-minimized')[0]?.content;
		const customCSS = document.getElementsByName('custom-css-file')[0]?.content;
		const title = document.getElementsByName('title')[0]?.content;

		let dynamicConfig = {};
		let brandImage = {};
		// Add custom header full logo
		if (headerLogoFull != undefined) {
			brandImage["full"] = headerLogoFull;
			dynamicConfig["brand_image"] = brandImage;
		}
		// Add custom header minimized logo
		if (headerLogoMini != undefined) {
			brandImage["minimized"] = headerLogoMini;
			dynamicConfig["brand_image"] = brandImage;
		}
		// Add custom title
		if (title != undefined) {
			dynamicConfig["title"] = title;
		}
		// Add custom CSS
		if (customCSS != undefined) {
			const link = document.createElement('link');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', customCSS);
			console.log(link, 'LINK')
			// Append to the `head` element
			document.head.appendChild(link);
		}
		// Dispatch customs to config store
		if (Object.keys(dynamicConfig).length > 0) {
			this.Config._dynamic_config = dynamicConfig;
			if (this.App.Store !== undefined) {
				this.Config.dispatch(this.App.Store);
			}
		}

		/*
			Example of nginx setup

			location /<location> {
				root /<path>/<to>/<build>;
				index index.html;
				sub_filter '<meta name="header-logo-full">' '<head><meta name="header-logo-full" content="/<location>/<path>/<to>/<logo-full>.svg">';
				sub_filter '<meta name="header-logo-minimized">' '<meta name="header-logo-minimized" content="/<location>/<path>/<to>/<logo-minimized>.svg">';
				sub_filter '<meta name="title">' '<meta name="title" content="Custom app title">';
				sub_filter '<meta name="custom-css-file">' '<meta name="custom-css-file" content="/<location>/<path>/<to>/<custom-file>.css">';
				sub_filter_once on;
			}

			# Path to location (directory) with the custom content
			location /<location>/<path>/<to> {
				alias /<path>/<to>;
			}


			Example of index.html setup

			<head>

			....

			<!-- Dynamic config start -->
			<meta name="header-logo-full">
			<meta name="header-logo-minimized">
			<meta name="custom-css-file">
			<meta name="title">
			<!-- Dynamic config end -->

			...

			</head>

		*/

	}

	// async initialize() {
	// 	// // dynamic_config_url is taken from content atribute of meta element
	// 	// // <meta name="x-config" content="https..." />
	// 	// const dynamic_config_url = document.getElementsByName('x-config')[0]?.content;
	// 	// console.log(dynamic_config_url, "DYNAMIC CONFIG URL")
	// 	// console.log(document.getElementsByName('x-config'), "DOC BY ELEMENTS NAME")

	// 	// const request = new XMLHttpRequest();
	// 	// request.open("GET", document.location, true);
	// 	// request.send();
	// 	// request.onreadystatechange = () => {
	// 	// 	console.log(request.readyState, "READY STATE")
	// 	// 	if (request.readyState === XMLHttpRequest.DONE) {
	// 	// 		// Get the raw header string
	// 	// 		const headers = request.getAllResponseHeaders();
	// 	// 		console.log(headers, "HEADERS")
	// 	// 		if ((headers) && (typeof headers == 'string') && (headers.indexOf("x-config") != -1)) {
	// 	// 			// Convert the header string into an array
	// 	// 			// of individual headers
	// 	// 			const arr = headers.trim().split(/[\r\n]+/);
	// 	// 			console.log(arr, "ARRAY")
	// 	// 			// Create a map of header names to values
	// 	// 			const headerMap = {};
	// 	// 			arr.forEach((line) => {
	// 	// 				const parts = line.split(': ');
	// 	// 				const header = parts.shift();
	// 	// 				const value = parts.join(': ');
	// 	// 				headerMap[header] = value;
	// 	// 			});
	// 	// 			const xConfigPath = headerMap["x-config"];
	// 	// 			if (this.App.Store != null) {
	// 	// 				this.Config.dispatch(this.App.Store, xConfigPath);
	// 	// 				// this.App.Store.dispatch({ type: SET_DYNAMIC_CONFIG_PATH, dynamic_config_path: xConfigPath });
	// 	// 				console.log('DISPATCHED')
	// 	// 			}
	// 	// 			console.log(headerMap, headerMap["x-config"], "TAK ZKOUSIM")
	// 	// 		}
	// 	// 		console.log("NEPROSLO NEVADI")
	// 	// 	}
	// 	// }
	// 	// this.App.addSplashScreenRequestor(this);



	// 		Example of nginx setup

	// 		location /<location> {
	// 			root /<path>/<to>/<build>;
	// 			index index.html;
	// 			add_header x-config "/<path>/<to>/<external_folder>/<config>.json"; #header to dynamic config
	// 		}

	// 		# location to dynamic config
	// 		location /<location>/<path>/<to>/<external_folder> {
	// 			alias /<path>/<to>/<external_folder>;
	// 			try_files $uri /<config>.json;
	// 			index <config>.json;
	// 			autoindex on;
	// 			autoindex_exact_size off;
	// 			autoindex_format json;
	// 		}


	// 		Example of config setup

	// 		{
	// 			"brand_image": {
	// 				"full": "<path>/<to>/<external_folder>/logo-full.svg"
	// 			}
	// 		}


		
	// 	const dynamic_url = async () => {
	// 		const getCfgPath = await fetch(document.location).then(res => {
	// 			let xConfigPath = res.headers.get('x-config');
	// 			return xConfigPath;
	// 		}).catch((e) => {
	// 			console.error(e);
	// 			return undefined;
	// 		})
	// 		return getCfgPath;
	// 	}
	// 	// .then(() => this.App.removeSplashScreenRequestor(this));
	// 	const dynamic_config_url = await dynamic_url();
	// 	// Check on undefined configuration
	// 	if (dynamic_config_url !== undefined) {
	// 		this.App.addSplashScreenRequestor(this);
	// 		let axios = Axios.create({ baseURL: window.location.protocol + '//' + window.location.host });
	// 		axios.get(dynamic_config_url).then(response => {
	// 			// Check on status and content-type
	// 			if ((response.status === 200) && (response.headers["content-type"] !== undefined && response.headers["content-type"].includes("application/json"))) {
	// 				this.Config._dynamic_config = response.data;
	// 				if (this.App.Store !== undefined) {
	// 					this.Config.dispatch(this.App.Store);
	// 				}
	// 			} else {
	// 				this.App.addAlert("danger", "ASABConfigService|Incorrect/invalid config file downloaded", 5, true);
	// 			}
	// 		})
	// 			.catch(error => {
	// 				console.log(error);
	// 				this.App.addAlert("danger", "ASABConfigService|Error when downloading a config file. The path might be corrupted", 5, true);
	// 			})
	// 			.then(() => this.App.removeSplashScreenRequestor(this));
	// 	}
	// }


	addDefaults(defaults, override) {
		if (defaults === undefined) return;
		if (defaults === null) return;

		if (override === false) {
			for (var key in defaults) {
				if (this.Config._defaults[key] === undefined) {
					this.Config._defaults[key] = defaults[key];
				}
			}
		} else {
			for (var key in defaults) {
				this.Config._defaults[key] = defaults[key];
			}
		}


		this.Config.dispatch(this.App.Store);
	}

}


class Config {

	constructor(app) {
		this._dynamic_config = {};
		this._defaults = {};
	}


	get(key) {
		let value;

		// First check the remote config
		value = this._dynamic_config[key];
		if (value !== undefined) return value;

		// Then check the local config
		value = __CONFIG__[key];
		if (value !== undefined) return value;

		// And finally, check defaults
		value = this._defaults[key];
		if (value !== undefined) return value;

		return undefined;
	}


	dispatch(store) {
		var config = Object.assign({}, this._defaults, __CONFIG__, this._dynamic_config);
		store.dispatch({
			type: CHANGE_CONFIG,
			config: config
		});
	}
}

// Config for DEVs
class DevConfig {

	get(key) {
		let value;
		// Check the local config
		value = __DEV_CONFIG__[key];
		if (value !== undefined) return value;

		return undefined;
	}

	dispatch(store) {
		var dev_config = Object.assign({}, __DEV_CONFIG__);
		store.dispatch({
			type: SET_DEV_CONFIG,
			dev_config: dev_config
		});
	}
}
