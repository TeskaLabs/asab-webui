import Service from '../abc/Service';
import Axios from 'axios';
import ConfigReducer from './ConfigReducer';
import { CHANGE_CONFIG } from '../actions';


export default class ConfigService extends Service {

	constructor(app, serviceName="ConfigService") {
		super(app, serviceName);
		app.ReduxService.addReducer("config", ConfigReducer);
	}

	initialize() {
		this.App.addSplashScreenRequestor(this);
		// TODO test it on empty configuration / no configuration
		this.Axios = this.App.axiosCreate(this.App.Config._config.configUrl);
		this.Axios.get().then(response => {
				// TODO implement check on status codes
				if (response.statusText === 'OK') {
					this.inject(response.data);
				} else {
					this.App.addAlert("danger", "Something went wrong. Config file could not have been loaded.");
				}
				console.log(response)
			})
			.catch(error => {
				console.log(error); 
				this.App.addAlert("danger", "File not found. The path might be corrupted.");
			})
			.then(() => this.App.removeSplashScreenRequestor(this));
	}

	// Inject configuration from site to the App Store
	inject(config) {
		this.App.Store.dispatch({
			type: CHANGE_CONFIG,
			config: config
		})
	}
}
