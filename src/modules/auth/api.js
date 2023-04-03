import axios from 'axios';
import { locationReplace } from 'asab-webui';

export class SeaCatAuthApi {

	/*
	SeaCat Auth Open ID Connect / OAuth2.0


	From config.js:

	module.exports = {
		app: {
			BASE_URL: 'http://localhost:3000',
			API_PATH: 'api',
			SERVICES: {openidconnect: 'openidconnect'},
			...
	*/

	constructor(app) {
		this.App = app;

		const scope = this.App.Config.get('seacat.auth.scope');
		this.Scope = scope ? scope : "openid tenant userinfo:*";
		
		this.ClientId = "asab-webui-auth";
		this.ClientSecret = "TODO";
		this.SeaCatAuthAPI = this.App.axiosCreate('seacat_auth');
		this.OidcAPI = this.App.axiosCreate('openidconnect');
		this.state = (Math.random() + 1).toString(36).substring(7);
	}

	// This method will cause a navigation from the app to the OAuth2 login screen
	async login(redirect_uri, force_login_prompt) {
		/*
			Adding tenant directly to scope (if available).
		*/
		let currentTenant = null;
		if (this.App.Services.TenantService) {
			currentTenant = this.App.Services.TenantService.getCurrentTenant();
		}
		let scopeArray = this.Scope.split(" ");
		let tenantValue = scopeArray.find(str => str.includes("tenant"));
		let loginScope = (currentTenant != null) && (tenantValue != undefined) ? this.Scope.replace(`${tenantValue}`, `tenant:${currentTenant}`) : this.Scope;

		let redirect_uriNewUrl = new URL(redirect_uri)
		let redirect_uriHash = redirect_uriNewUrl.hash;
		redirect_uriNewUrl.hash = ""
		let redirect_uriWithoutHash = redirect_uriNewUrl.href;
		localStorage.setItem(this.state, redirect_uriHash);

		const params = new URLSearchParams({
			response_type: "code",
			scope: loginScope,
			client_id: this.ClientId,
			redirect_uri: redirect_uriWithoutHash,
			state: this.state
		});
		if (force_login_prompt === true) {
			params.append("prompt", "login");
		}

		let oidcURL = this.App.getServiceURL('openidconnect');
		await locationReplace(oidcURL + "/authorize?" + params.toString());
	}

	logout(access_token) {
		return this.OidcAPI.get('/logout',
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
		);
	}


	userinfo(access_token) {
		let userinfoPath = '/userinfo';
		let headers = {};
		// Add access bearer token to the Authorization headers
		if (access_token != null) {
			headers.Authorization = 'Bearer ' + access_token;
		}

		return this.OidcAPI.get(userinfoPath, {headers: headers});
	}


	token_authorization_code(authorization_code, redirect_uri) {
		const qs = new URLSearchParams({
			grant_type: "authorization_code",
			code: authorization_code,
			client_id: this.ClientId,
			client_secret: this.ClientSecret,
			redirect_uri: redirect_uri,
		});
		return this.OidcAPI.post('/token',
			qs.toString()
		);
	}

};


export class GoogleOAuth2Api {

	/*
	Google OAuth2 API is configured at Google API Console > Credentials > OAuth 2.0 Client IDs


	From config.js:

	module.exports = {
		app: {
			"google.oauth2.client_id": "<Google OAuth2 Client ID>.apps.googleusercontent.com",
			"google.oauth2.client_secret": "<Google OAuth2 Client secret>",
			...
	*/

	constructor(config) {
		this.Axios = axios.create({
			timeout: 10000,
		});

		const scope = config.get('google.oauth2.scope');
		this.ClientId = config.get('google.oauth2.client_id');
		this.ClientSecret = config.get('google.oauth2.client_secret');
		this.Scope = scope ? scope : "openid https://www.googleapis.com/auth/userinfo.profile";
	}

	// This method will cause a navigation from the app to the OAuth2 login screen
	async login(redirect_uri) {
		const params = new URLSearchParams({
			response_type: "code",
			scope: this.Scope,
			client_id: this.ClientId,
			redirect_uri: redirect_uri
		});
		await locationReplace("https://accounts.google.com/o/oauth2/auth" + "?" + params.toString());
	}


	logout(access_token) {
		// There is no Google logout API URL, to our best knowledge
		return null;
	}

	userinfo(access_token) {
		const qs = new URLSearchParams({
			alt: "json",
			access_token: access_token,
		});

		return this.Axios.get(
			'https://www.googleapis.com/oauth2/v1/userinfo?' + qs.toString(),
		);
	}

	token_authorization_code(authorization_code, redirect_uri) {
		const qs = new URLSearchParams({
			grant_type: "authorization_code",
			code: authorization_code,
			client_id: this.ClientId,
			client_secret: this.ClientSecret,
			redirect_uri: redirect_uri,
		});

		return this.Axios.post(
			'https://oauth2.googleapis.com/token',
			qs.toString()
		);
	}
}
