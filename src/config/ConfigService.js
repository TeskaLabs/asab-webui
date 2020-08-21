import Service from '../abc/Service';
import Axios from 'axios';
import ConfigReducer from './ConfigReducer';
import { CHANGE_CONFIG } from '../actions';

/*
	Example of use:

	module.exports = {
		app: {
			CONFIG_URL: 'configuration/config/',
		},
	}

...

	Example of config.json file content:

	{"KIBANA_URL":"http://1.1.1.1:5601/app/kibana", "APP_SETTINGS":{"onetwothree":123}}

*/

export default class ConfigService extends Service {

	constructor(app, serviceName="ConfigService") {
		super(app, serviceName);
		app.ReduxService.addReducer("config", ConfigReducer);
	}

	initialize() {
		const config_url = this.App.Config.get('CONFIG_URL');
		// Check on undefined configuration
		if (config_url !== undefined) {
			this.App.addSplashScreenRequestor(this);
			this.Axios = this.App.axiosCreate(config_url);
			this.Axios.get().then(response => {
				// Check on status and content-type
				if (response.status === 200 && response.headers["content-type"] === "application/json") {
					this.inject(response.data);
				} else {
					this.App.addAlert("danger", "Something went wrong. Config file could not have been loaded.");
				}
			})
			.catch(error => {
				console.log(error);
				this.App.addAlert("danger", "Config file not found. The path might be corrupted.");
			})
			.then(() => this.App.removeSplashScreenRequestor(this));
		} else {
			return
		}
	}

	// Inject configuration from site to the App Store
	inject(config) {
		this.App.Store.dispatch({
			type: CHANGE_CONFIG,
			config: config
		})
	}
}
