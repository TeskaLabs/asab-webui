import React, { Component } from 'react';


class Breadcrumb extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<ol {...props} className={`breadcrumb ${className ? className : ""}`}>
				{children}
			</ol>
		);
	}
}

export default Breadcrumb;


