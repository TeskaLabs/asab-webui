import React from 'react';
import { connect } from 'react-redux';

const Main = ({ isSidebarMinimized, isSidebarOpen, children }) => {
	const withSidebar = isSidebarOpen ? "-with-sidebar" : "",
		isMinimized = isSidebarOpen && isSidebarMinimized ? "-minimized" : "";
	return (
		<main className={`main${withSidebar}${isMinimized}`}>
			{children}
		</main>
	);
}

const mapStateToProps = state => {
	return {
		isSidebarMinimized: state.sidebar.isSidebarMinimized,
		isSidebarOpen: state.sidebar.isSidebarOpen
	}
}

export default connect(mapStateToProps)(Main)