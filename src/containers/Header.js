import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, NavbarToggler, Collapse, Navbar, NavbarBrand  } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import {HEADER_POS_LEFT, HEADER_POS_RIGHT} from '../services/HeaderService';

class Header extends Component {

	constructor(props) {
		super(props);
		this.App = props.app;
		this.HeaderService = this.App.locateService("HeaderService");
		this.state = {
			isOpen: false,
			setIsOpen: false,
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
    	this.setState({
      		isOpen: !this.state.isOpen
    	});
  	}

	render() {
		return (<React.Fragment>
			<Navbar className="nav-fill w-100 h-100" expand="md">
				<NavbarBrand>
					{(this.HeaderService.BrandLogoURL) ? <img src={this.HeaderService.BrandLogoURL} className="d-inline-block align-top" width="30" height="30" alt="" /> : null}
					{this.HeaderService.BrandTitle}
				</NavbarBrand>

				<AppSidebarToggler className="d-md-down-none" display="lg" />

				{(this.HeaderService.Items.length > 0) ? <NavbarToggler onClick={this.toggle}/> : null}
			    <Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="d-md-down-none" navbar>
						{this.HeaderService.Items
							.filter((i)=>i.position == HEADER_POS_LEFT)
							.map((i, key) => (
								<i.component key={key} {...i.componentProps}/>
							))}
					</Nav>

					<Nav className="ml-auto" navbar>
						{this.HeaderService.Items
							.filter((item)=>item.position == HEADER_POS_RIGHT)
							.map((item, idx) => (
								<item.component key={idx} {...item.componentProps} app={this.App}/>
							)
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</React.Fragment>);
	}
}

export default Header;
