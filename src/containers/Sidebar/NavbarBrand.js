import React, {useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
// import { useBrandImage } from '../../hooks/useBrandImage'

import { Link } from 'react-router-dom';

const NavbarBrand = ( props ) => {
	const theme = useSelector(state => state.theme);
	const title = useSelector(state => state.config.title);
	const isSidebarCollapsed = useSelector(state => state.sidebar.isSidebarCollapsed);

	const BrandingService = props.app.Services.BrandingService;
	const Config = props.app.ConfigService.Config;

	let brandImage;
	if (Config !== undefined && theme) {
		brandImage = BrandingService.getLogo(Config, theme);
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
						src={isSidebarCollapsed ? brandImage.minimized : brandImage.full}
						alt={title}
						width="50"
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
					src={isSidebarCollapsed ? brandImage.minimized : brandImage.full}
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
