import React from 'react';
import Module from '../../abc/Module';
import TenantService from './service';
import {HEADER_POS_LEFT, HEADER_POS_RIGHT} from '../../services/HeaderService';
import TenantDropdown from './TenantDropdown';
import reducer from './reducer';

export default class TenantModule extends Module {
    constructor(app, name) {
        super(app, "TenantModule");
        this.App = app;
        this.TenantService = new TenantService(app, "TenantService");

        this.App.ReduxService.addReducer("tenant", reducer);
    }

    initialize() {
        const headerService = this.App.locateService("HeaderService");
        headerService.addComponent(HEADER_POS_RIGHT, TenantDropdown);
        // headerService.addComponent(HEADER_RIGHT, TenantListComponent);
        // this.TenantService.initialize();
    }
}
