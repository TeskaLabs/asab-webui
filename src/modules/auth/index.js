import Module from '../../abc/Module';

import HeaderComponent from './header'
import reducer from './reducer';
import { types } from './actions'
import { SeaCatAuthApi, GoogleOAuth2Api } from './api';


export default class AuthModule extends Module {

	constructor(app, name){
		super(app, "AuthModule");

		this.OAuthToken = JSON.parse(sessionStorage.getItem('SeaCatOAuth2Token'));
		this.UserInfo = null;
		this.Api = new SeaCatAuthApi(app.Config);
		this.RedirectURL = window.location.href;
		this.MustAuthenticate = true; // Setting this to false means, that we can operate without authenticated user

		app.ReduxService.addReducer("auth", reducer);
		this.App.addSplashScreenRequestor(this);

		this.Resource = app.Config.get("resource"); // Get the resource for rbac endpoint from configuration
	}


	async initialize() {
		const headerService = this.App.locateService("HeaderService");
		headerService.addComponent(HeaderComponent, {AuthModule: this});

		// Check the query string for 'code'
		const qs = new URLSearchParams(window.location.search);
		const authorization_code = qs.get('code');
		if (authorization_code !== null) {
			await this._updateToken(authorization_code);

			// Remove 'code' from a query string
			qs.delete('code');

			// And reload the app
			window.location.replace('?' + qs.toString() + window.location.hash);
			return;
		}
		
		// Do we have an oauth token (we are authorized to use the app)
		if (this.OAuthToken != null) {
			// Update the user info
			let result = await this._updateUserInfo();
			if (!result) {
				// User info not found - go to login
				sessionStorage.removeItem('SeaCatOAuth2Token');
				let force_login_prompt = true;

				this.Api.login(this.RedirectURL, force_login_prompt);
				return;
			}
			// TODO: make authorization configurable
			// Authorization of the user based on rbac
			let userAuthorized = await this._isUserAuthorized();
			if (!userAuthorized) {
				this.App.addAlert("danger", "You are not authorized to use this application.",  40000)
				return;
			}
		}

		if ((this.UserInfo == null) && (this.MustAuthenticate)) {
			// TODO: force_login_prompt = true to break authentication failure loop
			let force_login_prompt = false;
			this.Api.login(this.RedirectURL, force_login_prompt);
			return;
		}
		
		this.App.removeSplashScreenRequestor(this);
	}


	logout() {
		this.App.addSplashScreenRequestor(this);

		sessionStorage.removeItem('SeaCatOAuth2Token');
		const promise = this.Api.logout(this.OAuthToken['access_token'])
		if (promise == null) {
			window.location.reload();
		}

		promise.then(response => {
			window.location.reload();
		}).catch((error) => {
			window.location.reload();
		});
	}


	async _updateUserInfo() {
		let response;
		try {
			response = await this.Api.userinfo(this.OAuthToken.access_token);
		}
		catch (err) {
			console.log("Failed to update user info", err);
			this.UserInfo = null;
			if (this.App.Store != null) {
				this.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: this.UserInfo });
			}
			return false;
		}

		this.UserInfo = response.data;
		if (this.App.Store != null) {
			this.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: this.UserInfo });
		}

		return true;
	}


	async _updateToken(authorization_code) {
		let response;
		try {
			response = await this.Api.token_authorization_code(authorization_code, this.RedirectURL);
		}
		catch (err) {
			console.log("Failed to update token", err);
			return false;
		}

		this.OAuthToken = response.data;
		sessionStorage.setItem('SeaCatOAuth2Token', JSON.stringify(response.data));

		return true;
	}


	async _isUserAuthorized() {
		let resp = false;
		let tenants;
		// Get the list of all available tenants of the application
		await this.Api.get_tenants()
		.then(response => {
			tenants = response.data;
		})
		.catch((error) => {
			console.log("Failed to load tenants", error);
			resp = false;
		});
		// Is user authorized - returns true or false
		if (tenants.length > 0) {
			resp = await this._storeAuthorizedTenants(tenants, this.Resource);
		} else {
			resp = false;
		}
		return resp;
	}


	async _storeAuthorizedTenants(tenants, resource) {
		let payload = [];
		let resp = false;
		const params = new URLSearchParams(window.location.search);
		let tenant_id = params.get('tenant');
		// Check tenants of the user with the available tenants of the application.
		await Promise.all(Object.values(tenants).map(async (tenant, idx) => {
			await this.Api.verify_access(tenant._id, this.OAuthToken['access_token'], resource).then(response => {
				if (response.data.result == 'OK'){
					payload.push(tenant)
				}
			}).catch((error) => {
				console.log(error);
				resp = false;
			})
		}));
		// If there is no match, user is not allowed to access the application or part of the application.
		if (payload.length > 0) {
			if (this.App.Store != null) {
				// Get current tenant
				let current = payload[0];
				// Check if tenant_id is null in URL or if tenant_id does exist in the list of authorized tenants
				if (tenant_id == null || !(JSON.stringify(payload).indexOf(tenant_id) != -1)) {
					tenant_id = payload[0]._id;
					// refresh (reload) the whole web app
					window.location.replace('?tenant='+tenant_id+'#/');
					return;
				} else {
					current = {"_id":tenant_id};
				}
				// Store the authorized tenants and the current tenant in the redux store
				this.App.Store.dispatch({ type: types.AUTH_TENANTS, payload: payload, current: current });
				resp = true;
			}
		} else {
			resp = false;
		}
		return resp
	}

}
