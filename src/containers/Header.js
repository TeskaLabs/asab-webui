import React, { Component } from 'react';

import {
	AppHeader,
	AppNavbarBrand,
	AppSidebarToggler,
} from '@coreui/react';

import {
	Nav
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
				<Navbar className="nav-fill w-100 h-100" color="light" expand="md">

					<AppNavbarBrand full={this.HeaderService.BrandImageFull} minimized={this.HeaderService.BrandImageMinimized} />
					{(this.props.hasSidebar || typeof this.props.hasSidebar === 'undefined') ? 
						<React.Fragment>
							<AppSidebarToggler className="d-lg-none" display="md" mobile />
							<AppSidebarToggler className="d-md-down-none" display="lg" />
						</React.Fragment>  
					: null}

					{(this.HeaderService.Items.length > 0) ? <NavbarToggler onClick={this.toggle} id="toggler"/> : null}
					<Collapse isOpen={this.state.isOpen} navbar expand="md">
						<Nav className="ml-auto" navbar>
							{this.HeaderService.Items.map((item, idx) => (
								<NavItem key={idx}>
									<item.component key={idx} {...item.componentProps} app={this.App}/>
								</NavItem>
							))}
						</Nav>
					</Collapse>
				</Navbar>
			</AppHeader>
		</React.Fragment>);
	}
}

export default Header;
