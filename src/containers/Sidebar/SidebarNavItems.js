import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import { Nav } from 'reactstrap';
import SidebarItem from './SidebarItem';

const SidebarNavItems = ({ navConfig, unauthorizedNavItems, unauthorizedNavChildren, sidebarItemsOrder }) => {

	// Sort items based on config
	const memoizedItemsList = useMemo(() => {
		const itemsList = [...navConfig].sort((a,b) => {
			const aOrder = isNaN(a.order) ? 9999 : a.order,
				bOrder = isNaN(b.order) ? 9999 : b.order;
			return aOrder > bOrder ? 1 : -1;
		});

		return itemsList;
	}, [navConfig, sidebarItemsOrder])

	return (
		<Nav>
			{memoizedItemsList.map((item, idx) => (
				unauthorizedNavItems == undefined || unauthorizedNavItems.length == 0 ?
					<SidebarItem item={item} unauthorizedNavChildren={unauthorizedNavChildren} key={idx}/>
				:
					unauthorizedNavItems.indexOf(item.name) == -1 && <SidebarItem item={item} unauthorizedNavChildren={unauthorizedNavChildren} key={idx}/>
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
