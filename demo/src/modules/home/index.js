import { lazy } from 'react';
import Module from 'asab-webui/abc/Module';

const HomeContainer = lazy(() => import('./containers/HomeContainer'));
const TableContainer = lazy(() => import('./containers/TableContainer'));
const CategoryTableContainer = lazy(() => import('./containers/TableCategoriesContainer'));
const ErrorHandlerExample = lazy(() => import('./containers/ErrorHandlerExample'));

export default class HomeModule extends Module {
	constructor(app, name){
		super(app, "HomeModule");
		app.Router.addRoute({ path: '/home', exact: true, name: 'Home', component: HomeContainer });
		app.Router.addRoute({ path: '/table', exact: true, name: 'Table', component: TableContainer });
		app.Router.addRoute({ path: '/category-table', exact: true, name: 'Category Table', component: CategoryTableContainer });
		app.Router.addRoute({ path: '/error-example', exact: true, name: 'Error Example', component: ErrorHandlerExample});
		app.Navigation.addItem({
			name: 'Home',
			url: '/home',
			icon: 'at-home',
		});
		app.Navigation.addItem({
			name: 'Table',
			url: '/table',
			icon: 'at-graph-chart',
		});
		app.Navigation.addItem({
			name: 'Category Table',
			url: '/category-table',
			icon: 'at-graph-chart',
		});
		app.Navigation.addItem({
			name: 'Error Example',
			url: '/error-example',
			icon: 'at-triangle-exclamation',
		});
	}
}
