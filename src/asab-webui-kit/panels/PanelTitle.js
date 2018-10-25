import React, { Component } from 'react';

class PanelTitle extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<h6 {...props} className={`panel-title txt-dark ${className ? className : ""}`}>{children}</h6>
		);
	}
}

export default PanelTitle;
