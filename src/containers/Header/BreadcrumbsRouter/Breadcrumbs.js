import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


const Breadcrumbs = ({
	routes, match, app, disableContainerBreadcrumbs
}) => {
	const { t } = useTranslation();
	const crumbs = useMemo(() => {
		return routes.filter(({ path }) => {
			if ((path.split("/").length === match.path.split("/").length) && match.path.includes(path)) { // Checking if the number of slash ('/') is the same and if it is included in the match.path
				if ((path.match(/[^\/]+$/)[0] === match.path.match(/[^\/]+$/)[0])) { //  Take the string after the last slash ('/') and check if they match each other
					return path;
				}
			} else {
				return match.path.includes(path);
			}
		}).
		map(({ path, ...rest }) => ({
			path: Object.keys(match.params).length ?
				Object.keys(match.params).reduce((path, param) =>
					path.replace(`:${param}`, match.params[param]), path
				) : path,
			...rest
		})).
		filter(crumb => crumb.name);
	},[routes]);

	if (crumbs.length == 0) return null;


	// TODO: Add disabling breadcrumbs
	return (
		<div className="breadcrumbs p-auto">
			<h4 className="mr-2">{t(`Breadcrumbs|${crumbs[crumbs.length-1].name}`)} {crumbs.length > 1 ? "|" : ""}</h4>
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
