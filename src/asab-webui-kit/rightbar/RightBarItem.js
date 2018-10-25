import React, { Component } from 'react';

class RightBarItem extends Component {
	render() {
		const { children, className, title, status, ...props } = this.props;
		return (
			<div {...props} className="chat-data">
				<img className="user-img img-circle" />
				<div className="user-data">
					<span className="name block capitalize-font">{title}</span>
					<span className="time block truncate txt-grey">
						{children}
					</span>
				</div>
				<div className={`status ${status ? status : ""}`}></div>
				<div className="clearfix"></div>
			</div>
		);
	}
}

export default RightBarItem;
