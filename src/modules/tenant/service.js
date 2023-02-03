import Service from '../../abc/Service';
import { types } from './actions';
import { locationReplace } from 'asab-webui';

export default class TenantService extends Service {

	constructor(app, name = "TenantService") {
		super(app, name);
	}

	async initialize() {

		// If the tenant list is in the configuration, use it
		// This is useful when tenants are present but auth not
		var tenants = this.App.Config.get('tenants');
		if (tenants != null) {
			var tenants_list = [];
			for (var i = 0; tenants[i] != undefined; i++) {
				tenants_list.push(tenants[i]);
			}
			await this.setTenants(tenants_list);
		}
	}

	/*
		setTenants(tenants_list) method is used for tenants obtained from userinfo
		It is used within auth module of ASAB WebUI to dispatch the tenants to the application store
	*/
	async setTenants(tenants_list) {
		// Extract a current tenant from URL params
		var tenant_id = this._extractTenantFromUrl();

		// If tenant has not been provided in access URL, pick a first tenant from a list
		if ((tenant_id == null) && (tenants_list) && (tenants_list.length > 0)) {
			tenant_id = tenants_list[0];
			// ... and refresh (reload) the whole web app
			await locationReplace(`${window.location.pathname}?tenant=${tenant_id}${window.location.hash}`);
			return;
		}

		// In case if the tenant list from userinfo is undefined or empty remove tenant parameter from URL
		if ((!tenants_list) || (tenants_list.length == 0)) {
			await locationReplace(window.location.pathname + window.location.hash);
			return;
		}

		// Find the current tenant in the list and extract it
		let current_tenant;
		if (tenants_list) {
			let filtered_tenant = tenants_list.filter((item) => { return item == tenant_id });
			if (filtered_tenant.length < 1) {
				// Display Invalid tenant alert message only when authorization is disabled
				if (this.App.Config.get("authorization") === "disabled") {
					this.App.addAlert("danger", "ASABTenantModule|Invalid tenant", 40000, true);
				}
			}
			current_tenant = filtered_tenant[0];
		} else {
			current_tenant = undefined;
		}
		// Dispatch tenants obtained from userinfo
		this.App.Store.dispatch({
			type: types.TENANTS_CHANGED,
			tenants_list,
			current: current_tenant
		});

	}

	/*
		getTenantData() method is used for returning the tenant data
		It requires SeaCat Auth service
	*/
	async getTenantData() {
		let tenantData = {};
		let currentTenant = this.getCurrentTenant();
		if (currentTenant) {
			const SeaCatAuthAPI = this.App.axiosCreate('seacat_auth');
			try {
				let response = await SeaCatAuthAPI.get(`/tenant/${currentTenant}`);
				tenantData = response.data;
			} catch (e) {
				console.warn(`Tenant service can't retrieve data for ${currentTenant}`);
				console.error(e);
			}
		}
		return tenantData;
	}

	// getCurrentTenant() method is used for obtaining current tenant
	getCurrentTenant() {
		const state = this.App.Store.getState();
		let currentTenant = state.tenant.current;
		// If current tenant is not in redux store yet, get it from the URL params
		if (!currentTenant) {
			currentTenant = this._extractTenantFromUrl();
		}
		return currentTenant;
	}

	// Extract tenant from URL params
	_extractTenantFromUrl() {
		const search = window.location.search;
		const params = new URLSearchParams(search);
		let tenant = params.get('tenant');
		return tenant;
	}
}
