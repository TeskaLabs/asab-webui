import React, { Component } from 'react';

class SideBar extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div {...props} className={`fixed-sidebar-left ${className ? className : ""}`}>
				<ul className="nav navbar-nav side-nav nicescroll-bar">
					{children}
				</ul>
			</div>
		);
	}
}

export default SideBar;
