import Service from '../abc/Service';
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
		// Initialization of dynamic configuration
		const headerLogoFull = document.getElementsByName('header-logo-full')[0]?.content;
		const headerLogoMini = document.getElementsByName('header-logo-minimized')[0]?.content;
		const headerLogoFullDark = document.getElementsByName('header-logo-full-dark')[0]?.content;
		const headerLogoMiniDark = document.getElementsByName('header-logo-minimized-dark')[0]?.content;
		const title = document.getElementsByName('title')[0]?.content;
		const customCSS = document.getElementsByName('custom-css-file')[0]?.content;

		let dynamicConfig = {};
		// determine if any logos have been dynamically configured and assign brandImage property as an empty object
		if (((headerLogoFull != undefined) && (headerLogoFull != "")) || ((headerLogoFullDark != undefined) && (headerLogoFullDark != "")) || ((headerLogoMini != undefined) && (headerLogoMini != "")) || ((headerLogoMiniDark != undefined) && (headerLogoMiniDark != ""))) {
			dynamicConfig.brandImage = {};
		}
		// If header's full light logo has been configured, add it to dynamic config object
		if ((headerLogoFull != undefined) && (headerLogoFull != "")) {
			Object.assign(dynamicConfig.brandImage, {"light": {"full": headerLogoFull}});
		}
		// If header's full dark logo has been configured, extend/add it to dynamic config's brandImage property
		if ((headerLogoFullDark != undefined) && (headerLogoFullDark != "")) {
			dynamicConfig.brandImage = {...dynamicConfig.brandImage, "dark": {"full": headerLogoFullDark}};
		}
		// If header's minimized light logo has been configured, extend/add it to dynamic config brandImage property
		if ((headerLogoMini != undefined) && (headerLogoMini != "")) {
			Object.assign(dynamicConfig.brandImage, {...dynamicConfig.brandImage, "light" : {...dynamicConfig.brandImage?.light, "minimized": headerLogoMini}})
		}
		// If header's minimized dark logo has been configured, extend/add it to dynamic config brandImage property
		if ((headerLogoMiniDark != undefined) && (headerLogoMiniDark != "")) {
			Object.assign(dynamicConfig.brandImage, {...dynamicConfig.brandImage, "dark" : {...dynamicConfig.brandImage?.dark, "minimized": headerLogoMiniDark}})
		}

		// Add custom title
		if ((title != undefined) && (title != "")) {
			dynamicConfig["title"] = title;
		}
		// Add custom CSS
		if ((customCSS != undefined) && (customCSS != "")) {
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
				console.warn('Dynamic configuration has not been dispatched to application store');
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
		// First check the remote config
		if (this._dynamic_config[key] != undefined) {
			return this._dynamic_config[key];
		};

		// Then check the local config
		if (__CONFIG__[key] != undefined) {
			return __CONFIG__[key];
		};

		// And finally, check defaults
		if (this._defaults[key] != undefined) {
			return this._defaults[key];
		};

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
