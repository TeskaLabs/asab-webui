import React, { Component } from 'react';

class BreadcrumbItem extends Component {
	render() {
		const {linkHref, linkTitle, linkActive, className, ...props} = this.props;
		return (
			
			linkActive ? (
				<li {...props} className={`active ${className ? className : ""}`}>
				<span >
					{linkTitle}
					</span>
				</li>
			): (
				<li>
					<a href={linkHref}>
						<span>
							{linkTitle}
					   </span>
					</a>
				</li>
			)
				
			
		);
	}
}

export default BreadcrumbItem;
