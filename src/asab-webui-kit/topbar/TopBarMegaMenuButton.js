import React, { Component } from 'react';
import TopBarDropdown from './TopBarDropdown'

class TopBarMegaMenuButton extends Component {
	render() {
		const { children, ...props } = this.props;
		return (
			<TopBarDropdown
				iconClass="zmdi-more-vert"
				dropdownClass="full-width-drp open"
				menuClass="mega-menu pa-0"
				effectIn="fadeIn"
				effectOut="fadeOut"
				{...props}>
				{children}
			</TopBarDropdown>
		);
	}
}

export default TopBarMegaMenuButton;
