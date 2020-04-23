import React, { Component } from 'react';

import {
	AppHeader,
	AppNavbarBrand,
	AppSidebarToggler,
} from '@coreui/react';

import {
	Nav,
	NavItem
} from 'reactstrap';

class Header extends Component {

	constructor(props) {
		super(props);

		this.App = props.app;
		this.HeaderService = this.App.locateService("HeaderService");
	}

	render() {
		return (<React.Fragment>
			<AppHeader fixed>

				<AppSidebarToggler className="d-lg-none" display="md" mobile />
				<AppNavbarBrand full={this.HeaderService.BrandImageFull} minimized={this.HeaderService.BrandImageMinimized} />
				{(this.props.hasSidebar || typeof this.props.hasSidebar === 'undefined') ? 
					<AppSidebarToggler className="d-md-down-none" display="lg" />
				: null}

				<Nav className="d-md d-md-down-none" display="lg" navbar>
					{this.HeaderService.Items.map((item, idx) => (
						<NavItem key={idx}>
							<item.component key={idx} {...item.componentProps} app={this.App}/>
						</NavItem>
					))}
				</Nav>

			</AppHeader>
		</React.Fragment>);
	}
}

export default Header;
