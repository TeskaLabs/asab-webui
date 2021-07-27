import React from 'react';

import {
	AppSidebar,
	AppSidebarFooter,
	AppSidebarForm,
	AppSidebarHeader,
	AppSidebarMinimizer
} from '@coreui/react';

import SidebarNavItems from './SidebarNavItems';

const Sidebar = (props) => {

	return (
		<React.Fragment>
			<AppSidebar fixed display={props.display}>
				<AppSidebarHeader />
				<AppSidebarForm />
				<SidebarNavItems
					navConfig={props.navigation.getItems().items}
				/>
				<AppSidebarFooter />
				<AppSidebarMinimizer />
			</AppSidebar>
		</React.Fragment>
	)
}

export default Sidebar;
