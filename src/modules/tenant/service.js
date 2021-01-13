import Service from '../../abc/Service';
import Api from './api';
import {types} from './actions';

export default class TenantService extends Service {

	constructor(app, name="TenantService") {
		super(app, name);
		this.API = new Api(this.App.axiosCreate(''));
		this.OAuthToken = JSON.parse(sessionStorage.getItem('SeaCatOAuth2Token'));
		this.App.addSplashScreenRequestor(this);
	}

	initialize() {
		// Extract a current tenant from a query string
		const search = window.location.search;
		const params = new URLSearchParams(search);
		var tenant_id = params.get('tenant');
		
		// Fetch tenants
		this.API.get_tenants()
		.then(response => {
			let tenants = response.data;

			if (tenants.length == 0) {
				this.App.addAlert("danger", "No tenants avaiable, got an empty tenant list.", 40000);
				return;
			}

			// Authorize user
			let payload = [];
			Object.values(tenants).map((tenant, idx) => {
				this.API.get_user_access(tenant._id, this.OAuthToken['access_token']).then(response => {
					if (response.data.result == 'OK'){
						payload.push(tenant)
					}
					if (idx + 1 == tenants.length) {
						if (payload.length == 0) {
							this.App.addAlert("danger", "You are not authorized to use this application.", 40000);
							return;
						}
						// If tenant has not been provided in access URL or if tenant is provided in URL,
						// but does not match with the list of tenants assigned for the account, pick a first tenant from a list
						if (tenant_id == null || !(JSON.stringify(payload).indexOf(tenant_id) !== -1)) {
							tenant_id = payload[0]._id;
							// ... and refresh (reload) the whole web app
							window.location.replace('?tenant='+tenant_id+'#/');
							return;
						}

						// Find the current tenant in the list and extract its
						let x = payload.filter((item) => { return item._id == tenant_id } );
						if (x.length < 1) {
							this.App.addAlert("danger", "Invalid tenant :-(", 40000);
							return;
						}

						this.App.Store.dispatch({
							type: types.TENANTS_CHANGED,
							payload,
							current: x[0],
						});

						this.App.removeSplashScreenRequestor(this);
					}
				}).catch((error) => {
					console.log(error);
					this.App.addAlert("danger", "Failed to load tenants.", 40000);
				})
			})
		})
		.catch((error) => {
			console.log(error);
			this.App.addAlert("danger", "Failed to load tenants.", 40000);
		});
	}
}
