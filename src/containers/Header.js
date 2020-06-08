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
				{(this.App.props.hasSidebar || typeof this.App.props.hasSidebar === 'undefined') ? 
					<AppSidebarToggler className="d-lg-none" display="md" mobile />
				: this.HeaderService.Items.length > 0 ?
					<AppSidebarToggler className="d-lg-none" display="md" mobile />
				: null
				}
				<AppNavbarBrand href={this.HeaderService.BrandImageFull.href} full={this.HeaderService.BrandImageFull} minimized={this.HeaderService.BrandImageMinimized} />
				{(this.App.props.hasSidebar || typeof this.App.props.hasSidebar === 'undefined') ? 
					[
						<AppSidebarToggler key="sidebarToggler" className="d-md-down-none" display="lg" />,
						<Nav key="navigation" className="ml-auto" navbar>
							{this.HeaderService.Items.map((item, idx) => (
								<NavItem key={idx}>
									<item.component key={item} {...item.componentProps} app={this.App}/>
								</NavItem>
							))}
						</Nav>
					]
				: 
					<Nav className="d-md-down-none" navbar>
						{this.HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={this.App}/>
							</NavItem>
						))}
					</Nav>
				}

			</AppHeader>
		</React.Fragment>);
	}
}

export default Header;
