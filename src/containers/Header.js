import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import {HEADER_POS_LEFT, HEADER_POS_RIGHT} from '../services/HeaderService';

class Header extends Component {

	constructor(props) {
		super(props);
		this.App = props.app;
		this.HeaderService = this.App.locateService("HeaderService");
	}

	render() {
		return (<React.Fragment>

			<AppNavbarBrand>
				{(this.HeaderService.BrandLogoURL) ? <img src={this.HeaderService.BrandLogoURL} className="d-inline-block align-top" width="30" height="30" alt="" /> : null}
				{this.HeaderService.BrandTitle}
			</AppNavbarBrand>

			<AppSidebarToggler className="d-md-down-none" display="lg" />

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

		</React.Fragment>);
	}
}

export default Header;
