import React from 'react';
import { connect } from 'react-redux';
import {
	AppSidebar,
	AppSidebarFooter,
	AppSidebarForm,
	AppSidebarHeader
} from '@coreui/react';

import SidebarNavItems from './SidebarNavItems';

const Sidebar = (props) => {

	return (
		<AppSidebar fixed display={props.display}>
			<AppSidebarHeader />
			<AppSidebarForm />
			<SidebarNavItems
				navConfig={props.navigation.getItems().items}
				unauthorizedNavItems={props.unauthorizedNavItem}
				unauthorizedNavChildren={props.unauthorizedNavChildren}
			/>
			<AppSidebarFooter />
		</AppSidebar>
	)
}

function mapStateToProps(state) {
	return {
		unauthorizedNavItem: state.auth?.unauthorizedNavItem,
		unauthorizedNavChildren: state.auth?.unauthorizedNavChildren
	};
}

export default connect(mapStateToProps)(Sidebar);
