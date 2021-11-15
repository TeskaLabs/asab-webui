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
}

export default Switch;
