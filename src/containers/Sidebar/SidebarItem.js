import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
	Nav, NavItem, NavLink, Collapse
} from 'reactstrap';

import Icon from './SidebarIcon';

const SidebarItem = ({ item, unauthorizedNavChildren, uncollapseAll }) => {
	const [isOpen, setOpen] = useState(false);

	const location = useLocation();
	const history = useHistory();

	const { t } = useTranslation();
console.log(item)
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
		if (item.url && location.pathname !== item.url) history.push(item.url);
		// Preserve from collapsing when item doesn't have children
		// or if item should always be uncollapsed
		else if (item.children && !uncollapseAll) setOpen(prev => !prev);
	}

	return (
		<NavItem className={`${item.children ? "sidebar-dropdown" : "sidebar-item"} ${isOpen ? "sidebar-dropdown-open": ""}`}  title={t(`Sidebar|${item.name}`)}>
			<NavLink
				className={`${location.pathname === item.url ? "active" : ""}`}
				onClick={onNavLink}
			>
				<Icon icon={item.icon} />
				<span className="sidebar-item-text">{t(`Sidebar|${item.name}`)}</span>
				{item.children &&
					<span className={`sidebar-chevron${isOpen ? "-open" : ""}`}>
						<Icon icon="cil-chevron-left" />
					</span>
				}
			</NavLink>

			{item.children &&
				(
					<Collapse isOpen={isOpen}>
						<Nav className="nav-children">
							{item.children.map((child, idx) => (
								unauthorizedNavChildren == undefined || unauthorizedNavChildren.length == 0 ?
									<SidebarItem key={idx} item={child} />
								:
									unauthorizedNavChildren.indexOf(child.name) == -1 && <SidebarItem key={idx} item={child} />
							))}
						</Nav>
					</Collapse>
				)
			}
		</NavItem>
	)
}

export default SidebarItem;
