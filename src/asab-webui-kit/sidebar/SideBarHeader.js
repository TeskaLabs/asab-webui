import React, { Component } from 'react';

class SideBarHeader extends Component {
	render() {
		const { headerTopLine, headerTitle, className, ...props } = this.props;
		return (
			<li {...props} className={`navigation-header ${className ? className : ""}`}>
				{
					headerTopLine ? (
						<hr className="light-grey-hr mb-10" />
					) : ""
				}
				<span>{headerTitle}</span> 
				<i className="zmdi zmdi-more"></i>
			</li>
		);
	}
}

export default SideBarHeader;
