import React, { Component } from 'react';


class PanelHeading extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div {...props} className={`panel-heading ${className ? className : ""}`}>
				{children}
				<div className="clearfix"/>
			</div>
			
		);
	}
}

export default PanelHeading;
