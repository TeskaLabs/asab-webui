import React, { Component } from 'react';

class PageWrapper extends Component {
	componentDidMount() {
		window.setHeightWidth();
			}
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div {...props} className={`page-wrapper ${className ? className : ""}`}>
				{children}
			</div>
		);
	}
}

export default PageWrapper;
