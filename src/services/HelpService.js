import Service from '../abc/Service';
import {types} from "../modules/tenant/actions";

export default class HelpService extends Service {
	constructor(app, serviceName="HeaderService"){
		super(app, serviceName);
		this.App = app.App;
		this.HelpTextCache = {};
	}


	async initialize() {
		// this.App.ConfigService.addDefaults({
		// 	'default_brand_image': {
		// 		full: "media/logo/header-full.svg",
		// 		minimized: "media/logo/header-minimized.svg",
		// 		href: undefined,
		// 	}
		// }, true)

		// try {
		// 	const ASABLibraryAPI = this.App.axiosCreate('asab_library');
		// 	let response = await ASABLibraryAPI.get(``);
		// 	this.HelpTextCache = response;
		// } catch (e) {
		// 	console.error(e);
		// 	// Remove data from the TenantDataCache eventually
		// 	delete this.HelpTextCache;
		// }
	}


	setData(screen, screenType) {
		// this.Items.push({
		// 	'component': component,
		// 	'componentProps':componentProps,
		// })

		// try {
		// 	let response = await SeaCatAuthAPI.get(`/tenant/${currentTenant}`);
		// 	this.TenantDataCache[currentTenant] = tenantData;
		// } catch (e) {
		// 	console.warn(`Tenant service can't retrieve data for ${currentTenant}`);
		// 	console.error(e);
		// 	// Remove data from the TenantDataCache eventually
		// 	delete this.TenantDataCache[currentTenant];
		// }

		// Dispatch
		this.App.Store.dispatch({
			// type: types.TENANTS_CHANGED,
			// tenants_list,
			// current: current_tenant
		});
	}

}
