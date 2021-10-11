import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
	Nav, NavItem, NavLink, Collapse
} from 'reactstrap';

import Icon from './SidebarIcon';

const SidebarItem = ({ item, unauthorizedNavChildren, floatRight = false }) => {
	const [isOpen, setOpen] = useState(false);

	const location = useLocation();
	const history = useHistory();

	const { t } = useTranslation();

	return (
		<NavItem className={`${item.children ? "sidebar-dropdown" : ""} ${isOpen ? "sidebar-dropdown-open": ""}`}>
			<NavLink
				className={`${location.pathname === item.url ? "active" : ""}`}
				onClick={() => {
					if (item.url && location.pathname !== item.url) history.push(item.url);
					if (item.children) setOpen(prev => !prev);
				}}
			>
				{!floatRight && <Icon icon={item.icon} />}
				<span className="sidebar-item-text">{t(`Sidebar|${item.name}`)}</span>
				{floatRight && <Icon icon={item.icon}/>}
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
