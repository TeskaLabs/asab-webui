import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { Nav, NavItem, NavLink } from 'reactstrap';
import CollapsedItem from './CollapsedItem';
import Icon from './SidebarIcon';

const SidebarNavItems = ({ navConfig, app, sidebarItemsOrder }) => {
	const location = useLocation();
	const history = useHistory();

	const { t } = useTranslation();

	// Sort items based on config
	const memoizedItemsList = useMemo(() => {
		let itemsList = navConfig;

		if (sidebarItemsOrder) {
			const substructedList = [];
			itemsList = itemsList.filter((item) => {
				if (sidebarItemsOrder.indexOf(item.name) === -1) {
					substructedList.push(item);
					return false;
				}
				return true;
			})

			itemsList.sort((a, b) => (sidebarItemsOrder.indexOf(a.name) > sidebarItemsOrder.indexOf(b.name) ? 1 : -1));

			itemsList = [...itemsList, ...substructedList];
		}
		return itemsList;
	}, [navConfig, sidebarItemsOrder])

	return (
		<Nav>
			{memoizedItemsList.map((item, idx) => (
				<CollapsedItem item={item} key={idx}/>
			))}
		</Nav>
	);
}

const mapStateToProps = (state) => {
	return {
		sidebarItemsOrder: state.config.sidebarItemsOrder
	}
}

export default connect(mapStateToProps)(SidebarNavItems);

{/*<NavItem key={idx}>
					<NavLink
						className={`${location.pathname === item.url ? "active" : ""}`}
						onClick={() => {
							if (item.url) history.push(item.url);
						}}
					>
						<Icon icon={item.icon} />
						{t(`Sidebar|${item.name}`)}
						{item.children && 
							(
								<CollapsedItem item={item} />
							)
						}
					</NavLink>
				</NavItem>*/}