import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const NavbarBrand = ( props ) => {
	const theme = useSelector(state => state.theme);
	const title = useSelector(state => state.config.title);
	const isSidebarCollapsed = useSelector(state => state.sidebar.isSidebarCollapsed);

	const BrandingService = props.app.Services.BrandingService;

	let brandImage;
	if (BrandingService && theme) {
		brandImage = BrandingService.getLogo(theme);
	}

	const href = brandImage?.href ?? "/";

	if (href.includes("http")) {
		return (
			<div className="sidebar-brand-image">
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={isSidebarCollapsed ? brandImage?.minimized : brandImage?.full}
						alt={title}
						width={isSidebarCollapsed ? "50" : "150"}
						height="50"
						className="minimized-image"
					/>
				</a>
			</div>
		);
	}
	return (
		<div className={`sidebar-brand-image`}>
			<Link to={href}>
				<img
					src={isSidebarCollapsed ? brandImage?.minimized : brandImage?.full}
					alt={title}
					width={isSidebarCollapsed ? "50" : "150"}
					height="50"
					className="minimized-image"
				/>
			</Link>
		</div>
	)
};

export default NavbarBrand;
