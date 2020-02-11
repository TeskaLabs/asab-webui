import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string'
import Service from '../../../abc/Service';
import RegisterContainer from '../containers/RegisterContainer'


export default class OAuthService extends Service {

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

    loggedIn() {
        return Boolean(this.ActiveAuthMethod);
    }

    getUserCredentials(withoutUpdate) {
        // get data from local storage

        const userCredentials = {
            access_token:localStorage.getItem("access_token"),
            token_type: localStorage.getItem("token_type"),
            auth_server: localStorage.getItem("auth_server"),
            auth_server_url: localStorage.getItem("auth_server_url"),
            username: localStorage.getItem("username"),
        }
        if (!userCredentials.access_token || !userCredentials.token_type || !userCredentials.auth_server || !userCredentials.username || !userCredentials.auth_server_url) {
            console.log("USER CREDENTIALS NOT FOUND IN LOCAL STORAGE")
            // TODO: trigger move to sing out mode
            // this.App.props.history.push('/auth')
            if(this.ActiveAuthMethod){
                this.ActiveAuthMethod.removeUserFromStore();
            }
            if(!withoutUpdate) {
                console.log("TRIGGERING FORCE UPDATE")
                this.App.forceUpdate();
            }
            return userCredentials
        }
        return userCredentials
    }

    async initializeFromStorage() {
        console.log("GETTING USER DATA FROM LOCAL STORAGE");

        // get data from local storage
        var userCredentials = this.getUserCredentials(true)
        if (!userCredentials.username) {
            return
        }

        // setActiveAuthMethod
        this.setActiveAuthMethod(this.AuthMethods[userCredentials.auth_server]);
        this.ActiveAuthMethod.saveUser(userCredentials)

        // request identity
        const identity = await this.ActiveAuthMethod.requestIdentity(userCredentials.token_type, userCredentials.access_token);

        if (!identity){
            console.log("USER CREDENTIALS NOT VALID ON THE SERVER")
            this.ActiveAuthMethod.removeUserFromStore();
            this.ActiveAuthMethod = null;
            this.clearLocalStorage();
            this.App.forceUpdate();
            return
        }


        //const user = this.ActiveAuthMethod.parseIdentityData(identity, userCredentials);
        // TODO: put user identity data in to redux store

        // this.App.Store.dispatch(loginAction(user));
        // this.ActiveAuthMethod.saveUser(userCredentials)

    }


    async login(authMethod, code) {
        // console.log("LOGGING IN WITH AUTHSERVICE")
        // console.log("authMethod",authMethod)
        // console.log("code",code)
        const path = await this.AuthMethods[authMethod].login(code)
        return path
    }

    clearLocalStorage() {
        const storageFields = ["access_token","token_type","auth_server","auth_server_url","username"];
        storageFields.forEach((val)=>{
            localStorage.removeItem(val);
        })
    }

    logout() {
        this.clearLocalStorage()
        this.ActiveAuthMethod.logout()
        this.ActiveAuthMethod = null;
    }
}
