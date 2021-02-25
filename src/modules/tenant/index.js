import React from 'react';
import Module from '../../abc/Module';
import TenantService from './service';
import TenantDropdown from './TenantDropdown';
import reducer from './reducer';

export default class TenantModule extends Module {

	constructor(app, name) {
		super(app, "TenantModule");
		this.App = app;

		const OAuthToken = JSON.parse(sessionStorage.getItem('SeaCatOAuth2Token'));
		if (OAuthToken == null) {
			this.TenantService = new TenantService(app, "TenantService");
			this.App.ReduxService.addReducer("auth", reducer);
		}

	}


	initialize() {
		const headerService = this.App.locateService("HeaderService");
		headerService.addComponent(TenantDropdown);
	}

}
