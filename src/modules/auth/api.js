import axios from 'axios';

export class SeaCatAuthApi {

	/*
	SeaCat Auth Open ID Connect / OAuth2.0


	From config.js:

	module.exports = {
		app: {
			"seacat.auth.oidc_url": 'http://localhost:3000/openidconnect',
			...
	*/

	constructor(config) {
		this.BaseURL = config.get('seacat.auth.oidc_url');
		if ((this.BaseURL == undefined) || (this.BaseURL == null)) {
			console.log("Provide config value seacat.auth.oidc_url");
			this.BaseURL = "/openidconnect";
		}
		this.Axios = axios.create({
			timeout: 10000,
			baseURL: this.BaseURL,
		});

		const scope = config.get('seacat.auth.scope');
		this.Scope = scope ? scope : "openid";
		this.ClientId = "TODO";
		this.ClientSecret = "TODO";
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
		window.location.replace(this.BaseURL + "/authorize?" + params.toString());
	}

	logout(access_token) {
		return this.Axios.get(
			'/logout',
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
		);
	}


	userinfo(access_token) {
		return this.Axios.get(
			'/userinfo',
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
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
			'/token',
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

