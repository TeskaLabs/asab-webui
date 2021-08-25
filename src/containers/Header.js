import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	AppHeader,
	AppNavbarBrand,
	AppSidebarToggler,
} from '@coreui/react';

import {
	Nav,
	NavItem
} from 'reactstrap';

import HelpButton from '../helpButton';

export function Header(props) {
	const HeaderService = props.app.locateService("HeaderService");

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
			<NavbarBrand {...props}/>

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

function NavbarBrand(props) {
		const link = props.brand_image.href ?? "/";
		const appNavbarBrandProps = {
		  full: {
			  src: props.brand_image.full,
			  alt: props.title,
			  width: 120,
			  height: 30,
		  },
		  minimized: {
			  src: props.brand_image.minimized,
			  alt: props.title,
			  width: 30,
			  height: 30,
		  }
		}
		if (link.includes("http")) {
			return <AppNavbarBrand
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				{...appNavbarBrandProps}
			/>
		}
		// 'replace' to avoid 'Warning: Hash history cannot PUSH the same path'
		return <Link to={link} replace>
			<AppNavbarBrand
				tag={'div'}
				{...appNavbarBrandProps}
			/>
		</Link>
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
