import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const NavbarBrand = (props) => {
	const href = props.brand_image.href ?? "/";
	const brandImageProps = {
		title: props.title,
		full: props.brand_image.full,
		minimized: props.brand_image.minimized,
		isMinimized: props.isSidebarMinimized
	}

	if (href.includes("http")) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
			>
				<BrandImage {...brandImageProps} />
			</a>
		);
	}
	return (
		<Link to={href}>
			<BrandImage {...brandImageProps} />
		</Link>
	)
};

const BrandImage = ({ full, minimized, title, isMinimized }) => (
	<div className={`header-brand-image-${isMinimized ? "minimized" : "full"}`}>
		<img
			src={full}
			alt={title}
			width="120"
			height="30"
			className="full-image"
		/>
		<img
			src={minimized}
			alt={title}
			width="30"
			height="30"
			className="minimized-image"
		/>
	</div>
)

const mapStateToProps = state => {
	return {
		isSidebarMinimized: state.sidebar.isSidebarMinimized
	}
}

export default connect(mapStateToProps)(NavbarBrand);