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
		// TODO url must be in default property
		this.Axios = this.App.axiosCreate('configuration/');

		this.Axios.get('config/').then(response => {
				// TODO check if response 200, OK etc, write error message
				this.inject(response.data);
			})
			.catch(error => {
				// TODO error messsage
				console.log(error); 
				this.App.addAlert("danger", error.toString());
			})
			.then(() => this.App.removeSplashScreenRequestor(this));
	}

	inject(config) {
		this.App.Store.dispatch({
			type: CHANGE_CONFIG,
			config: config
		})
	}

}