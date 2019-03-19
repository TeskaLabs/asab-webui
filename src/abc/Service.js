export default class Service {
    constructor(app, serviceName){
        this.Name = serviceName
        this.App = app;
        app.registerService(this)
    }

    initialize() {
        // Override this method in your service
        // At this point it is ensured, that Redux Store exists at App.Store
    }
}