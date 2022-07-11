// import React from 'react';
//
// import { COLLAPSE_SIDEBAR } from '../../actions';
// import {useSelector, useDispatch} from "react-redux";
//
// const SidebarToggler = () => {
// 	const dispatch = useDispatch();
// 	const isSidebarCollapsed = useSelector(state => state.sidebar.isSidebarCollapsed);
// 	// const onClick = () => {
// 	// 	if (window.innerWidth >= 768) {
// 	// 		store.dispatch({ type: SET_SIDEBAR })
// 	// 	} else {
// 	// 		store.dispatch({ type: SET_SMALL_SIDEBAR })
// 	// 	}
// 	// }
//
// 	const onCollapse = () => {
// 		dispatch({
// 			type: COLLAPSE_SIDEBAR,
// 			isSidebarCollapsed: !isSidebarCollapsed
// 		});
// 	}
//
// 	return (
// 		<div className="header-sidebar-toggler" onClick={onCollapse}>
// 			<i className="cil-menu"></i>
// 		</div>
// 	)
// }
//
// export default SidebarToggler;