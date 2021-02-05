export default class Api {
	constructor(axios) {
		this.Axios = axios;
	}

	get_tenants() {
		return this.Axios.get('/tenant')
	}

}
