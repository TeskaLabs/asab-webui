import Service from '../abc/Service';
import {HELP_DESCRIPTION} from "../actions";

export default class HelpService extends Service {
	constructor(app, serviceName="HeaderService"){
		super(app, serviceName);
		this.App = app;
		this.HelpTextCache = {};
	}

	async setData(screenName, screenType) {
		let withExtension;
		// if (this.HelpTextCache[screenName]) {
		// 	// Dispatch
		// 	this.App.Store.dispatch({
		// 		type: HELP_DESCRIPTION,
		// 		description: this.HelpTextCache[screenName]
		// 	});
		// 	return;
		// }

		if ((/\.[^/.]+$/.test(screenType))) {
			withExtension = screenType;
		} else {
			withExtension = `${screenType}.json`
		}
		console.log(withExtension);


		try {
			const ASABLibraryAPI = this.App.axiosCreate('asab_library');
			let response = await ASABLibraryAPI.get(`/library/item/Help/${screenName}/${withExtension}`);
			if ((response.status == 200) && response.data) {
				this.HelpTextCache[screenName] = response.data.description;
				this.App.Store.dispatch({
					type: HELP_DESCRIPTION,
					description: response.data.description
				});
			}
		} catch (e) {
			console.warn(`Help service can't retrieve data for ${screenName}`);
			console.error(e, "error");
			// Remove data from the TenantDataCache eventually
			delete this.HelpTextCache[screenName];
			this.App.Store.dispatch({
				type: HELP_DESCRIPTION,
				description: ""
			});
		}
	}
}
