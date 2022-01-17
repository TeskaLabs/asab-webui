import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Main = ({
	isSidebarMinimized, isSidebarOpen, hasSidebar,
	isSmallSidebarOpen, theme, children
}) => {
	const withSidebar = hasSidebar !== false && isSidebarOpen ? "-with-sidebar" : "",
		isMinimized = isSidebarOpen && isSidebarMinimized ? "-minimized" : "";
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", onWidthChange);

		return (() => {
			window.removeEventListener("resize", onWidthChange);
		})
	}, [width]);

	const onWidthChange = () => setWidth(window.innerWidth);

	const stopPropagation = e => {
		if (width < 768 && isSmallSidebarOpen) {
			console.log("stoped");
			e.preventDefault();
			e.stopPropagation();
		}
	}

	return (
		<main className={`main${withSidebar}${isMinimized} ${theme}`}>
			{children}
			{width < 768 && isSmallSidebarOpen && (
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
		isSmallSidebarOpen: state.sidebar.isSmallSidebarOpen,
		theme: state.theme
	}
}

export default connect(mapStateToProps)(Main)