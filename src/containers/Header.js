import React from 'react';
import { connect } from 'react-redux';

import {
	AppHeader,
	AppNavbarBrand,
	AppSidebarToggler,
} from '@coreui/react';

import {
	Nav,
	NavItem
} from 'reactstrap';

export function Header(props) {

	let HeaderService = props.app.locateService("HeaderService");

	return (
		<AppHeader fixed>
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				<AppSidebarToggler className="d-lg-none" display="md" mobile />
			: HeaderService.Items.length > 0 ?
				<AppSidebarToggler className="d-lg-none" display="md" mobile />
			: null
			}

			<AppNavbarBrand
				href={props.brand_image.href}
				full={{
					src: props.brand_image.full,
					alt: props.title,
					width: 120,
					height: 30,
				}}
				minimized={{
					src: props.brand_image.minimized,
					alt: props.title,
					width: 30,
					height: 30,
				}}
			/>

			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				[
					<AppSidebarToggler key="sidebarToggler" className="d-md-down-none" display="lg" />,
					<Nav key="navigation" className="ml-auto" navbar>
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				]
			: 
				<Nav className="d-md-down-none" navbar>
					{HeaderService.Items.map((item, idx) => (
						<NavItem key={idx}>
							<item.component key={item} {...item.componentProps} app={props.app}/>
						</NavItem>
					))}
				</Nav>
			}
		</AppHeader>
	);
}


function mapStateToProps(state) {
	return {
		brand_image: state.config.brand_image,
		title: state.config.title,
	}
}

export default connect(mapStateToProps)(Header);
