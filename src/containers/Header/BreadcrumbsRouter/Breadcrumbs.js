import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';


const Breadcrumbs = ({
	routes, match, app, disableContainerBreadcrumbs
}) => {
	const overloadedBreadcrumbName = useSelector(state => state.header?.breadcrumbName);
	const { t } = useTranslation();
	const crumbs = useMemo(() => {
		return routes.filter(({ path }) => {
			// Checking if the number of slash ('/') is the same and if it is included in the match.path
			if ((path.split("/").length === match.path.split("/").length) && match.path.includes(path)) {
				// Take the string after the last slash ('/') and check if they match each other
				if ((path.match(/[^\/]+$/)[0] === match.path.match(/[^\/]+$/)[0])) {
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

	useEffect(() => {
		// Adding subtitle to the title of the application
		if (app.Services.TitleService != undefined) {
			app.Services.TitleService.setTitle(t(`Breadcrumbs|${crumbs[0].name}`));
		}
	}, [crumbs, t]);

	// TODO: Add disabling breadcrumbs
	return (
		<div className="breadcrumbs p-auto">
			<h4 className="mr-2">{t(`Breadcrumbs|${overloadedBreadcrumbName ? overloadedBreadcrumbName : crumbs[crumbs.length-1].name}`)} {crumbs.length > 1 ? "|" : ""}</h4>
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
