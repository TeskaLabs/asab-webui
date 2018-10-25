import React, { Component } from 'react';

class RightBarList extends Component {
	render() {
		const { children, className, ...props } = this.props;
		return (
			<div {...props} className="tab-struct custom-tab-1">
				<div className="tab-content">
					<div className="nicescroll-bar">
						<ul className="chat-list-wrap">
							<li className="chat-list">
								<div className="chat-body">
									{children}
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default RightBarList;
