import React from 'react';
import { useLocation, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import {
	NavItem, NavLink, Nav
} from 'reactstrap';

import { COLLAPSE_SIDEBAR } from "../../actions";


import Icon from './SidebarIcon';

import { SET_SMALL_SIDEBAR } from '../../actions';

const SidebarBottomItem = ({ item, sidebarLogo }) => {
	const isSidebarCollapsed = useSelector(state => state.sidebar.isSidebarCollapsed);

	const location = useLocation();
	const history = useHistory();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	
	const onNavLink = () => {
		// Preserve from history pushing when item.url doesn't exist
		// or when current location pathname is the same as item.url
		if (item.url && location.pathname !== item.url) history.push(item.url);
		// Preserve from collapsing when item doesn't have children
		// or if item should always be uncollapsed
		else if (item.children && !uncollapseAll) setOpen(prev => !prev);
		// Close small sidebar on item click
		if (isSmallSidebarOpen && window.innerWidth < 768) dispatch({ type: SET_SMALL_SIDEBAR });
	}

	const onCollapse = (event) => {
		event.stopPropagation();
		dispatch({
			type: COLLAPSE_SIDEBAR,
			isSidebarCollapsed: !isSidebarCollapsed
		});
	}

	const AboutButton = () => {
		return (
			<>
				<Icon icon={item.icon} />
				<div className="sidebar-item-name ml-2">{t(`Sidebar|${item.name}`)}</div>
			</>
		)
	}

	return (
		<div className="sidebar-bottom">
			<Nav vertical>
				<NavItem className="sidebar-item" >
					<NavLink className="p-0" onClick={onNavLink}>
						{item && (
							<button
								title={t(`Sidebar|${item.name}`)}
								className={`sidebar-item-button${location.pathname === item.url ? " active " : " "}btn left mobile-full-btn`}
							>
								{sidebarLogo ? 
									isSidebarCollapsed ?
										sidebarLogo.minimized ?
											<img
												src={sidebarLogo.minimized}
												alt={t(`Sidebar|${item.name}`)}
												width="30"
												height="30"
												className="m-auto"
											/>
										:
											<AboutButton />
									:
										sidebarLogo.full ?
											<img
												src={sidebarLogo.full}
												alt={t(`Sidebar|${item.name}`)}
												width="90"
												height="30"
												className="m-auto"
											/>
										:
											<AboutButton />
								:
									<AboutButton />
								}
								
							</button>
						)}
						<button
							title={t(`Sidebar|Collapse`)}
							className={`sidebar-item-button btn mobile-collapsed${item ? " right" : ""}`}
							onClick={onCollapse}
						>
							<i className='cil-chevron-left ml-auto'></i>
						</button>
					</NavLink>
				</NavItem>
			</Nav>
		</div>
	)
}

export default SidebarBottomItem;
