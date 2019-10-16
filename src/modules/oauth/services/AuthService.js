import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string'
import Service from '../../../abc/Service';



class AuthService extends Service{

    constructor(app, serviceName="AuthService"){
        super(app, serviceName)
        this.App = app
    }

    login(user) {
        this.App.Store.dispatch(loginAction(user));
    }

    logout() {
        // revoke access token
        // revoke refresh token
        const user = this.App.Store.getState().AuthService;

        this.revokeRequest(user.token_type, user.auth_server, user.access_token,  user.refresh_token);
        this.revokeRequest(user.token_type, user.auth_server, user.access_token,  user.access_token);
        this.App.Store.dispatch(logoutAction());
    }


    async revokeRequest (tokenType, authServer, accessToken,tokenToRevoke) {

        const url = "/invalidate";
        const requestBody = {
            "token":tokenToRevoke,
        }
        const bodyString = queryString.stringify(requestBody)

        const config = {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-OAuthServerId': authServer,
                'Authorization': `${tokenType} ${accessToken}`,
            }
        }

        const respData = await axios.post(url, bodyString, config);
        console.log (respData.status == 200 ? "TOKEN INVALIDATED" : `LOGOUT FAILED: ${respData.status}`);




    }
}


function loginAction (payload) {
    return {
        type:"LOGIN",
        payload:payload,
    }
}


function logoutAction () {
    return {
        type:"LOGOUT",
    }
}




export default AuthService
