import axios from 'axios';

const ApiAxios = axios.create({
	baseURL: "",
	timeout: 10000,
})

const Api = {

	get_userinfo: (access_token) => ApiAxios.get('/openidconnect/userinfo', { headers: { 'Authorization': 'Bearer ' + access_token }}),
	logout: (access_token) => ApiAxios.get('/openidconnect/logout', { headers: { 'Authorization': 'Bearer ' + access_token }}),

}

export default Api;
