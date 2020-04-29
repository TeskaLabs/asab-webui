import React, { Component } from 'react';
import * as router from 'react-router-dom';

import { Container, Nav, NavItem, NavLink, Badge, DropdownToggle, DropdownMenu } from 'reactstrap';
import {
	AppSidebar,
	AppSidebarFooter,
	AppSidebarForm,
	AppSidebarHeader,
	AppSidebarMinimizer,
	AppSidebarNav2 as AppSidebarNav,
	AppSidebarToggler,
} from '@coreui/react';


class Sidebar extends Component {

	constructor(props) {
		super(props);
		this.App = props.app;
		this.Navigation = props.navigation;
	}

	render() {
		return (
			<React.Fragment>
				<AppSidebar fixed display={this.props.display}>
					<AppSidebarHeader />
					<AppSidebarForm />
					<AppSidebarNav
						navConfig={this.Navigation.getItems()}
						router={router}
						location={window.location}
					/>
					<AppSidebarFooter />
					<AppSidebarMinimizer />
				</AppSidebar>
			</React.Fragment>
		);
	}

}

export default Sidebar;
