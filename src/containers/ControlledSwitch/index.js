import React from 'react';

import './switch.scss';

// documentation available in asab-webui/doc/switch-components.md

const Switch = ({ isOn, toggle, disabled=false, title, size='md' }) => {
	const onClick = () => {
		if (!disabled) toggle();
	}
	
	return (
		<div className={`switch-container${disabled ? "-disabled" : ""} ${size}`} title={title}>
			<div className={isOn ? "on" : "off"} onClick={onClick}>
				<div className="circle"></div>
			</div>
		</div>
	);
}

export default Switch;
