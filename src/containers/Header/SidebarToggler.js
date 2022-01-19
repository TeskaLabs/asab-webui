import React from 'react';

import { SET_SIDEBAR, SET_SMALL_SIDEBAR } from '../../actions';

const SidebarToggler = ({ store }) => {
	const onClick = () => {
		if (window.innerWidth >= 768) {
			store.dispatch({ type: SET_SIDEBAR })
		} else {
			store.dispatch({ type: SET_SMALL_SIDEBAR })
		}
	}

	return (
		<div className="header-sidebar-toggler" onClick={onClick}>
			<i className="cil-menu"></i>
		</div>
	)
}

export default SidebarToggler;