import Service from '../../abc/Service';
import { SET_HIDDEN_ITEMS_SIDEBAR } from '../../actions';

export default class SidebarService extends Service {

	/*
		Sidebar service is used for handling dynamic
		sidebar's item configuration
	*/

	constructor(app, serviceName="SidebarService"){
		super(app, serviceName);
		this.ASABConfigAPI = this.App.axiosCreate('asab_config');
	}


	async initialize() {
		// Obtain application title from Configuration
		if (this.App.Services.ConfigService) {
			let title = this.App.Config.get("title")
			await this.getSidebarHiddenItems(title);
		}
	}

	// Function to obtain hidden sidebar items from service
	async getSidebarHiddenItems(configName) {
		let hiddenItems = undefined;
		try {
			let response = await this.ASABConfigAPI.get(`/config/Sidebar/${configName}?format=json`);
			if (response.data.result != "OK") {
				throw new Error("Config file to get data for Sidebar can't be found in Zookeeper")
			}
			hiddenItems = response.data.data;
		}
		catch(e) {
			console.warn("ASAB Config service can't retrieve Sidebar configuration");
		}

		this.App.Store.dispatch({ type: SET_HIDDEN_ITEMS_SIDEBAR, sidebarHiddenItems: hiddenItems });
	}

}
