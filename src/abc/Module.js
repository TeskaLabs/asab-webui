export default class Module {
    constructor(app, name) {
    	this.App = app;
        this.Name = name;
        this.Config = app?.config;
		this.Navigation = app?.Navigation;
		this.Router = app?.Router;
    }

    initialize() {
    }
}
