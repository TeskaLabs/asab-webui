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
	let siteBrandImage = props.app.Config.get("brand_image");

	let brandImageFull = props.brand_image.full;
	let brandImageMinimized = props.brand_image.minimized;
	let brandImageHref = props.brand_image.href;

	if (siteBrandImage.full !== undefined && siteBrandImage.full.length !== 0) {
		brandImageFull = siteBrandImage.full
	}
	if (siteBrandImage.minimized !== undefined && siteBrandImage.minimized.length !== 0) {
		brandImageMinimized = siteBrandImage.minimized
	}
	if (siteBrandImage.href !== undefined && siteBrandImage.href.length !== 0) {
		brandImageHref = siteBrandImage.href
	}

	return (
		<AppHeader fixed>
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				<AppSidebarToggler className="d-lg-none" display="md" mobile />
			: HeaderService.Items.length > 0 ?
				<AppSidebarToggler className="d-lg-none" display="md" mobile />
			: null
			}

			<AppNavbarBrand
				href={brandImageHref}
				full={{
					src: brandImageFull,
					alt: props.title,
					width: 120,
					height: 30,
				}}
				minimized={{
					src: brandImageMinimized,
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
