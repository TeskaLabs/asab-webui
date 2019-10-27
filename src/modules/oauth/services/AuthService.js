import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string'
import Service from '../../../abc/Service';
import RegisterContainer from '../containers/RegisterContainer'


export default class AuthService extends Service {

    constructor(app, serviceName = "AuthService") {
        super(app, serviceName)
        this.App = app
        this.AuthMethods = {};
        this.ActiveAuthMethod = null
        this.RegisterAllowed = false
        this.RedirectRoute = "/"
    }

    setRegisterAllowed(flag) {
        if (flag == true) {
            this.RegisterAllowed = flag;

            this.App.Router.addRoute({
                path: '/auth/register',
                exact: true,
                name: 'TL Registration',
                component: RegisterContainer,
                hasHeader: false,
                hasSidebar: false,
                hasBreadcrumb: false,
                hasFooter: true,
                authn: false,
            });
        }
    }

    getRegisterAllowed() {
        return this.RegisterAllowed;
    }

    setRedirectRoute (route) {
        this.RedirectRoute = route;
    }

    getRedirectRoute () {
        return this.RedirectRoute;
    }


    addAuthMethods(authMethod) {
        const authMethodName = authMethod.getName()
        this.AuthMethods[authMethodName] = authMethod
        console.log(this.AuthMethods)
    }

    setActiveAuthMethod(authMethod) {
        this.ActiveAuthMethod = authMethod;
    }

    getButtonsInfo() {
        const links = {}

        Object.keys(this.AuthMethods).forEach(
            key => {
                //console.log(this.AuthMethods[key].getButtonInfo())
                links[key] = this.AuthMethods[key].getButtonInfo()
            }
        )
        return links
    }

    getUser() {
        console.log("getting user");
        return this.App.Store.getState().AuthService
    }

    async login(authMethod, code) {
        console.log("LOGGING IN WITH AUTHSERVICE")
        console.log("authMethod",authMethod)
        console.log("code",code)
        const path = await this.AuthMethods[authMethod].login(code)
        return path
    }

    logout() {
        this.ActiveAuthMethod.logout()
    }

}








