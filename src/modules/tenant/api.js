export default class Api {
	constructor(axios) {
		this.Axios = axios;
	}

	get_tenants() {
		return this.Axios.get('/tenant')
	}

	get_user_access(tenant, access_token) {
		return this.Axios.get(
			"/rbac/" + tenant + "/tenant:access",
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
			)
	}
}
