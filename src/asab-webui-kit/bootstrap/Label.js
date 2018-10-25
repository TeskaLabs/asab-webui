import React, { Component } from 'react';

class Label extends Component {
	render() {
		const { children, className } = this.props;
		return (
			<span className={`label label-info capitalize-font inline-block ml-10 ${className ? className : ""}`}>{children}</span>

		);
	}
}

export default Label;
