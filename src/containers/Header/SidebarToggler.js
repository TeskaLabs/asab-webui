import React from 'react';

import { SET_SIDEBAR } from '../../actions';

const SidebarToggler = ({ store }) => {
	return (
		<div className="header-sidebar-toggler" onClick={() => store.dispatch({ type: SET_SIDEBAR })}>
			<i className="cil-menu"></i>
		</div>
	)
}

export default SidebarToggler;