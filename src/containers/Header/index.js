import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
	Nav,
	NavItem, Button, Collapse, Card, CardBody
} from 'reactstrap';

import HelpButton from '../../helpButton';
import SidebarToggler from './SidebarToggler';
import NavbarBrand from './NavbarBrand';

export function Header(props) {
	const HeaderService = props.app.locateService("HeaderService");

	const [userbarOpen, setUserbarOpen] = useState(false)

	useEffect(() => {
		console.log(userbarOpen)
	}, [userbarOpen])

	return (
		<header className={userbarOpen ? 'op' : ''}>
			<div className="application-header">
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
					<Nav className="ml-auto user-bar" navbar>
						<HelpButton />
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				)
			:
				<Nav className="ml-auto user-bar" navbar>
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
				<div className={`header-userbar-toggler mt-1 mr-3 p-0 ${userbarOpen ? 'open' : ''}`} onClick={() => setUserbarOpen(!userbarOpen)}>
					<i className="cil-caret-bottom"></i>
				</div>

			</div>
{/* smallscreen menu  */}

			{ userbarOpen && 
			<div className={`application-header user-bar-sm mt-5`} >
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ? 
				(
					<Nav className="" navbar>
						<HelpButton />
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				)
			:
				<Nav className="user-bar-sm" navbar>
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
