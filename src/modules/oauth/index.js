import React, { Component } from 'react'
import reducer from './services/reducer'

import Module from '../../abc/Module';

import UserDropdown from './containers/UserDropdown';
import OAuthContainer from './containers/OAuthContainer'
import OAuthService from './services/OAuthService'
// import SignWithContainer from './containers/SignWithContainer';

import './style.css';

export default class OAuthModule extends Module {
    constructor(app, name){
        super(app, "Authentication");
        this.App = app

        app.Router.addRoute({
            path: '/auth',
            exact: true,
            name: 'Authentication',
            component: OAuthContainer,
            hasHeader: false,
            hasSidebar: false,
            hasBreadcrumb: false,
            hasFooter: true,
            authn: false,
        });

        // app.Router.addRoute({
        //     path: '/auth/signin',
        //     exact: true,
        //     name: 'Sing in',
        //     component: SignWithContainer,
        //     hasHeader: false,
        //     hasSidebar: false,
        //     hasBreadcrumb: false,
        //     hasFooter: true,
        //     authn: false,
        // });

        // Add UserDropdown Component in header
        const headerService = app.locateService("HeaderService");
        const userDropdownProps = {"app":app};
        headerService.addComponent(UserDropdown, userDropdownProps);

        // Add AuthService
        this.AuthService = new OAuthService(app, "AuthService");

        app.ReduxService.addReducer("AuthService", reducer);

        this.addAuthMethods();
    }

    initialize(){
        this.AuthService.initializeFromStorage();
    }

}
