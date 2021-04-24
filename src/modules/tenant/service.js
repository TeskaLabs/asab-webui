import Service from '../../abc/Service';
import {types} from './actions';

export default class TenantService extends Service {

	constructor(app, name="TenantService") {
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
			this.set_tenants(tenants_list);
		}
	}

	/*
		set_tenants(tenants_list) method is used for tenants obtained from userinfo
		It is used within auth module of ASAB WebUI to dispatch the tenants to the application store
	*/
	set_tenants(tenants_list) {
		// Extract a current tenant from a query string
		const search = window.location.search;
		const params = new URLSearchParams(search);
		var tenant_id = params.get('tenant');
		// If tenant has not been provided in access URL, pick a first tenant from a list
		if (tenant_id == null && tenants_list != null) {
			tenant_id = tenants_list[0];
			// ... and refresh (reload) the whole web app
			window.location.replace('?tenant='+tenant_id+'#/');
			return;
		}

		// Find the current tenant in the list and extract it
		let current_tenant;
		if (tenants_list) {
			let filtered_tenant = tenants_list.filter((item) => { return item == tenant_id });
			if (filtered_tenant.length < 1) {
				this.App.addAlert("danger", "Invalid tenant :-(", 40000);
				return;
			}
			current_tenant = filtered_tenant[0];
		} else {
			current_tenant = null;
		}
		// Dispatch tenants obtained from userinfo
		this.App.Store.dispatch({
			type: types.TENANTS_CHANGED,
			tenants_list,
			current: current_tenant,
		});

	}
}
