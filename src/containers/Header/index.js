import React from 'react';
import { connect } from 'react-redux';

import {
	Nav,
	NavItem
} from 'reactstrap';

import HelpButton from '../../helpButton';
import SidebarToggler from './SidebarToggler';
import NavbarBrand from './NavbarBrand';

export function Header(props) {
	const HeaderService = props.app.locateService("HeaderService");

	return (
		<header className="application-header">
			<NavbarBrand {...props}/>
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				<SidebarToggler store={props.app.Store}/>
			: HeaderService.Items.length > 0 ?
				props.app.Navigation.getItems().items.length > 0 && props.app.Navigation.getItems().items.length !== undefined ?
					<SidebarToggler store={props.app.store}/>
				:
					null
			:
				null
			}

			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				(
					<Nav className="ml-auto" navbar>
						<HelpButton />
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				)
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
		</header>
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
