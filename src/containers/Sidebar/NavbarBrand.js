import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const NavbarBrand = ({ title, brand_image }) => {
	const href = brand_image.href ?? "/";

	if (href.includes("http")) {
		return (
			<div className={`sidebar-brand-image`}>
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={brand_image.minimized}
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
					src={brand_image.minimized}
					alt={title}
					width="50"
					height="50"
					className="minimized-image"
				/>
			</Link>
		</div>
	)
};

const mapStateToProps = state => {
	const headerImage = state.config.brand_image?.full ?
		state.config.brand_image : state.config.default_brand_image;
	
	return {
		brand_image: headerImage,
		title: state.config.title,
	}
}

export default connect(mapStateToProps)(NavbarBrand);