import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
	AppHeader,
	AppNavbarBrand,
	AppSidebarToggler,
} from '@coreui/react';

import {
	Nav,
	NavItem
} from 'reactstrap';

/*
	Example of use branding configuration from site:

	Site config file:

	{"branding": "path/to/the/configuration/file.json"}


	JSON file with configuration:

	{
		"brand_image": {
			"full": "path/outside/of/project/header-full.svg",
			"minimized": "path/outside/of/project/header-minimized.svg",
			"href": "http://foobar.fb"
		}
	}

*/

export function Header(props) {

	let HeaderService = props.app.locateService("HeaderService");
	// Get header branding from site
	let branding_url = props.app.Config.get("branding");
	// Set state for brand images
	const [siteBrandImageFull, setSiteBrandImageFull] = useState(props.brand_image.full);
	const [siteBrandImageMinimized, setSiteBrandImageMinimized] = useState(props.brand_image.minimized);
	const [siteBrandImageHref, setSiteBrandImageHref] = useState(props.brand_image.href);
	// Check on undefined configuration
	if (branding_url !== undefined) {
		axios.get(branding_url).then(response => {
			if (response.data.brand_image !== undefined) {
				if (response.data.brand_image.full !== undefined) {
					setSiteBrandImageFull(response.data.brand_image.full);
				}
				if (response.data.brand_image.minimized !== undefined) {
					setSiteBrandImageMinimized(response.data.brand_image.minimized);
				}
				if (response.data.brand_image.href !== undefined) {
					setSiteBrandImageHref(response.data.brand_image.href);
				}
			}
		})
		.catch(error => {console.log(error)})
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
				href={siteBrandImageHref}
				full={{
					src: siteBrandImageFull,
					alt: props.title,
					width: 120,
					height: 30,
				}}
				minimized={{
					src: siteBrandImageMinimized,
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
