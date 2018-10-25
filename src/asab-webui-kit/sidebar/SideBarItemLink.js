import React, { Component } from 'react';

class SideBarItemLink extends Component {
	render() {
		const {linkHref, linkTitle, linkActive, className, ...props} = this.props;
		return (
			<li>
				<a className={(className ? className : "")+(linkActive ? " active-page" : "")} href={linkHref} {...props}>
					{linkTitle}
				</a>
			</li>
		);
	}
}

export default SideBarItemLink;
