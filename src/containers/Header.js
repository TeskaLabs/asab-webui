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
				{(this.props.hasSidebar || typeof this.props.hasSidebar === 'undefined') ? 
					<AppSidebarToggler className="d-lg-none" display="md" mobile />
				: this.HeaderService.Items.length > 0 ?
					<AppSidebarToggler className="d-lg-none" display="md" mobile />
				: null
				}
				<AppNavbarBrand full={this.HeaderService.BrandImageFull} minimized={this.HeaderService.BrandImageMinimized} />
				{(this.props.hasSidebar || typeof this.props.hasSidebar === 'undefined') ? 
					<AppSidebarToggler className="d-md-down-none" display="lg" />
				: null}
				{this.HeaderService.Items.length > 0 ?
					<Nav className="d-md d-md-down-none" display="lg" navbar>
						{this.HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={idx} {...item.componentProps} app={this.App}/>
							</NavItem>
						))}
					</Nav>
				: null}
			</AppHeader>
		</React.Fragment>);
	}
}

export default Header;
