import React, {useMemo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Modal, Nav} from 'reactstrap';
import SidebarItem from './SidebarItem';
import NavbarBrand from './NavbarBrand';
import SidebarBottomItem from './SidebarBottomItem';
import {COLLAPSE_SIDEBAR} from "../../actions";
import { getBrandImage } from 'asab-webui';


export default function Sidebar (props) {
	const [modal, setModal] = useState(false);
	const [sidebarBottomBranding, setSidebarBottomBranding] = useState({});
	const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth});
	const isSidebarCollapsed = useSelector(state => state.sidebar.isSidebarCollapsed);
	const sidebarHiddenItems = useSelector(state => state.sidebar?.sidebarHiddenItems);
	const unauthorizedNavItem = useSelector(state => state.auth?.unauthorizedNavItem);
	const unauthorizedNavChildren = useSelector(state => state.auth?.unauthorizedNavChildren);
	const sessionExpired = useSelector(state => state.auth?.sessionExpired);
	const theme = useSelector(state => state.theme);
	const dispatch = useDispatch();

	let sidebarItems = props.navigation.getItems().items;

	useEffect(() => {
		setSidebarBottomBranding(getBrandImage(props, theme, 'sidebarLogo'));
	}, [theme]);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [windowDimensions]);

	useEffect(() => {
		if (windowDimensions.width && (windowDimensions.width > 768) && (windowDimensions.width <= 1024)) {
			dispatch({
				type: COLLAPSE_SIDEBAR,
				isSidebarCollapsed: true
			});
		} else {
			dispatch({
				type: COLLAPSE_SIDEBAR,
				isSidebarCollapsed: false
			});
		}
	}, [windowDimensions.width])

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

		if (unauthorizedNavItem != undefined && unauthorizedNavItem.length != 0) {
			itemsList = itemsList.filter((item) => unauthorizedNavItem.indexOf(item.name) == -1);
		}

		return itemsList;
	}, [navConfig])

	function handleResize () {
		setWindowDimensions({width: window.innerWidth});
	}

	const toggleSidebarModal = () => setModal(!modal);

	return (
		windowDimensions.width <= 768 ?
		<>
			<div className="mobile-sidebar-burger" onClick={toggleSidebarModal}>
				<i className="cil-menu"></i>
			</div>
			<Modal isOpen={modal} toggle={toggleSidebarModal} className="left">
				<div className="app-sidebar">
					{windowDimensions.width >= 768 &&
						<div style={{display: "inline-block"}}>
							<NavbarBrand {...props}/>
						</div>
					}
					<div className="sidebar-nav">
						<Nav  vertical>
							{memoizedItemsList.map((item, idx) => (
								<SidebarItem
									key={idx}
									item={item}
									disabled={sessionExpired}
									unauthorizedNavChildren={unauthorizedNavChildren}
									uncollapseAll={memoizedItemsList.length <= 2}
									toggleSidebarModal={toggleSidebarModal}
								/>
							))}
						</Nav>
						<SidebarBottomItem item={aboutItem}  sidebarLogo={props.sidebarLogo} disabled={sessionExpired} toggleSidebarModal={toggleSidebarModal}/>
					</div>
				</div>
			</Modal>
		</>
		:
		<div className={`app-sidebar${isSidebarCollapsed ? " collapsed" : ""}`}>
			{windowDimensions.width > 768 &&
				<div style={{display: "inline-block"}}>
					<NavbarBrand {...props} isSidebarMinimized/>
				</div>
			}
			<div className="sidebar-nav">
				<Nav  vertical>
					{memoizedItemsList.map((item, idx) => (
						<SidebarItem
							key={idx}
							item={item}
							disabled={sessionExpired}
							unauthorizedNavChildren={unauthorizedNavChildren}
							uncollapseAll={memoizedItemsList.length <= 2}
						/>
					))}
				</Nav>
				<SidebarBottomItem item={aboutItem} sidebarLogo={sidebarBottomBranding} disabled={sessionExpired} />
			</div>
		</div>
	)
}
