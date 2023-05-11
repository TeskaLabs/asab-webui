import Service from '../abc/Service';
import {HELP_CONTENT} from "../actions";

export default class HelpService extends Service {
	constructor(app, serviceName="HeaderService"){
		super(app, serviceName);
		this.App = app;
		this.HelpCache = {};
	}

	async setData(path) {

		if (this.HelpCache[path] != undefined) {
			if (this.HelpCache[path] != "") {
				this.App.Store.dispatch({
					type: HELP_CONTENT,
					content: this.HelpCache[path]
				});
				return;
			}
			this.App.Store.dispatch({
				type: HELP_CONTENT,
				content: ""
			});
			return;
		}

		try {
			const ASABLibraryAPI = this.App.axiosCreate('asab_library');
			let response = await ASABLibraryAPI.get(`/library/item/Help/${path}`);
			if ((response.status == 200) && response.data) {
				this.App.Store.dispatch({
					type: HELP_CONTENT,
					content: response.data.content
				});
				this.HelpCache[path] = response.data.content;
			}
		} catch (e) {
			console.warn(`Help service can't retrieve data for ${path}`, e);
			// Remove data from the TenantDataCache eventually
			this.App.Store.dispatch({
				type: HELP_CONTENT,
				content: ""
			});
			this.HelpCache[path] = "";
		}
	}
}

