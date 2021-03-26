import Service from '../abc/Service';
import Axios from 'axios';
import ConfigReducer from './ConfigReducer';
import { CHANGE_CONFIG, SET_DEV_CONFIG } from '../actions';

/*
Example of use:

```
module.exports = {
	app: {
		CONFIG_PATH: '/config.json',
	},
}
```


Example of `config.json` content:

```
{
	"KIBANA_URL": "http://1.1.1.1:5601/app/kibana",
	"APP_SETTINGS": {
		"onetwothree":123
	}
}
```
*/

export default class ConfigService extends Service {


	constructor(app, serviceName="ConfigService") {
		super(app, serviceName);
		app.ReduxService.addReducer("config", ConfigReducer);

		this.Config = new Config();
		this.DevConfig = new DevConfig();
	}


	initialize() {
		let config_url = this.App.Config.get('CONFIG_PATH');

		// Provide backward compatibility with CONFIG_URL
		if (this.App.Config.get('CONFIG_URL')) {
			config_url = this.App.Config.get('CONFIG_URL');
		}

		// Check on undefined configuration
		if (config_url !== undefined) {
			this.App.addSplashScreenRequestor(this);
			let axios = Axios.create({baseURL: window.location.protocol + '//' + window.location.host});
			axios.get(config_url).then(response => {
				// Check on status and content-type
				if ((response.status === 200) && (response.headers["content-type"] !== undefined && response.headers["content-type"].includes("application/json"))) {
					this.Config._dynamic_config = response.data;
					if (this.App.Store !== undefined) {
						this.Config.dispatch(this.App.Store);
					}
				} else {
					this.App.addAlert("danger", "Incorrect/invalid config file downloaded.");
				}
			})
			.catch(error => {
				console.log(error);
				this.App.addAlert("danger", "Error when downloading a config file. The path might be corrupted.");
			})
			.then(() => this.App.removeSplashScreenRequestor(this));
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
