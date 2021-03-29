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

export function Header(props) {

	let HeaderService = props.app.locateService("HeaderService");

	if (props.doc_path) {
		const Icon = <i className="cil-info" style={{ fontSize: "1.25rem"}}></i>
		HeaderService.addComponent(NavLink, { children: Icon, href: props.doc_path, target: "_blank", title: "Documentation" });
	}

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
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				]
			:
				<Nav className="ml-auto" navbar>
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
		doc_path: state.config.doc_path
	}
}

export default connect(mapStateToProps)(Header);
