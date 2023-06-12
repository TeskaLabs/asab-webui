import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
	NavItem, NavLink, Collapse, Nav
} from 'reactstrap';

import Icon from './SidebarIcon';

const SidebarItem = ({
	item, unauthorizedNavChildren, disabled, uncollapseAll, toggleSidebarModal

}) => {
	const [isOpen, setOpen] = useState(false);

	const location = useLocation();
	const history = useHistory();

	const { t } = useTranslation();

	// Should collapsed item uncollapse
	useEffect(() => {
		if (item.children) {
			// if length of all sidebar items is 2 or less
			if (uncollapseAll) {
				setOpen(true);
				return;
			}

			// if child is active
			item.children.forEach(child => {
				if (child.url === location.pathname) {
					setOpen(true);
				}
			});
		}
	}, []);

	 const onNavLink = () => {
		// Preserve from history pushing when item.url doesn't exist
		// or when current location pathname is the same as item.url
		if (item.url && location.pathname !== item.url) {
			history.push(item.url);
			// collapsing the sidebar after selecting an item
			if (toggleSidebarModal != undefined) {
				toggleSidebarModal()
			}

		}
		// Preserve from collapsing when item doesn't have children
		// or if item should always be uncollapsed
		else if (item.children && !uncollapseAll) setOpen(prev => !prev);
	}

	return (
		<>
			<NavItem className="sidebar-item"  title={t(`Sidebar|${item.name}`)}>
				<NavLink disabled={disabled} onClick={onNavLink}>
					<button disabled={disabled} className={`sidebar-item-button${location.pathname === item.url ? " active " : " "}btn`}>
						<Icon icon={item.icon} />
						<div className="sidebar-item-name ml-2">{t(`Sidebar|${item.name}`)}</div>
						{item.children && item.children.length > 0 && (
							<Icon icon={isOpen ? "at-arrow-down-circle" : "at-arrow-left-circle"} />
						)}
					</button>
				</NavLink>

				{item.children &&
					(
						<Collapse isOpen={isOpen}>
							<Nav className="nav-children">
								{item.children.map((child, idx) => (
									unauthorizedNavChildren == undefined || unauthorizedNavChildren.length == 0 ?
										<SidebarItem key={idx} item={child} disabled={disabled} toggleSidebarModal={toggleSidebarModal} />
									:
										unauthorizedNavChildren.indexOf(child.name) == -1 && <SidebarItem key={idx} item={child} disabled={disabled} toggleSidebarModal={toggleSidebarModal} />
								))}
							</Nav>
						</Collapse>
					)
				}
			</NavItem>
		</>
	)
}

export default SidebarItem;
