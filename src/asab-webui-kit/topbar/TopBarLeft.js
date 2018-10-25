import React, { Component } from 'react';

class TopBarLeft extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div {...props} className={`mobile-only-brand pull-left ${className ? className : ""}`}>
				{children}
			</div>
		);
	}
}

export default TopBarLeft;
