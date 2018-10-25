import React, { Component } from 'react';

class ContainerFluid extends Component {
	render() {
    const {children, className} = this.props
		return (
			<div className={`container-fluid ${className ? className : ""}`}>
				{children}
			</div>
		);
	}
}

export default ContainerFluid;
