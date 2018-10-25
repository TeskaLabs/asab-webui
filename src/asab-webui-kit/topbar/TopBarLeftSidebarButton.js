import React, { Component } from 'react';

class TopBarLeftSidebarButton extends Component {
	render() {
		const { className, ...props } = this.props;
		return (
			<a {...props} id="toggle_nav_btn" className={`toggle-left-nav-btn inline-block ml-20 pull-left ${className ? className : ""}`} href="javascript:void(0);">
				<i className="zmdi zmdi-menu"></i>
			</a>
		);
	}
}

export default TopBarLeftSidebarButton;
