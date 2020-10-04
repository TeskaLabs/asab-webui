import Module from '../../abc/Module';

import HeaderComponent from './header'
import reducer from './reducer';
import { types } from './actions'
import { SeaCatAuthApi, GoogleOAuth2Api } from './api';

export default class AuthModule extends Module {


	constructor(app, name){
		super(app, "AuthModule");

		this.UserInfo = null;
		this.Api = new SeaCatAuthApi(app.Config);
		this.RedirectURL = window.location.href;

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
			return;
		}
		
		await this._updateUserInfo();
		
		// await this._login();
	}


	async _login(force_login_prompt) {
		if (force_login_prompt === undefined) force_login_prompt = false;
		this.Api.login(this.RedirectURL, force_login_prompt);
	}


	logout() {
		this.App.addSplashScreenRequestor(this);

		sessionStorage.removeItem('SeaCatOAuth2Token');
		const promise = this.Api.logout(this.OAuthToken['access_token'])
		if (promise == null) {
			this._login();
		}

		promise.then(response => {
			this._login();
		}).catch((error) => {
			this._login();
		});
	}


	async _updateUserInfo() {
		let response;
		try {
			response = await this.Api.userinfo();
		}
		catch {
			// This login call should force re-authentication to prevent infinite looping
			await this._login(true);
			return;
		}

		this.UserInfo = response.data;
		this.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: this.UserInfo });
		this.App.removeSplashScreenRequestor(this);
	}


	async _updateToken(authorization_code) {
		
		let response = await this.Api.token_authorization_code(authorization_code, this.RedirectURL);

		this.OAuthToken = response.data;
		sessionStorage.setItem('SeaCatOAuth2Token', JSON.stringify(response.data));
		
		this.App.props.history.push('/');
		await this._updateUserInfo()

		// }).catch((error) => {
		// 	console.log(error);
		// 	await this._login();
		// });
	}

}
