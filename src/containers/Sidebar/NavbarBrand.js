import React, {useMemo} from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const NavbarBrand = ( props ) => {
	const theme = useSelector(state => state.theme);
	const title = useSelector(state => state.config.title);
	const isSidebarCollapsed = useSelector(state => state.sidebar.isSidebarCollapsed);
	const brandImageLight = useSelector(state => state.config.brandImage?.light);
	const brandImageDark = useSelector(state => state.config.brandImage?.dark);
	const brandImageDefault = useSelector(state => state.config.defaultBrandImage);

	const brandImage = useMemo(() => {
		if ((theme === "dark") && brandImageDark) {
			return brandImageDark;
		} else if ((theme === "light") && brandImageLight) {
			return brandImageLight;
		} else {
			return brandImageDefault;
		}
	},[theme])

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
