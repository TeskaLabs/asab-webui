import React from 'react';

import { Button } from 'reactstrap';

import { SET_SIDEBAR } from '../../actions';

const SidebarToggler = ({ store }) => {
	
	return (
		<Button onClick={() => store.dispatch({ type: SET_SIDEBAR })}>
			<i className="cil-menu"></i>
		</Button>
	)
}

export default SidebarToggler;