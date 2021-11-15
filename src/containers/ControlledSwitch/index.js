<<<<<<< HEAD
import React from 'react';

import './switch.scss';

// documentation available in asab-webui/doc/switch-components.md

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
=======
import React, { useState } from 'react';

import './switch.scss';

const Switch = ({ isOn, toggle }) => {
	return (
		<div className="switch-container">
			<div className={isOn ? "on" : "off"} onClick={toggle}>
				<div className="circle"></div>
			</div>
		</div>
	)
>>>>>>> 576d698 (implement controlled switch)
}

export default Switch;
