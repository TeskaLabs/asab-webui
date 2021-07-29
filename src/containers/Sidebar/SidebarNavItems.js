import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { Nav, NavItem, NavLink } from 'reactstrap';
import Icon from './SidebarIcon';

const SidebarNavItems = ({ navConfig, app, sidebarItemsOrder }) => {
	const location = useLocation();
	const history = useHistory();

	const { t } = useTranslation();

	// Sort items based on config
	const memoizedItemsList = useMemo(() => {
		const itemsList = navConfig;

		if (sidebarItemsOrder) {
			itemsList.sort((a, b) => {
				if (sidebarItemsOrder.indexOf(a.name) > sidebarItemsOrder.indexOf(b.name)) return 1;
				else return -1;

			});
		}

		return itemsList;
	}, [navConfig, sidebarItemsOrder])

	return (
		<Nav>
			{memoizedItemsList.map((item, idx) => (
				<NavItem key={idx}>
					<NavLink
						className={`${location.pathname === item.url ? "active" : ""}`}
						onClick={() => history.push(item.url)}
					>
						<Icon icon={item.icon} />
						{t(`Sidebar|${item.name}`)}
					</NavLink>
				</NavItem>
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