import React, { Component } from 'react';

class TopBarBrand extends Component {
	render() {
		const {brandImgSrc, brandImgAlt, brandTitle, brandHref, className, ...props} = this.props;
		return (
			<div {...props} className={`nav-header pull-left ${className ? className : ""}`}>
				<div className="logo-wrap">
					<a href={brandHref}>
						<img className="brand-img" src={brandImgSrc} alt={brandImgAlt} />
						<span className="brand-text">{brandTitle}</span>
					</a>
				</div>
			</div>
		);
	}
}

export default TopBarBrand;
