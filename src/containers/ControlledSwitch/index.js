import React from 'react';

import './switch.scss';

const Switch = ({ isOn, toggle, disabled=false, title }) => {
	const onClick = () => {
		if (!disabled) toggle();
	}
	
	return (
		<div className={`switch-container${disabled ? "-disabled" : ""}`} title={title}>
			<div className={isOn ? "on" : "off"} onClick={onClick}>
				<div className="circle"></div>
			</div>
		</div>
	);
}

export default Switch;
