import Module from '../../abc/Module';

import HeaderComponent from './header'
import reducer from './reducer';
import { types } from './actions'
import { SeaCatAuthApi, GoogleOAuth2Api } from './api';
import AccessControlScreen from './AccessControlScreen';

export default class AuthModule extends Module {

	constructor(app, name) {
		super(app, "AuthModule");

		this.OAuthToken = JSON.parse(sessionStorage.getItem('SeaCatOAuth2Token'));
		this.UserInfo = null;
		this.Api = new SeaCatAuthApi(app);
		this.RedirectURL = window.location.href;
		this.MustAuthenticate = true; // Setting this to false means, that we can operate without authenticated user
		app.ReduxService.addReducer("auth", reducer);
		this.App.addSplashScreenRequestor(this);
		this.Authorization = this.App.Config.get("authorization"); // Get authorization settings from configuration

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
		headerService.addComponent(HeaderComponent, { AuthModule: this });
		if (this.App.DevConfig.get('MOCK_USERINFO')) {
			/* This section is only for DEV purposes! */
			this.simulateUserinfo(this.App.DevConfig.get('MOCK_USERINFO'))
			/* End of DEV section */
		} else {
			// Check the query string for 'code'
			var qs = new URLSearchParams(window.location.search);
			const authorization_code = qs.get('code');
			if (authorization_code !== null) {
				await this._updateToken(authorization_code);
				// Remove 'code' from a query string
				qs.delete('code');

				// Construct the new URL without `code` in the query string
				// For this case, condition on empty qs string is sufficient and tested
				let reloadUrl;
				if (qs.toString() == '') {
					// Remove `?` part from URL completely, if empty
					reloadUrl = window.location.pathname + window.location.hash;
				} else {
					reloadUrl = window.location.pathname + '?' + qs.toString() + window.location.hash;
				}

				// Reload the app
				window.location.replace(reloadUrl);
				await new Promise(r => setTimeout(r, 3600 * 1000)); // Basically wait forever, this the app is going to be reloaded
			}

			// Do we have an oauth token (we are authorized to use the app)
			if (this.OAuthToken != null) {
				// Update the user info
				let result = await this.updateUserInfo();
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
				if (this.App.Config.get("authorization") !== "disabled" && this.App.Services.TenantService) {
					// Tenant access validation
					let tenantAuthorized = this.validateTenant();
					let logoutTimeout = this.App.Config.get("authorizationLogoutTimeout") ? this.App.Config.get("authorizationLogoutTimeout") : 60000;
					if (!tenantAuthorized) {
						this.App.addAlert("danger", "ASABAuthModule|You are not authorized to use this application", logoutTimeout, true);
						// Logout after some time
						setTimeout(() => {
							this.logout();
						}, logoutTimeout);
						return;
					}
				}

				// Validate resources of items and children in navigation
				if (this.App.Navigation.Items.length > 0) {
					await this.validateNavigation();
				}

				this._notifyOnExpiredSession(this);
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
		this.App.addAlert("warning", "ASABAuthModule|You are in DEV mode and using MOCK login parameters", 3, true);
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


	async validateNavigation() {
		let getItems = this.App.Navigation.getItems();
		let unauthorizedNavItems = [];
		let unauthorizedNavChildren = [];
		let resources = [];
		if (this.UserInfo !== null) {
			resources = this.UserInfo.resources ? this.UserInfo.resources : [];
		}
		// Add item name from Navigation based on Access resource to the list of unauthorized items
		await Promise.all(getItems.items.map(async (itm, idx) => {
			if (itm.resource) {
				let access_auth = this.validateItem(itm.resource, resources);
				if (!access_auth) {
					unauthorizedNavItems.push(itm.name);
				}
			}
			// Add unauthorized Navigation children name based on Access resource to the list of unauthorized children
			if (itm.children) {
				await Promise.all(itm.children.map(async (child, id) => {
					if (child.resource) {
						let access_auth = this.validateItem(child.resource, resources);
						if (!access_auth) {
							unauthorizedNavChildren.push(child.name);
						}
					}
				}))
			}
		}))
		this.App.Store.dispatch({ type: types.NAVIGATION_UNAUTHORIZED_ITEM, unauthorizedNavItem: unauthorizedNavItems });
		this.App.Store.dispatch({ type: types.NAVIGATION_UNAUTHORIZED_CHILDREN, unauthorizedNavChildren: unauthorizedNavChildren });
	}

	// Validate sidebar items
	validateItem(resource, resources) {
		let valid = resources ? resources.indexOf(resource) !== -1 : false;
		// If user is superuser, then item is enabled
		if (resources.indexOf('authz:superuser') !== -1) {
			valid = true;
		}
		return valid;
	}

	// Validate tenant access
	validateTenant() {
		let resources = [];
		let tenants = [];
		let currentTenant = this.App.Services.TenantService.get_current_tenant();
		if (this.UserInfo !== null) {
			resources = this.UserInfo.resources ? this.UserInfo.resources : [];
			tenants = this.UserInfo.tenants ? this.UserInfo.tenants : [];
		}
		let valid = tenants ? tenants.indexOf(currentTenant) !== -1 : false;
		// If user is superuser, then tenant access is granted
		if (resources.indexOf('authz:superuser') !== -1) {
			valid = true;
		}
		return valid;
	}

	async _notifyOnExpiredSession(that = this, oldUserInfo = null, fAlert = false) {
		const isUserInfoIpdated = await that.updateUserInfo();
		// if session has expired
		if (!isUserInfoIpdated && oldUserInfo) {
			oldUserInfo = null;
			that.App.addAlert("danger", "ASABAuthModule|Your session has expired", 3600 * 1000, true);
		}
		else {
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
				const expire = exp > Date.now() ? difference / 1000 : 5;
				that.App.addAlert("warning", "ASABAuthModule|Your session will expire soon", expire, true);
				fAlert = true;
			}

			/**
			* 1) If first alert wasn't shown then timeout will be set on a minute before expiration date
			* 2) If first alert was shown but expiration date hasn't come yet, then timeout will be set on expiration date
			* 3) If expiration date has come then timeout will be set on 30 seconds to check if user's session has been
			*    deleted on server side
			*/
			const timeout = fAlert ? difference > 0 ? difference : 30000 : difference - 60000;
			setTimeout(that._notifyOnExpiredSession, timeout, that, that.UserInfo, fAlert);
		}
	}

	async updateUserInfo() {
		let response;
		try {
			response = await this.Api.userinfo(this.OAuthToken.access_token);
		}
		catch (err) {
			console.error("Failed to update user info", err);
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

		/** Check for TenantService and pass tenants list obtained from userinfo */
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
			console.error("Failed to update token", err);
			return false;
		}
		this.OAuthToken = response.data;
		sessionStorage.setItem('SeaCatOAuth2Token', JSON.stringify(response.data));

		return true;
	}

}
