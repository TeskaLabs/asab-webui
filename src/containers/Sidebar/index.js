import React, { useState, useMemo, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { Nav } from 'reactstrap';
import SidebarItem from './SidebarItem';

import { CHANGE_SIDEBAR_SIZE, SET_SCREEN } from '../../actions';

const Sidebar = (props) => {
	const navConfig = props.navigation.getItems().items.filter(item => item.name !== "About"),
		unauthorizedNavItems = props.unauthorizedNavItem,
		unauthorizedNavChildren= props.unauthorizedNavChildren,
		aboutItem = props.navigation.getItems().items.filter(item => item.name === "About")[0];
	const [isOpen, setOpen] = useState(true);
	const dispatch = useDispatch();
	const { screen, isSidebarOpen } = useSelector(mapStateToProps);
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		if (window.innerWidth < 768) {
			dispatch({ type: SET_SCREEN, screen: { isSmall: true, isSidebarOpen: false }})
		}
	}, [])

	useEffect(() => {
		if (screen.isSmall && !screen.isSidebarOpen) {
			setOpen(false);
			return ;
		} else if (screen.isSmall && !screen.isSidebarOpen) {
			setOpen(true)
		} else {
			setOpen(isSidebarOpen);
		}
	}, [isOpen, screen, isSidebarOpen])

	useEffect(() => {
		window.addEventListener('resize', onScreenSizeChange);
		
		return(() => {
			window.removeEventListener('resize', onScreenSizeChange);
		})
	}, [width])

	const onScreenSizeChange = () => {
		setWidth(window.innerWidth)
		dispatch({ type: SET_SCREEN, screen: { isSmall: window.innerWidth < 768, isSidebarOpen: isOpen }})
	}
	
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

	const changeSidebarSize = () => dispatch({ type: CHANGE_SIDEBAR_SIZE });

	return (
		<div className={`app-sidebar${props.isSidebarMinimized ? "-minimized" : ""}${isOpen ? "" : "-closed"}`}>
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
	)
}

function mapStateToProps(state) {
	return {
		isSidebarOpen: state.sidebar.isSidebarOpen,
		isSidebarMinimized: state.sidebar.isSidebarMinimized,
		screen: state.sidebar.screen,
		unauthorizedNavItem: state.auth?.unauthorizedNavItem,
		unauthorizedNavChildren: state.auth?.unauthorizedNavChildren
	};
}

export default connect(mapStateToProps)(Sidebar);
