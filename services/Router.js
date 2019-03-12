export default class Router {

    constructor(app){
        this.Routes = []
    }

    addRoute(route){
        /* Example:
            route = {
                path: '/some/path', // Url path
                exact: true,        // Whether path must be matched exactly
                name: 'Some Name',  // Route name
                component: ReactComponent // Component to be rendered
            }
        */
        this.Routes.push(route);
    }
}
