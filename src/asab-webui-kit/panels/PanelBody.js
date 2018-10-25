import React, { Component } from 'react';


class PanelBody extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div {...props} className={`panel-wrapper collapse in panel-body ${className ? className : ""}`}>
				{children}
			</div>			
		);
	}
}

export default PanelBody;
