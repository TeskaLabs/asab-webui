import AuthenticationModule from 'asab-webui-kit-lite/modules/oauth';
import GitHubAuthMethod from 'asab-webui-kit-lite/modules/oauth/services/authmethods/GitHubAuthMethod';
import TeskalabsAuthMethod from 'asab-webui-kit-lite/modules/oauth/services/authmethods/TeskalabsAuthMethod';



export default class MyOAuthModule extends AuthenticationModule {

    addAuthMethods () {

         this.AuthService.addAuthMethods(
        	new GitHubAuthMethod(this.App, 1)
        );

        this.AuthService.addAuthMethods(
        	new TeskalabsAuthMethod(this.App, 2)
        );

        this.AuthService.setRegisterAllowed (true);

        this.AuthService.setRedirectRoute ("/imgviewer")
    }
}
