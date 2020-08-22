import Service from '../abc/Service';
import Axios from 'axios';
import ConfigReducer from './ConfigReducer';
import { CHANGE_CONFIG } from '../actions';

/*
Example of use:

```
module.exports = {
	app: {
		CONFIG_URL: '/config.json',
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

		this.Config = new Config()
	}


	initialize() {
		const config_url = this.App.Config.get('CONFIG_URL');

		// Check on undefined configuration
		if (config_url !== undefined) {
			this.App.addSplashScreenRequestor(this);
			this.Axios = this.App.axiosCreate(config_url);
			this.Axios.get().then(response => {
				// Check on status and content-type
				if ((response.status === 200) && (response.headers["content-type"] === "application/json")) {
					this.Config._remote_config = response.data;
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


	addDefaults(defaults) {
		if (defaults == undefined) return;
		this.Config._defaults.push(defaults);
	}

}


class Config {
	
	constructor(app) {
		this._remote_config = {};
		this._defaults = [];
	}


	get(key) {
		let value;

		// First check the remote config
		value = this._remote_config[key];
		if (value != undefined) return value;

		// Then check the local config
		value = __CONFIG__[key];
		if (value != undefined) return value;

		// And finally, iterate thru provided defaults
		this._defaults.forEach((entry) => {
			value = entry[key];
			if (value != undefined) return value;
		});

		return undefined;
	}


	dispatch(store) {
		var config = Object.assign({}, __CONFIG__, this._remote_config);
		this._defaults.forEach((entry) => {
			for (var key in entry) {
				if ((entry.hasOwnProperty(key)) && (!config.hasOwnProperty(key))) {
					config[key] = entry[key];
				}
			}
		});

		store.dispatch({
			type: CHANGE_CONFIG,
			config: config
		});
	}
}
