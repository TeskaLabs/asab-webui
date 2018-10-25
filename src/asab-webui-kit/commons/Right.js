import React, { Component } from 'react';

class Right extends Component {
	render() {
	const { children, className, ...props } = this.props;
		return (
			<div {...props} className={`pull-right ${className ? className : ""}`}>
				{children}
			</div>
		);
	}
}

export default Right;
