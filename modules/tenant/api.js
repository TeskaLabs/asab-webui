import axios from 'axios';
// import Config from '../../Config';

const ApiAxios = axios.create({
	// baseURL: Config.apiUrl,
	baseURL: "http://localhost:8080",
	timeout: 10000,
})

const Api = {

    get_tenants: () => ApiAxios.get('/tenants'),

}

export default Api;
