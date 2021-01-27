import axios from 'axios';

export class SeaCatAuthApi {

	/*
	SeaCat Auth Open ID Connect / OAuth2.0


	From config.js:

	module.exports = {
		app: {
			BASE_URL: 'http://localhost:3000',
			API_PATH: '/api',
			SERVICES: {oidc: '/openidconnect', rbac: '/rbac'},
			...
	*/

	constructor(config, props) {

		this.BaseURL = config.get('BASE_URL');
		this.ApiPath = config.get('API_PATH');
		this.Services = config.get('SERVICES');
		this.URL = null;
		this.props = props;

		if (this.BaseURL == null) {
			console.log("Provide config value BASE_URL");
			this.BaseURL = "";
		}

		if (this.ApiPath == null) {
			console.log("Provide config value API_PATH");
			this.ApiPath = "/api"
		}

		if (this.Services == null) {
			console.log("Provide config value SERVICES");
			this.Services = {"oidc": "/openidconnect", "rbac": "/rbac"};
		}

		this.OidcSubpath = this.Services.oidc ? this.Services.oidc : '/openidconnect'; // Openidconnect
		this.RbacSubpath = this.Services.rbac ? this.Services.rbac : '/rbac'; // rbac

		this.URL = this.BaseURL + this.ApiPath;

		const scope = config.get('seacat.auth.scope');
		this.Scope = scope ? scope : "openid";
		
		this.ClientId = "asab-webui-auth";
		this.ClientSecret = "TODO";

		this._axiosCall = this._axiosCall.bind(this);
	}

	// For axios calls with dynamic service types
	_axiosCall(service) {
		return this.props.axiosCreate(service, {timeout: 10000});
	}

	// This method will cause a navigation from the app to the OAuth2 login screen
	login(redirect_uri, force_login_prompt) {
		const params = new URLSearchParams({
			response_type: "code",
			scope: this.Scope,
			client_id: this.ClientId,
			redirect_uri: redirect_uri
		});
		if (force_login_prompt === true) {
			params.append("prompt", "login");
		}

		let url = this.URL + this.OidcSubpath;
		// Check if OIDC service contains an external OIDC url
		if (this.OidcSubpath.toString().indexOf('http://') !== -1 || this.OidcSubpath.toString().indexOf('https://') !== -1) {
			url = this.OidcSubpath;
		}
		window.location.replace(url + "/authorize?" + params.toString());
	}

	logout(access_token) {
		let Axios = this._axiosCall(this.OidcSubpath);
		return Axios.get('/logout',
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
		);
	}


	userinfo(access_token) {
		let headers = {}
		if (access_token != null) {
			headers.Authorization = 'Bearer ' + access_token;
		}
		let Axios = this._axiosCall(this.OidcSubpath);
		return Axios.get('/userinfo', {headers: headers});
	}


	token_authorization_code(authorization_code, redirect_uri) {
		const qs = new URLSearchParams({
			grant_type: "authorization_code",
			code: authorization_code,
			client_id: this.ClientId,
			client_secret: this.ClientSecret,
			redirect_uri: redirect_uri,
		});

		let Axios = this._axiosCall(this.OidcSubpath);
		return Axios.post('/token',
			qs.toString()
		);
	}

	// Verify access to tenant
	verify_access(tenant, access_token, resource) {
		let rsrc = resource ? resource : "tenant:access";
		let Axios = this._axiosCall(this.RbacSubpath);
		return Axios.get("/" + tenant + "/" + rsrc,
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
		);
	}

	// Get tenants from database
	get_tenants() {
		let Axios = this._axiosCall("");
		return Axios.get('/tenant');
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
	login(redirect_uri) {
		const params = new URLSearchParams({
			response_type: "code",
			scope: this.Scope,
			client_id: this.ClientId,
			redirect_uri: redirect_uri
		});
		window.location.replace("https://accounts.google.com/o/oauth2/auth" + "?" + params.toString());
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
