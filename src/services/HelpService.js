import Service from '../abc/Service';
import {HELP_CONTENT} from "../actions";

export default class HelpService extends Service {
	constructor(app, serviceName="HeaderService"){
		super(app, serviceName);
		this.App = app;
	}

	async setData(path) {
		let pathWithExtension;

		if ((/\.[^/.]+$/.test(path))) {
			pathWithExtension = path;
		} else {
			pathWithExtension = `${path}.json`
		}

		try {
			const ASABLibraryAPI = this.App.axiosCreate('asab_library');
			let response = await ASABLibraryAPI.get(`/library/item/Help/${pathWithExtension}`);
			if ((response.status == 200) && response.data) {
				this.App.Store.dispatch({
					type: HELP_CONTENT,
					content: response.data.content
				});
			}
		} catch (e) {
			console.warn(`Help service can't retrieve data for ${path}`, e);
			// Remove data from the TenantDataCache eventually
			this.App.Store.dispatch({
				type: HELP_CONTENT,
				content: ""
			});
		}
	}
}

