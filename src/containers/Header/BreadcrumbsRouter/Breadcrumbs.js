import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


const Breadcrumbs = ({
	routes, match, app, disableContainerBreadcrumbs
}) => {
	const { t } = useTranslation();
	// Get new crumbs each time location has been changed
	const crumbs = routes.filter(({ path }) => match.path.includes(path)).
		map(({ path, ...rest }) => ({
			path: Object.keys(match.params).length ?
				Object.keys(match.params).reduce((path, param) =>
					path.replace(`:${param}`, match.params[param]), path
				) : path,
				...rest
		})).
		filter(crumb => crumb.name);

	if (crumbs.length == 0) return null;


	// TODO: Add disabling breadcrumbs
	return (
		<div className="breadcrumbs p-auto">
			<h4 className="mr-2">{crumbs[crumbs.length-1].name} {crumbs.length > 1 ? "/" : ""}</h4>
			<Breadcrumb>
				{crumbs.map((crumb, idx) => {
					if (idx === (crumbs.length - 1)) return ;
					return (
						<BreadcrumbItem key={idx} active={idx === crumbs.length - 1}>
							{idx !== crumbs.length - 1 ? 
								<Link to={crumb.path}>{t(`Breadcrumbs|${crumb.name}`)}</Link>
								: <span>{t(`Breadcrumbs|${crumb.name}`)}</span>
							}
						</BreadcrumbItem>
					)}
				)}
			</Breadcrumb>
		</div>
	)
}

export default Breadcrumbs;
