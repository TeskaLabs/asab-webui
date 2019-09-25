import React, { Component } from 'react'
import reducer from './services/reducer'

import Module from '../../abc/Module';
import {HEADER_POS_RIGHT} from '../../services/HeaderService';

import UserDropdown from './containers/UserDropdown';
import AuthContainer from './containers/AuthContainer'
import AuthService from './services/AuthService'


export default class AuthenticationModule extends Module {
    constructor(app, name){
        super(app, "Authentication");

        app.Router.addRoute({
            path: '/auth',
            exact: true,
            name: 'Authentication',
            component: AuthContainer,
            hasHeader: false,
            hasSidebar: false,
            hasBreadcrumb: false,
            hasFooter: true,
            authn: false,
        });


        // Custom userdropdown Component in header
        const headerService = app.locateService("HeaderService");
        headerService.addComponent(HEADER_POS_RIGHT, UserDropdown);

        // Add AuthService
        this.AuthService = new AuthService(app, "AuthService");
        app.ReduxService.addReducer("AuthService", reducer);
    }
}
