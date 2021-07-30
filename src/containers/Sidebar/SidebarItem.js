import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { 
	Nav, NavItem, NavLink, Collapse
} from 'reactstrap';

import Icon from './SidebarIcon';

const SidebarItem = ({ item }) => {
	const [isOpen, setOpen] = useState(false);

	const location = useLocation();
	const history = useHistory();

	const { t } = useTranslation();

	return (
		<>
			<NavItem className={`${item.children ? "sidebar-dropdown" : ""}`}>
				<NavLink
					className={`${location.pathname === item.url ? "active" : ""}`}
					onClick={() => {
						if (item.url && location.pathname !== item.url) history.push(item.url);
						if (item.children) setOpen(prev => !prev);
					}}
				>
					<Icon icon={item.icon} />
					{t(`Sidebar|${item.name}`)}
					{item.children &&
						<span className={`sidebar-chevron${isOpen ? "-open" : ""} float-right`}>
							<Icon icon="cil-chevron-left" />
						</span>
					}
				</NavLink>
				
				{item.children && 
					(
						<Collapse isOpen={isOpen}>
							<Nav>
								{item.children.map((child, idx) => (
									<NavLink
										key={idx}
										className={`${location.pathname === child.url ? "active" : ""}`}
										onClick={() => {
											if (child.url && location.pathname !== child.url) history.push(child.url);
										}}
									>
										<Icon icon={child.icon} />
										{t(`Sidebar|${child.name}`)}
									</NavLink>
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
