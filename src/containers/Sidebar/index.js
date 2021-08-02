import React from 'react';

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
				app={props.app}
				navConfig={props.navigation.getItems().items}
			/>
			<AppSidebarFooter />
		</AppSidebar>
	)
}

export default Sidebar;
