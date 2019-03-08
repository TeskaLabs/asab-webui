import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
	AppAside,
	AppBreadcrumb,
	AppFooter,
	AppHeader,
	AppSidebar,
	AppSidebarFooter,
	AppSidebarHeader,
	AppSidebarMinimizer,
	AppSidebarNav,
} from '@coreui/react';
import Header from './Header';
import routes from './_routes';
import navigation from './_navigation';
import reducer from './reducers'
import {TenantService} from './TenantService'
import Config from './Config';


let store = createStore(
	reducer
  );

class App extends Component {

	componentWillMount() {
		if (Config.multitenancy){
			let tenantService = new TenantService(store);
		}
	}

	render() {
		return (
			<Provider store={store}>
			<div className="app">
				 <AppHeader fixed>
					<Header/>
				</AppHeader>
				<div className="app-body">
					<AppSidebar fixed display="lg">
						<AppSidebarHeader>Navigation</AppSidebarHeader>
						<AppSidebarNav navConfig={navigation} {...this.props} />
						<AppSidebarFooter />
						<AppSidebarMinimizer />
					</AppSidebar>
					<main className="main">
						<AppBreadcrumb appRoutes={routes}/>
						<Switch>
							{routes.map((route, idx) => {
								return route.component ? (
									<Route
										key={idx}
										path={`${route.path}`}
										exact={route.exact}
										name={route.name}
										render={props => (
											<route.component {...props} />
										)} />
									
								) : (null);
							})}
						</Switch>
					</main>
					<AppAside fixed>
					</AppAside>
				</div>
				<AppFooter>
					Powered by TeskaLabs
				</AppFooter>
			</div>
			</Provider>
		);
	}
}

export default App;
