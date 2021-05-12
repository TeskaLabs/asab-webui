import Module from '../../abc/Module';

import HeaderComponent from './header'
import reducer from './reducer';
import { types } from './actions'
import { SeaCatAuthApi, GoogleOAuth2Api } from './api';
import AccessControlScreen from './AccessControlScreen';


export default class AuthModule extends Module {

	constructor(app, name){
		super(app, "AuthModule");

		this.OAuthToken = JSON.parse(sessionStorage.getItem('SeaCatOAuth2Token'));
		this.UserInfo = null;
		this.Api = new SeaCatAuthApi(app);
		this.RedirectURL = window.location.href;
		this.MustAuthenticate = true; // Setting this to false means, that we can operate without authenticated user
		this.Config = app.Config;
		this.DevConfig = app.DevConfig; // Dev config to simulate userinfo
		this.Store = app.Store;
		app.ReduxService.addReducer("auth", reducer);
		this.App.addSplashScreenRequestor(this);

		this.Authorization = this.Config.get("Authorization"); // Get Authorization settings from configuration

		// Access control screen
		app.Router.addRoute({
			path: '/auth/access-control',
			exact: true,
			name: 'Access control',
			component: AccessControlScreen
		});
	}


	async initialize() {
		const headerService = this.App.locateService("HeaderService");
		headerService.addComponent(HeaderComponent, {AuthModule: this});

		if (this.DevConfig.get('MOCK_USERINFO')) {
			/* This section is only for DEV purposes! */
			this.simulateUserinfo(this.DevConfig.get('MOCK_USERINFO'))
			/* End of DEV section */
		} else {
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

				// Add interceptor with Bearer token in the Header into axios calls
				this.App.addAxiosInterceptor(this.authInterceptor());

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
		}
		this.App.removeSplashScreenRequestor(this);
	}


	authInterceptor() {
		const interceptor = config => {
			config.headers['Authorization'] = 'Bearer ' + this.OAuthToken['access_token'];
			return config;
		}
		return interceptor;
	}


	simulateUserinfo(mock_userinfo) {
		/*
			This method takes parameters from devConfig settings

			module.exports = {
				app: {...},
				devConfig: {
					MOCK_USERINFO: {
						"email": "test",
						"phone_number": "test",
						"preferred_username": "test",
						"resources": ["test:testy:read"],
						"roles": ["default/Gringo"],
						"sub": "tst:123456789",
						"tenants": ["default"]
					}
				},
				webPackDevServer: {...}
			}

		*/
		this.App.addAlert("warning", "You are in DEV mode and using MOCK login parameters.", 60000);
		let mockParams = mock_userinfo;
		if (mockParams.resources) {
			mockParams["resources"] = Object.values(mockParams.resources)
		}
		if (mockParams.roles) {
			mockParams["roles"] = Object.values(mockParams.roles)
		}
		if (mockParams.tenants) {
			mockParams["tenants"] = Object.values(mockParams.tenants)
		}

		if (this.App.Store != null) {
			this.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: mockParams });
		}

		// Check for TenantService and pass tenants list obtained from userinfo
		let tenants_list = mockParams.tenants;
		if (this.App.Services.TenantService) {
			this.App.Services.TenantService.set_tenants(tenants_list);
		}
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

		// Check for TenantService and pass tenants list obtained from userinfo
		let tenants_list = this.UserInfo.tenants;
		if (this.App.Services.TenantService) {
			this.App.Services.TenantService.set_tenants(tenants_list);
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
		let authorized = false;
		// Check if Tenant service is enabled in the application and decide on type of user authorization
		if (this.App.Services.TenantService) {
			let currentTenant = this.App.Services.TenantService.get_current_tenant();
			authorized = await this.Api.verify_access(this.OAuthToken['access_token'], this.Authorization?.Resource, currentTenant).then(response => {
				if (response.data.result == 'OK'){
						return true;
					}
				}).catch((error) => {
					console.log(error);
					return false;
				});
		} else {
			authorized = await this.Api.verify_access(this.OAuthToken['access_token'], this.Authorization?.Resource).then(response => {
				if (response.data.result == 'OK'){
						return true;
					}
				}).catch((error) => {
					console.log(error);
					return false;
				});
		}
		return authorized;
	}

}
