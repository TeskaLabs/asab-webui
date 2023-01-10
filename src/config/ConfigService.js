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
		// Initialization of dynamic configuration
		const headerLogoFullLight = document.getElementsByName('header-logo-full-light')[0]?.content;
		const headerLogoMiniLight = document.getElementsByName('header-logo-minimized-light')[0]?.content;
		const headerLogoFullDark = document.getElementsByName('header-logo-full-dark')[0]?.content;
		const headerLogoMiniDark = document.getElementsByName('header-logo-minimized-dark')[0]?.content;
		const title = document.getElementsByName('title')[0]?.content;
		const customCSS = document.getElementsByName('custom-css-file')[0]?.content;

		let dynamicConfig = {};

		// Add custom header full light logo
		if ((headerLogoFullLight != undefined) && (headerLogoFullLight != "")) {
			dynamicConfig.brandImage = {light: {full: headerLogoFullLight}};
		}
		// Add custom header minimized light logo
		if ((headerLogoMiniLight != undefined) && (headerLogoMiniLight != "")) {
			if (dynamicConfig?.brandImage?.light !== undefined) {
				dynamicConfig.brandImage.light.minimized = headerLogoMiniLight;
			} else {
				dynamicConfig.brandImage = {light: {minimized: headerLogoMiniLight}}
			}
		}
		// Add custom header full dark logo
		if ((headerLogoFullDark != undefined) && (headerLogoFullDark != "")) {
			if (dynamicConfig?.brandImage !== undefined) {
				dynamicConfig.brandImage.dark = {full: headerLogoFullDark};
			} else {
				dynamicConfig.brandImage = {dark: {full: headerLogoFullDark}}
			}
		}
		// Add custom header minimized dark logo
		if ((headerLogoMiniDark != undefined) && (headerLogoMiniDark != "")) {
			if (dynamicConfig?.brandImage?.dark !== undefined) {
				dynamicConfig.brandImage.dark.minimized = headerLogoMiniDark;
			} else if ((dynamicConfig?.brandImage?.light !== undefined)) {
				dynamicConfig.brandImage.dark = {minimized: headerLogoMiniDark}
			} else {
				dynamicConfig.brandImage = {dark: {minimized: headerLogoMiniDark}}
			}
		}

		// when we have defined both cases (full & minimized) for light mode, but no dark mode -> light versions for both cases
		if ((dynamicConfig?.brandImage?.light?.full) && (dynamicConfig?.brandImage?.light?.minimized) && (dynamicConfig?.brandImage?.dark == undefined)) {
			dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
		}
		// when we have defined both cases (full & minimized) for dark mode, but no light mode -> light versions for both cases
		if ((dynamicConfig?.brandImage?.dark?.full) && (dynamicConfig?.brandImage?.dark?.minimized) && (dynamicConfig?.brandImage?.light == undefined)) {
			dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		}

		if ((!dynamicConfig?.brandImage?.light) && (dynamicConfig?.brandImage?.dark?.full == undefined) && (dynamicConfig?.brandImage?.dark?.minimized)) {
			dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		}
		if ((!dynamicConfig?.brandImage?.light) && (dynamicConfig?.brandImage?.dark?.minimized == undefined) && (dynamicConfig?.brandImage?.dark?.full)) {
			dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		}
		if ((!dynamicConfig?.brandImage?.dark) && (dynamicConfig?.brandImage?.light?.full == undefined) && (dynamicConfig?.brandImage?.light?.minimized)) {
			dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
		}
		if ((!dynamicConfig?.brandImage?.dark) && (dynamicConfig?.brandImage?.light?.minimized == undefined) && (dynamicConfig?.brandImage?.light?.full)) {
			dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
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

		console.log('dynamicConfig: ', dynamicConfig)

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
