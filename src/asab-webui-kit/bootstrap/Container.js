import React, { Component } from 'react';

class Container extends Component {
	render() {
    const {children, className} = this.props
		return (
			<div className={`container ${className ? className : ""}`}>
				{children}
			</div>
		);
	}
}

export default Container;
