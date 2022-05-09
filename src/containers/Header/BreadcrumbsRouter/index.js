import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Breadcrumbs from './Breadcrumbs';

const BreadcrumbsRouter = (props) => {
	const app = props.app;

	return (
		<Switch>
			{app.Router.Routes.map((route, idx) => {
				return route.component ? (
					<Route
						key={idx}
						path={`${route.path}`}
						exact={route.exact}
						name={route.name}
						render={props => (
							<Breadcrumbs
								app={app}
								match={props.match}
								routes={app.Router.Routes}
								disableContainerBreadcrumbs={route.disableContainerBreadcrumbs}
							/>
						)}
					/>
				) : null;
			})}
		</Switch>
	)
}

export default BreadcrumbsRouter;