import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';
import { useSelector } from 'react-redux';
import { ButtonWithAuthz } from 'asab-webui';

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
	const resource = "asab:service:manage";
	const resources = useSelector(state => state.auth?.resources);

	const toggle = () => setTooltipOpen(!tooltipOpen);

	const title = () => `${label.split(' ')[0]}`;

	return (
		<React.Fragment>
			<ButtonWithAuthz
				aria-label={label}
				id={id}
				size="sm"
				className={className}
				color={color}
				onClick={onClick}
				disabled={disabled}
				outline={outline}
				resource={resource}
				resources={resources}
			>
				<i className={icon}></i>
			</ButtonWithAuthz>
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
