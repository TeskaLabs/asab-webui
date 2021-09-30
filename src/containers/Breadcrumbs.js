import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Breadcrumbs = ({ routes }) => {
	const match = useRouteMatch(),
		location = useLocation();
	const [crumbs, setCrumbs] = useState([]);

	// Get new crumbs each time location has been changed
	useEffect(() => {
		const newCrumbs = routes.filter(({ path }) => match.path.includes(path))
			.map(({ path, ...rest }) => ({
				path: Object.keys(match.params).length ?
					Object.keys(match.params).reduce((path, param) =>
						path.replace(`:${param}`, match.params[param]), path
					) : path,
					...rest
			}));
		setCrumbs(newCrumbs);
	}, [location])

	return (
		<>
			{crumbs.length > 1 && 
				<div className="breadcrumbs">
					<Breadcrumb>
						{crumbs.map((crumb, idx) => (
							<BreadcrumbItem key={idx} active={idx === crumbs.length - 1}>
								<Link to={crumb.path}>{crumb.name}</Link>
							</BreadcrumbItem>
						))
						}
					</Breadcrumb>
				</div>
			}
		</>
	)
}

export default Breadcrumbs;
