import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
	Nav, NavItem, NavLink, Collapse
} from 'reactstrap';

import Icon from './SidebarIcon';

const SidebarItem = ({ item, unauthorizedNavChildren }) => {
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
				<div className="inner-link-container">
					<Icon icon={item.icon} />
					<span className="sidebar-item-text">{t(`Sidebar|${item.name}`)}</span>
				</div>
				{item.children &&
					<span className={`sidebar-chevron${isOpen ? "-open" : ""}`}>
						<Icon icon="cil-chevron-left" />
					</span>
				}
			</NavLink>

			{item.children &&
				(
					<Collapse isOpen={isOpen}>
						<Nav>
							{item.children.map((child, idx) => (
								unauthorizedNavChildren == undefined || unauthorizedNavChildren.length == 0 ?
									<NavChildren child={child} idx={idx} location={location} history={history}/>
								:
									unauthorizedNavChildren.indexOf(child.name) == -1 && <NavChildren child={child} idx={idx} location={location} history={history}/>
							))}
						</Nav>
					</Collapse>
				)
			}
		</NavItem>
	)
}

export default SidebarItem;

const NavChildren = ({ child, idx, location, history }) => {
	const { t } = useTranslation();
	return (
		<NavLink
			key={idx}
			className={`${location.pathname === child.url ? "active" : ""}`}
			onClick={() => {
				if (child.url && location.pathname !== child.url) history.push(child.url);
			}}
		>
			<div className="inner-link-container">
				<Icon icon={child.icon} />
				<span className="sidebar-item-text">{t(`Sidebar|${child.name}`)}</span>
			</div>
		</NavLink>
	)
}
