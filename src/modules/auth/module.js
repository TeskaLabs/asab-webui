import Module from '../../abc/Module';
import {HEADER_POS_LEFT, HEADER_POS_RIGHT} from '../../services/HeaderService';

import HeaderComponent from './header'
import reducer from './reducer';
import { types } from './actions'
import Api from './api';

export default class AuthModule extends Module {
	constructor(app, name){
		super(app, "AuthModule");

		this.App = app;
		this.UserInfo = null;

		const headerService = app.locateService("HeaderService");
		headerService.addComponent(HEADER_POS_RIGHT, HeaderComponent, {AuthModule: this});

		app.ReduxService.addReducer("auth", reducer);

		self.OAuthToken = JSON.parse(sessionStorage.getItem('SeaCat::OAuth::Token'));
		if (self.OAuthToken == null) {
			window.location.replace("/signin");
		}

		this.updateUserInfo();
	}

	logout() {
		sessionStorage.removeItem('SeaCat::OAuth::Token');
		Api.logout(self.OAuthToken['access_token']).then(response => {
			window.location.replace("/signin");
		}).catch((error) => {
			window.location.replace("/signin");
		});
	}

	updateUserInfo() {

		Api.get_userinfo(self.OAuthToken['access_token']).then(response => {
			this.UserInfo = response.data;
			this.App.Store.dispatch({ type: types.AUTH_USERINFO, payload: this.UserInfo });
		}).catch((error) => {
			window.location.replace("/signin");	
		});
	}

}
