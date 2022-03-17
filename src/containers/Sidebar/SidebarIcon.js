import React from 'react';

const Icon = ({ icon }) => {
	if (typeof icon === "string") {
		return <i className={`${icon}`}></i>
	}

	return <span>{icon}</span>;
}

export default Icon;