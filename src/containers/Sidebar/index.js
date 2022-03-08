import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { Nav } from 'reactstrap';
import SidebarItem from './SidebarItem';

import { CHANGE_SIDEBAR_SIZE } from '../../actions';


const Sidebar = (props) => {
	// Get dynamically hiddden sidebar items from store
	let sidebarHiddenItems = props.sidebarHiddenItems;

	let sidebarItems = props.navigation.getItems().items;
	// Filter out sidebar items which has been marked as hidden in ASAB Config module
	if (sidebarHiddenItems) {
		let updatedSidebar = sidebarItems;
		Object.keys(sidebarHiddenItems).map((obj, idx) => {
			if (sidebarItems && Object.values(sidebarItems).some(sidebarObj => sidebarObj.name == sidebarHiddenItems[obj]?.name) && sidebarHiddenItems[obj]?.hide == true) {
				updatedSidebar = updatedSidebar.filter(item => item.name !== sidebarHiddenItems[obj]?.name);
			}
		})
		sidebarItems = updatedSidebar;
	}

	const navConfig = sidebarItems.filter(item => item.name !== "About"),
		unauthorizedNavItems = props.unauthorizedNavItem,
		unauthorizedNavChildren = props.unauthorizedNavChildren,
		aboutItem = props.navigation.getItems().items.filter(item => item.name === "About")[0];

	// Sort items based on config
	const memoizedItemsList = useMemo(() => {
		let itemsList = [...navConfig]
		if (props.sidebarItemsOrder) {
			const sidebarItemsOrder = [...props.sidebarItemsOrder].reverse();
			itemsList.sort((a, b) => {
				if (sidebarItemsOrder.indexOf(a.name) > sidebarItemsOrder.indexOf(b.name)) return -1;
				else return 1;
			});
		}

		if (unauthorizedNavItems != undefined && unauthorizedNavItems.length != 0) {
			itemsList = itemsList.filter((item) => unauthorizedNavItems.indexOf(item.name) == -1);
		}

		return itemsList;
	}, [navConfig])

	const changeSidebarSize = () => props.app.Store.dispatch({ type: CHANGE_SIDEBAR_SIZE });

	return (
		<>
			<div className={`app-sidebar${props.isSidebarMinimized ? "-minimized" : ""} ${props.isSidebarOpen ? "" : "closed"}`}>
				<div className="sidebar-nav">
					<Nav  vertical>
						{memoizedItemsList.map((item, idx) => (
							<SidebarItem
								key={idx}
								item={item}
								unauthorizedNavChildren={unauthorizedNavChildren}
								uncollapseAll={memoizedItemsList.length <= 2}
							/>
						))}
					</Nav>
					<div className="sidebar-bottom">
						{aboutItem && <Nav vertical><SidebarItem item={aboutItem}/></Nav>}
						<div onClick={changeSidebarSize} className={`sidebar-minimize-button${aboutItem ? "" : " w-100"}`}>
							<i className="cil-chevron-left" />
						</div>
					</div>
				</div>
			</div>
			<div
				className={`app-sidebar ${props.isSmallSidebarOpen ? "" : "closed"} small-screen`}
			>
				<div className="sidebar-nav">
					<Nav  vertical>
						{memoizedItemsList.map((item, idx) => (
							<SidebarItem
								key={idx}
								item={item}
								unauthorizedNavChildren={unauthorizedNavChildren}
								uncollapseAll={memoizedItemsList.length <= 2}
							/>
						))}
					</Nav>
					<div className="sidebar-bottom">
						{aboutItem && <Nav vertical><SidebarItem item={aboutItem}/></Nav>}
						<div onClick={changeSidebarSize} className={`sidebar-minimize-button${aboutItem ? "" : " w-100"}`}>
							<i className="cil-chevron-left" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

function mapStateToProps(state) {
	return {
		isSidebarOpen: state.sidebar.isSidebarOpen,
		isSidebarMinimized: state.sidebar.isSidebarMinimized,
		isSmallSidebarOpen: state.sidebar.isSmallSidebarOpen,
		unauthorizedNavItem: state.auth?.unauthorizedNavItem,
		unauthorizedNavChildren: state.auth?.unauthorizedNavChildren,
		sidebarHiddenItems: state.sidebar.sidebarHiddenItems
	};
}

export default connect(mapStateToProps)(Sidebar);
