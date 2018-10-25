
import React, { Component } from 'react';


class FooterContainer extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<footer {...props} className={`footer container-fluid pl-30 pr-30 ${className ? className : ""}`}>
				{children}
			</footer>
		);
	}
}

export default FooterContainer;
