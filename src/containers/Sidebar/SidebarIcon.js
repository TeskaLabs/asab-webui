import React from 'react';

const Icon = ({ icon }) => {
	if (typeof icon === "string") {
		return <i className={`${icon} sidebar-item-icon`}></i>
	}

	return <span className="sidebar-item-icon">{icon}</span>;
}

export default Icon;