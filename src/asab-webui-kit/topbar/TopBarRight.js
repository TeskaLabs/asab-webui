import React, { Component } from 'react';

class TopBarRight extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div {...props} id="mobile_only_nav" className={`mobile-only-nav pull-right ${className ? className : ""}`}>
				{children}
			</div>
		);
	}
}

export default TopBarRight;
