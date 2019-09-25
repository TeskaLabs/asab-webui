import Service from '../../../abc/Service';


export default class AuthService extends Service{

    constructor(app, serviceName="AuthService"){
        super(app, serviceName)
        this.App = app

    }

    login(user) {
        this.App.Store.dispatch(loginAction(user));
    }
}


function loginAction (payload) {
    return {
        type:"LOGIN",
        payload:payload,
    }
}
