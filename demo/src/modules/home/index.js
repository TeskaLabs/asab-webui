import { lazy } from 'react';
import Module from 'asab-webui/abc/Module';

const HomeContainer = lazy(() => import('./containers/HomeContainer'));
const TableContainer = lazy(() => import('./containers/TableContainer'));
const ErrorHandlerExample = lazy(() => import('./containers/ErrorHandlerExample'));

export default class HomeModule extends Module {
	constructor(app, name){
		super(app, "HomeModule");
		app.Router.addRoute({ path: '/home', exact: true, name: 'Home', component: HomeContainer });
		app.Router.addRoute({ path: '/table', exact: true, name: 'Table', component: TableContainer });
		app.Router.addRoute({ path: '/error-example', exact: true, name: 'Error Example', component: ErrorHandlerExample});
		app.Navigation.addItem({
			name: 'Home',
			url: '/home',
			icon: 'cil-home',
		});
		app.Navigation.addItem({
			name: 'Table',
			url: '/table',
			icon: 'cil-chart',
		});
		app.Navigation.addItem({
			name: 'Error Example',
			url: '/error-example',
			icon: 'cil-warning',
		});
	}
}
