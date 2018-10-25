import React, { Component } from 'react';
import Row from '../bootstrap/Row';

class HeadingRow extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<Row >
				<div {...props} className={`heading-bg row ${className ? className : ""}`}>
					{children}
				</div>
			</Row>

		);
	}
}

export default HeadingRow;

