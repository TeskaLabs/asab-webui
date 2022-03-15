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
							<>
								{!app.props.disableAppBreadcrumbs && !route.disableContainerBreadcrumbs &&
									<Breadcrumbs routes={app.Router.Routes} match={props.match} />
								}
							</>
						)}
					/>
				) : null;
			})}
		</Switch>
	)
}

export default BreadcrumbsRouter;