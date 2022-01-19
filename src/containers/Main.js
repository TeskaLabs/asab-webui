import React from 'react';
import { connect } from 'react-redux';

const Main = ({
	isSidebarMinimized, isSidebarOpen, hasSidebar,
	isSmallSidebarOpen, children
}) => {
	const withSidebar = hasSidebar !== false && isSidebarOpen ? "-with-sidebar" : "",
		isMinimized = isSidebarOpen && isSidebarMinimized ? "-minimized" : "";

	const stopPropagation = e => {
		if (window.innerWidth < 768 && isSmallSidebarOpen) {
			console.log("stoped");
			e.preventDefault();
			e.stopPropagation();
		}
	}

	return (
		<main className={`main${withSidebar}${isMinimized}`}>
			{children}
			{window.innerWidth < 768 && isSmallSidebarOpen && (
				<div
					onClick={stopPropagation}
					className="stop-propagation-container"
				/>
			)}
		</main>
	);
}

const mapStateToProps = state => {
	return {
		isSidebarMinimized: state.sidebar.isSidebarMinimized,
		isSidebarOpen: state.sidebar.isSidebarOpen,
		isSmallSidebarOpen: state.sidebar.isSmallSidebarOpen
	}
}

export default connect(mapStateToProps)(Main)