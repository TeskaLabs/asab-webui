import React, { useMemo, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { Nav } from 'reactstrap';
import SidebarItem from './SidebarItem';

import { CHANGE_SIDEBAR_SIZE } from '../../actions';

/*
	Custom constructor for displaying items in Sidebar
	(it is triggered earlier than useEffect when placed
	on top of the function)
*/
const useConstructor = (callBack = () => {}) => {
	const hasBeenCalled = useRef(false);
	if (hasBeenCalled.current) return;
	callBack();
	hasBeenCalled.current = true;
}

const Sidebar = (props) => {
	const ASABConfigAPI = props.app.axiosCreate('asab_config');

	const [ sidebarConfig, setSidebarConfig ] = useState(undefined);
	const configName = props?.title ? props.title : "";

	useConstructor(async () => {
		async function getSidebarConfiguration() {
			try {
				let response = await ASABConfigAPI.get(`/config/Sidebar/${configName}?format=json`);
				if (response.data.result != "OK") {
					throw new Error("Config file to get data for Sidebar can't be found in Zookeeper")
				}
				setSidebarConfig(response.data.data);
			}
			catch(e) {
				console.warn("ASAB Config service can't retrieve Sidebar configuration");
			}
		}
		await getSidebarConfiguration();
	});

	let sidebarItems = props.navigation.getItems().items;
	// Filter out sidebar items which has been marked as hidden in ASAB Config module
	if (sidebarConfig) {
		let updatedSidebar = sidebarItems;
		Object.keys(sidebarConfig).map((obj, idx) => {
			if (sidebarItems && Object.values(sidebarItems).some(sidebarObj => sidebarObj.name == sidebarConfig[obj]?.name) && sidebarConfig[obj]?.hide == true) {
				updatedSidebar = updatedSidebar.filter(item => item.name !== sidebarConfig[obj]?.name);
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
		title: state.config.title
	};
}

export default connect(mapStateToProps)(Sidebar);
