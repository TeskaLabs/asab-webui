import { lazy } from 'react';
import Module from 'asab-webui/abc/Module';

const HomeContainer = lazy(() => import('./containers/HomeContainer'));
const TableContainer = lazy(() => import('./containers/TableContainer'));

export default class HomeModule extends Module {
	constructor(app, name){
		super(app, "HomeModule");
		app.Router.addRoute({ path: '/', exact: true, name: 'Home', component: HomeContainer });
		app.Router.addRoute({ path: '/Table', exact: true, name: 'Table', component: TableContainer });
		app.Navigation.addItem({
			name: 'Home',
			url: '/',
			icon: 'cil-home',
		});
		app.Navigation.addItem({
			name: 'Table',
			url: '/Table',
			icon: 'cil-chart',
		});
	}
}
