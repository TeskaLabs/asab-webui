import React, { Component } from 'react';
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


class App extends Component {
	render() {
		return (
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
		);
	}
}

export default App;
