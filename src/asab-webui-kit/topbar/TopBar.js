import React, { Component } from 'react';

class TopBar extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<nav {...props} className={`navbar navbar-inverse navbar-fixed-top ${className ? className : ""}`}>
				{children}
			</nav>
		);
	}
}

export default TopBar;
