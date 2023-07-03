import { Input } from "reactstrap";
import  React, { useEffect } from "react";

const Checkbox = (props) => {
	console.log('renderd checkbox')
	return (
		<div
			style={{display: 'flex', alignItems: 'center' }}
		>
			{props?.checkbox?.title}
			<Input
				style={{marginLeft: 'unset', marginTop: 'unset', position: 'inherit'}}
				className="ml-1"
				onChange={props.onCheckbox}
				type="checkbox"></Input>
		</div>
	)
}

export default Checkbox;
