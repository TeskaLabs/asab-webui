import Service from '../abc/Service';
import {HELP_DESCRIPTION} from "../actions";

export default class HelpService extends Service {
	constructor(app, serviceName="HeaderService"){
		super(app, serviceName);
		this.App = app;
	}

	async setData(path) {
		let withExtension;

		if ((/\.[^/.]+$/.test(path))) {
			withExtension = path;
		} else {
			withExtension = `${path}.json`
		}


		try {
			const ASABLibraryAPI = this.App.axiosCreate('asab_library');
			let response = await ASABLibraryAPI.get(`/library/item/Help/${withExtension}`);
			if ((response.status == 200) && response.data) {
				this.App.Store.dispatch({
					type: HELP_DESCRIPTION,
					description: response.data.description
				});
			}
		} catch (e) {
			console.warn(`Help service can't retrieve data for ${path}`);
			console.error(e, "error");
			// Remove data from the TenantDataCache eventually
			this.App.Store.dispatch({
				type: HELP_DESCRIPTION,
				description: ""
			});
		}
	}
}
