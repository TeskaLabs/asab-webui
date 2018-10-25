import React, { Component } from 'react';

class HeadingTitle extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
				<h5 {...props} className={`text-dark ${className ? className : ""}`}>{children}</h5>
		);  
	}
}

export default HeadingTitle;
