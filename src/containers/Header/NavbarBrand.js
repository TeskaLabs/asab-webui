import React from 'react';
import { Link } from 'react-router-dom';

const NavbarBrand = (props) => {
	const href = props.brand_image.href ?? "/";
	console.log(props)
	const brandImageProps = {
		title: props.title,
		full: props.brand_image.full,
		minimized: props.brand_image.minimized,
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

const BrandImage = ({ full, minimized, title }) => (
	<div className="header-brand-image">
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

export default NavbarBrand;