import Service from '../abc/Service';
import Axios from 'axios';
import ConfigReducer from './ConfigReducer';
import { CHANGE_CONFIG } from '../actions';

/*
	Example of use:

	module.exports = {
		app: {
			configUrl: 'configuration/config/',
		},
	}

...

	Example of config.json file content:

	{"kibanaUrl":"http://1.1.1.1:5601/app/kibana", "appSettings":{"onetwothree":123}}

*/

export default class ConfigService extends Service {

	constructor(app, serviceName="ConfigService") {
		super(app, serviceName);
		app.ReduxService.addReducer("config", ConfigReducer);
	}

	initialize() {
		// Check on undefined configuration
		if (this.App.Config._config.configUrl !== undefined) {
			this.App.addSplashScreenRequestor(this);
			this.Axios = this.App.axiosCreate(this.App.Config._config.configUrl);
			this.Axios.get().then(response => {
					// TODO implement check on status codes
					if (response.statusText === 'OK') {
						if (typeof(response.data) === "object" && Object.keys(response.data).length !== 0) {
							this.inject(response.data);
						} else {
							this.App.addAlert("danger", "Data of the config file is not in the required form or the file is empty.")
						}
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
