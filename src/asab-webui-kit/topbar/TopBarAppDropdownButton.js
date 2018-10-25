import React, { Component } from 'react';
import TopBarDropdown from './TopBarDropdown'

class TopBarAppDropdownButton extends Component {
	render() {
		const { children, ...props } = this.props;
		return (
			<TopBarDropdown
				iconClass="zmdi-apps"
				dropdownClass="app-drp"
				menuClass="app-dropdown"
				effectIn="slideInRight"
				effectOut="flipOutX"
				{...props}>
				{children}
			</TopBarDropdown>
		);
	}
}

export default TopBarAppDropdownButton;
