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
				unauthItems={props.unauthorizedItem}
				unauthChildren={props.unauthorizedChildren}
			/>
			<AppSidebarFooter />
		</AppSidebar>
	)
}

function mapStateToProps(state) {
	return {
		unauthorizedItem: state.auth?.unauthorizedItem,
		unauthorizedChildren: state.auth?.unauthorizedChildren
	};
}

export default connect(mapStateToProps)(Sidebar);
