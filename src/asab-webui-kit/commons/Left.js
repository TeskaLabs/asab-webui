import React, { Component } from 'react';

class Left extends Component {
	render() {
	const { children, className, ...props } = this.props;
		return (
			<div {...props} className={`pull-left ${className ? className : ""}`}>
				{children}
			</div>
		);
	}
}

export default Left;
