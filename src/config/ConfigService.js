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
		const title = document.getElementsByName('title')[0]?.content;
		const customCSS = document.getElementsByName('custom-css-file')[0]?.content;

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
			// Append to the `head` element
			document.head.appendChild(link);
		}
		// Dispatch customs to config store
		if (Object.keys(dynamicConfig).length > 0) {
			this.Config._dynamic_config = dynamicConfig;
			if (this.App.Store !== undefined) {
				this.Config.dispatch(this.App.Store);
			} else {
				console.warn('Dynamic configuration has no been dispatched to application store');
			}
		}
	}


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
