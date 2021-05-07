import React from 'react';
import { connect } from 'react-redux';

import {
	AppHeader,
	AppNavbarBrand,
	AppSidebarToggler,
} from '@coreui/react';

import {
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';

import HelpButton from '../helpButton';

export function Header(props) {
	let HeaderService = props.app.locateService("HeaderService");

	return (
		<AppHeader fixed>
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				<AppSidebarToggler className="d-lg-none" display="md" mobile />
			: HeaderService.Items.length > 0 ?
				props.app.Navigation.getItems().items.length > 0 && props.app.Navigation.getItems().items.length !== undefined ?
					<AppSidebarToggler className="d-lg-none" display="md" mobile />
				:
					null
			:
				null
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
						<HelpButton />
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				]
			:
				<Nav className="ml-auto" navbar>
					<HelpButton />
					{HeaderService.Items.map((item, idx) => (
						window.innerWidth < 1024 && item.componentProps.children !== undefined && item.componentProps.children === "LanguageDropdown" ?
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						:
							window.innerWidth >= 1024 ?
								<NavItem key={idx}>
									<item.component key={item} {...item.componentProps} app={props.app}/>
								</NavItem>
							:
								null
					))}
				</Nav>

			}
		</AppHeader>
	);
}


function mapStateToProps(state) {
	const headerImage = state.config.brand_image?.full ?
		state.config.brand_image : state.config.default_brand_image;

	return {
		brand_image: headerImage,
		title: state.config.title,
	}
}

export default connect(mapStateToProps)(Header);
