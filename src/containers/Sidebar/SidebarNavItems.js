import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { Nav } from 'reactstrap';
import SidebarItem from './SidebarItem';

const SidebarNavItems = ({ navConfig, sidebarItemsOrder }) => {

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
				<SidebarItem item={item} key={idx}/>
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
