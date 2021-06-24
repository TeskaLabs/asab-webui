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

		this.Navigation = app.Navigation; // Get the navigation
		this.Authorization = this.Config.get("authorization"); // Get authorization settings from configuration

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

				// Check for empty query string and update hash url eventually
				let hash_url = '?' + qs.toString() + window.location.hash;
				if (qs.toString() == '') {
					hash_url = '/' + window.location.hash;
				}
				// And reload the app
				window.location.replace(hash_url);
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

				// Authorization of the user based on tenant access
				if (this.Authorization?.authorize) {
					// Tenant access validation
					let tenant_authorized = await this._isUserAuthorized(this.Authorization?.resource, this.App.Services.TenantService);
					let logoutTimeout = this.Authorization?.unauthorized_logout_timeout ? this.Authorization.unauthorized_logout_timeout : 60000;
					if (!tenant_authorized) {
						this.App.addAlert("danger", "You are not authorized to use this application.", logoutTimeout);
						// Logout after some time
						setTimeout(() => {
							this.logout();
						}, logoutTimeout);
						return;
					}
				}

				// Remove item from Navigation based on Access resource
				if (this.Navigation.Items.length > 0) {
					let getItems = this.Navigation.getItems();
					await Promise.all(getItems.items.map(async(itm, idx) => {
						if (itm.resource) {
							let access_auth = await this._isUserAuthorized(itm.resource);
							if (!access_auth) {
								this.Navigation.removeItem(itm)
							}
						}
					}))
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
		this.App.addAlert("warning", "You are in DEV mode and using MOCK login parameters.", 3);
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

		/** Check for TenantService and pass tenants list obtained from userinfo */
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

	async _updateUserInfo(that = this, oldUserInfo = null, fAlert = false) {
		let response;
		try {
			response = await that.Api.userinfo(that.OAuthToken.access_token);
		}
		catch (err) {
			console.log("Failed to update user info", err);
			// If session has expired
			if (oldUserInfo) {
				oldUserInfo = null;
				that.App.addAlert("warning", "Your session has expired");
			}
			that.UserInfo = null;
			if (that.App.Store != null) {
				that.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: that.UserInfo });
			}
			return false;
		}

		that.UserInfo = response.data;
		if (that.App.Store != null) {
			that.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: that.UserInfo });
		}

		/** Check for TenantService and pass tenants list obtained from userinfo */
		let tenants_list = that.UserInfo.tenants;
		if (that.App.Services.TenantService) {
			that.App.Services.TenantService.set_tenants(tenants_list);
		}

		/** Notifying user about session expiration section */
		let exp = new Date(that.UserInfo.exp).getTime(); // Expiration timestamp
		const difference = exp - Date.now(); // Difference between current time and expiration date in milliseconds

		/**
		 * If userinfo expiration date has been changed then first alert flag
		 * is set to false and first message about expiration will be shown
		 */
		if (oldUserInfo?.exp !== that.UserInfo.exp && difference < 60000) fAlert = false;

		/**
		 * If expiration date is coming (less than 60 seconds) and first message wasn't shown
		 * then first message will be shown until expiration date will come
		 */
		if (difference < 60000 && exp > Date.now() && !fAlert) {
			const expire = exp > Date.now() ? difference/1000 : 5;
			that.App.addAlert("warning", "Your session will expire soon.", expire);
			fAlert = true;
		}
		
		/**
		 * 1) If first alert wasn't shown then timeout will be set on a minute before expiration date
		 * 2) If first alert was shown but expiration date hasn't come yet, then timeout will be set on expiration date
		 * 3) If expiration date has come then timeout will be set on 30 seconds to check if user's session has been
		 *    deleted on server side
		 */
		const timeout = fAlert ? difference > 0 ? difference : 30000 : difference - 60000;
		setTimeout(that._updateUserInfo, timeout, that, that.UserInfo, fAlert);

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


	async _isUserAuthorized(resource, tenant_service) {
		let authorized = false;
		// Check if Tenant service is enabled in the application and decide on type of user authorization
		if (tenant_service) {
			let currentTenant = this.App.Services.TenantService.get_current_tenant();
			authorized = await this.Api.verify_access(this.OAuthToken['access_token'], resource, currentTenant).then(response => {
				if (response.data.result == 'OK'){
					return true;
				} else {
					return false;
				}
				}).catch((error) => {
					console.log(error);
					return false;
				});
		} else {
			authorized = await this.Api.verify_access(this.OAuthToken['access_token'], resource).then(response => {
				if (response.data.result == 'OK'){
					return true;
				} else {
					return false;
				}
				}).catch((error) => {
					console.log(error);
					return false;
				});
		}
		return authorized;
	}

}
