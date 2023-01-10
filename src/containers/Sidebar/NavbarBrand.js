import React, {useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
// import { useBrandImage } from '../../hooks/useBrandImage'

import { Link } from 'react-router-dom';

const NavbarBrand = ( props ) => {
	const theme = useSelector(state => state.theme);
	const title = useSelector(state => state.config.title);
	const isSidebarCollapsed = useSelector(state => state.sidebar.isSidebarCollapsed);
	const brandImageLight = useSelector(state => state.config.brandImage?.light);
	const brandImageDark = useSelector(state => state.config.brandImage?.dark);
	const brandImageDefault = useSelector(state => state.config.defaultBrandImage);

	console.log('usebrandImage', useBrandImage(theme))
	console.log('brandImageLight', brandImageLight)

	const brandImage = useMemo(() => {
		// useBrandImage(theme)
		if ((theme === "dark") && brandImageDark) {
			if (brandImageDark.minimized == undefined) {
				return {
					full: brandImageDark.full,
					minimized: brandImageDefault.minimized
				}
			}
			if (brandImageDark.full == undefined) {
				return {
					full: brandImageDefault.full,
					minimized: brandImageDark.minimized
				};
			}
			return brandImageDark
		} else if ((theme === "light") && brandImageLight) {
			if (brandImageLight.minimized == undefined) {
				return {
					full: brandImageLight.full,
					minimized: brandImageDefault.minimized
				}
			}
			if (brandImageLight.full == undefined) {
				return {
					full: brandImageDefault.full,
					minimized: brandImageLight.minimized
				};
			}
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
		{console.log('brandImage ln 74', brandImage)}
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
