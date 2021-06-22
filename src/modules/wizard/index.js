import Module from 'asab-webui/abc/Module';
import WizardContainer from './WizardContainer';

export default class WizardModule extends Module {
    constructor (app) {
        super(app, "WizardModule");

        console.log("WizardModule: ", this);
        
        this.Router.addRoute({
            path: "/wizard/",
            exact: true,
            name: "Wizard",
            component: WizardContainer
        })

        this.Navigation.addItem({
            name: "Wizard",
            icon: "cil-gem",
            url: "/wizard/"
        })
    }
}