import React, { Component } from 'react';

class RightBar extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div className="wrapper open-right-sidebar">
				<div {...props} className={`fixed-sidebar-right ${className ? className : ""}`}>
					<ul className="right-sidebar">
						<li>
							{children}
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default RightBar;
