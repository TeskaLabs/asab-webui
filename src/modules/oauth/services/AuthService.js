import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string'
import Service from '../../../abc/Service';



export default class AuthService extends Service{

    constructor(app, serviceName="AuthService"){
        super(app, serviceName)
        this.App = app
        this.AuthMethods = [];
        this.ActiveAuthMethod = null
    }


    addAuthMethods(authMethods) {
        this.AuthMethods.concat(authMethods);
    }

    setActiveAuthMethod (authMethod) {
        ths.ActiveAuthMethod = authMethod;add
    }

    getAuthLinks() {
        const links = []
        for (const [index, authMethod] of this.AuthMethods.entries()) {
            links.append (authMethod.getLink ());
        }
        return links
    }

    login () {
        this.ActiveAuthMethod.login ()
    }

    logout () {
        this.ActiveAuthMethod.logout ()
    }

}








