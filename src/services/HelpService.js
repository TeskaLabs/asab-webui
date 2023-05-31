import Service from '../abc/Service';
import {HELP_CONTENT} from "../actions";

export default class HelpService extends Service {
	constructor(app, serviceName="HeaderService"){
		super(app, serviceName);
		this.App = app;
	}

	setPath(path) {
		this.App.Store.dispatch({
			type: HELP_CONTENT,
			path: path
		});
	}
}

