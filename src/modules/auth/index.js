import Module from '../../abc/Module';

import HeaderComponent from './header'
import reducer from './reducer';
import { types } from './actions'
import { SeaCatAuthApi, GoogleOAuth2Api } from './api';

export default class AuthModule extends Module {
	
	constructor(app, name){
		super(app, "AuthModule");

		this.App = app;
		this.RedirectURL = window.location.href;

		// Request the splash screen
		this.App.addSplashScreenRequestor(this);


		app.ReduxService.addReducer("auth", reducer);

		this.Api = new SeaCatAuthApi(app.Config);

		this.UserInfo = null;
		this.OAuthToken = JSON.parse(sessionStorage.getItem('SeaCatOAuth2Token'));
		if (this.OAuthToken == null) {

			// Check the query string for 'code'
			const qs = new URLSearchParams(window.location.search);
			const authorization_code = qs.get('code');

			if (authorization_code !== null) {
				this.updateToken(authorization_code);
			} else {
				this.login();
			}

		} else {
			this.updateUserInfo();
		}
	}


	initialize() {
		const headerService = this.App.locateService("HeaderService");
		headerService.addComponent(HeaderComponent, {AuthModule: this});
	}


	login(force_login_prompt) {
		if (force_login_prompt === undefined) force_login_prompt = false;
		this.Api.login(this.RedirectURL, force_login_prompt);
	}

	logout() {
		this.App.addSplashScreenRequestor(this);

		sessionStorage.removeItem('SeaCatOAuth2Token');
		const promise = this.Api.logout(this.OAuthToken['access_token'])
		if (promise == null) {
			this.login();
		}

		promise.then(response => {
			this.login();
		}).catch((error) => {
			this.login();
		});
	}

	updateUserInfo() {
		const access_token = this.OAuthToken['access_token'];
		if ((access_token == undefined) || (access_token == null)) {
			this.login();
			return;
		}

		this.Api.userinfo(access_token).then(response => {
			this.UserInfo = response.data;
			this.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: this.UserInfo });
			this.App.removeSplashScreenRequestor(this);
		}).catch((error) => {
			console.log(error);
			this.login(true); // This login call should force re-authentication to prevent infinite looping
		});
	}

	updateToken(authorization_code) {
		this.Api.token_authorization_code(authorization_code, this.RedirectURL).then(response => {
			this.OAuthToken = response.data;
			sessionStorage.setItem('SeaCatOAuth2Token', JSON.stringify(response.data));
			
			this.App.props.history.push('/');
			this.updateUserInfo()

		}).catch((error) => {
			console.log(error);
			this.login();
		});
	}

}
