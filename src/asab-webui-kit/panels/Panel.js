import React, { Component } from 'react';

class Panel extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div {...props} className={`panel ${className ? className : ""}`}>
				{children}
			</div>
		);
	}
}

export default Panel;



