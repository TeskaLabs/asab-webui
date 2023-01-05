import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

const ActionButton = ({
	label,
	onClick,
	icon,
	id,
	disabled=false,
	className="",
	color="",
	outline=false
}) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const toggle = () => setTooltipOpen(!tooltipOpen);

	const title = () => `${label.split(' ')[0]}`;

	return (
		<React.Fragment>
			<Button
				aria-label={label}
				id={id}
				size="sm"
				className={className}
				color={color}
				onClick={onClick}
				disabled={disabled}
				outline={outline}
			>
				<i className={icon}></i>
			</Button>
			<Tooltip
				placement="bottom"
				isOpen={tooltipOpen}
				target={id}
				toggle={toggle}
			>
				{title()}
			</Tooltip>
		</React.Fragment>
	)
}

export default ActionButton;
