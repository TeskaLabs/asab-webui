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
		this.Api = new SeaCatAuthApi(app);
		this.RedirectURL = window.location.href;
		this.MustAuthenticate = true; // Setting this to false means, that we can operate without authenticated user
		this.Config = app.Config;
		this.Store = app.Store;
		app.ReduxService.addReducer("auth", reducer);
		this.App.addSplashScreenRequestor(this);

		this.Authorization = this.Config.get("Authorization"); // Get Authorization settings from configuration
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
			// Authorization of the user based on rbac
			if (this.Authorization?.Authorize) {
				let userAuthorized = await this._isUserAuthorized();
				let logoutTimeout = this.Authorization?.UnauthorizedLogoutTimeout ? this.Authorization.UnauthorizedLogoutTimeout : 60000;
				if (!userAuthorized) {
					this.App.addAlert("danger", "You are not authorized to use this application.", logoutTimeout);
					// Logout after some time
					setTimeout(() => {
						this.logout();
					}, logoutTimeout);
					return;
				}
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
		// Extract a current tenant from a query string
		const search = window.location.search;
		const params = new URLSearchParams(search);
		let tenant_id = params.get('tenant');
		try {
			response = await this.Api.userinfo(this.OAuthToken.access_token);
		}
		catch (err) {
			this.UserInfo = null;
			if (this.App.Store != null) {
				this.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: this.UserInfo });
			}
			return false;
		}

		this.UserInfo = response.data;
		if (this.App.Store != null) {
			if (tenant_id == null) {
				tenant_id = this.UserInfo.tenants[0];
				// ... and refresh (reload) the whole web app
				window.location.replace('?tenant='+tenant_id+'#/');
			}

			// Find the current tenant in the list and extract its
			let x = this.UserInfo.tenants.filter((item) => { return item == tenant_id } );
			if (x.length < 1) {
				this.App.addAlert("danger", "Invalid tenant :-(", 40000);
				// return;
			}
			this.App.Store.dispatch({
				type: types.AUTH_USERINFO,
				payload: this.UserInfo,
				tenants: this.UserInfo.tenants,
				current: x[0] });
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
		// TODO: Solve race condition when obtaining tenant from redux store
		const state = this.Store.getState();
		let activeTenant = state.auth.current;
		// If active tenant is null, then use tenant from parameters
		if (activeTenant == null) {
			const params = new URLSearchParams(window.location.search);
			activeTenant = params.get('tenant');
		}

		resp = await this.Api.verify_access(activeTenant, this.OAuthToken['access_token'], this.Authorization?.Resource).then(response => {
			if (response.data.result == 'OK'){
					return true;
				}
			}).catch((error) => {
				console.log(error);
				return false;
			});

		return resp;
	}

}
