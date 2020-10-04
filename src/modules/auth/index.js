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
		
		if (this.OAuthToken != null) {
			let result = await this._updateUserInfo();
			if (!result) {
				sessionStorage.removeItem('SeaCatOAuth2Token');
				console.log("!!! failed to _updateUserInfo()");
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
		catch {
			return false;
		}

		this.OAuthToken = response.data;
		sessionStorage.setItem('SeaCatOAuth2Token', JSON.stringify(response.data));
	}

}
