import axios from 'axios';

const ApiAxios = axios.create({
	baseURL: __CONFIG__.apiUrl,
	timeout: 10000,
})

const Api = {

    get_tenants: () => ApiAxios.get('/tenants'),

}

export default Api;
