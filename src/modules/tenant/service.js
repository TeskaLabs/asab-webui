import Service from '../../abc/Service';
import {types} from './actions';

export default class TenantService extends Service {

	constructor(app, name="TenantService") {
		super(app, name);
	}

	/*
		set_tenants(payload) method is used for tenants obtained from userinfo
		It is used within auth module of ASAB WebUI to dispatch the tenants to the application store
	*/
	set_tenants(payload) {
		// Extract a current tenant from a query string
		const search = window.location.search;
		const params = new URLSearchParams(search);
		var tenant_id = params.get('tenant');

		// If tenant has not been provided in access URL, pick a first tenant from a list
		if (tenant_id == null) {
			tenant_id = payload[0];
			// ... and refresh (reload) the whole web app
			window.location.replace('?tenant='+tenant_id+'#/');
			return;
		}

		// Find the current tenant in the list and extract it
		let current_tenant = payload.filter((item) => { return item == tenant_id } );
		if (current_tenant.length < 1) {
			this.App.addAlert("danger", "Invalid tenant :-(", 40000);
			return;
		}

		// Dispatch tenants obtained from userinfo
		this.App.Store.dispatch({
			type: types.TENANTS_CHANGED,
			payload,
			current: current_tenant[0],
		});

	}
}
