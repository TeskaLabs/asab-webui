import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { Nav, Button } from 'reactstrap';
import SidebarItem from './SidebarItem';

import { CHANGE_SIDEBAR_SIZE } from '../../actions';

const Sidebar = (props) => {
	const navConfig = props.navigation.getItems().items,
		unauthorizedNavItems = props.unauthorizedNavItem,
		unauthorizedNavChildren= props.unauthorizedNavChildren;

	// Sort items based on config
	const memoizedItemsList = useMemo(() => {
		const itemsList = [...navConfig].sort((a,b) => {
			const aOrder = isNaN(a.order) ? 9999 : a.order,
				bOrder = isNaN(b.order) ? 9999 : b.order;
			return aOrder > bOrder ? 1 : -1;
		});

		return itemsList;
	}, [navConfig])

	const changeSidebarSize = () => props.app.Store.dispatch({ type: CHANGE_SIDEBAR_SIZE });

	return (
		<div className={`app-sidebar${props.isSidebarMinimized ? "-minimized" : ""}${props.isSidebarOpen ? "" : "-closed"}`}>
			<div className="sidebar-nav">
				<Nav  vertical>
					{memoizedItemsList.map((item, idx) => (
						unauthorizedNavItems == undefined || unauthorizedNavItems.length == 0 ?
							<SidebarItem item={item} unauthorizedNavChildren={unauthorizedNavChildren} key={idx}/>
						:
							unauthorizedNavItems.indexOf(item.name) == -1 && <SidebarItem item={item} unauthorizedNavChildren={unauthorizedNavChildren} key={idx}/>
					))}
				</Nav>
				<div className="sidebar-bottom">
					<div onClick={changeSidebarSize} className="sidebar-minimize-button">
						<i className="cil-chevron-left" />
					</div>
				</div>
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		isSidebarOpen: state.sidebar.isSidebarOpen,
		isSidebarMinimized: state.sidebar.isSidebarMinimized,
		unauthorizedNavItem: state.auth?.unauthorizedNavItem,
		unauthorizedNavChildren: state.auth?.unauthorizedNavChildren
	};
}

export default connect(mapStateToProps)(Sidebar);
