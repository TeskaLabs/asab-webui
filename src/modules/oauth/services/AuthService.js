import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string'
import Service from '../../../abc/Service';



export default class AuthService extends Service {

    constructor(app, serviceName = "AuthService") {
        super(app, serviceName)
        this.App = app
        this.AuthMethods = {};
        this.ActiveAuthMethod = null
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

        Object.keys (this.AuthMethods).forEach (
            key => {
                links[key] = this.AuthMethods[key].getButtonInfo()
            }
        )
        return links
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








