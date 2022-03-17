import React, { useState, Suspense } from 'react';
import { connect } from 'react-redux';

import {
	Nav,
	NavItem
} from 'reactstrap';

import HelpButton from './HelpButton';
import ThemeButton from './ThemeButton';
import Breadcrumbs from './BreadcrumbsRouter';

export function Header(props) {
	const HeaderService = props.app.locateService("HeaderService");

	const [headerProperties, setHeaderProperties] = useState(false);

	return (
		<header className={`application-header ${headerProperties ? 'header-props-open' : ""}`}>
			<Breadcrumbs app={props.app} />

			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				(
					<Nav className="ml-auto header-props" navbar>
						<ThemeButton changeTheme={props.app.changeTheme} />
						<HelpButton />
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				)
			:
				<Nav className="ml-auto header-props" navbar>
					<ThemeButton changeTheme={props.app.changeTheme} />
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

				{/* toggler */}
				<div className={`header-props-toggler mt-1 mr-3 p-0 ${headerProperties && 'header-props-open' }`} onClick={() => setHeaderProperties(!headerProperties)}>
					<i className="cil-chevron-bottom"></i>
				</div>
			
			{/* smallscreen menu  */}
			{ headerProperties && 
			<div className={`application-header header-props-sm mt-5`} >
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				(
					<Nav navbar>
						<ThemeButton changeTheme={props.app.changeTheme} />
						<HelpButton />
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				)
			:
				<Nav className="header-props-sm" navbar>
					<ThemeButton changeTheme={props.app.changeTheme} />
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
			</div>
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
