import { Input } from "reactstrap";
import  React, { useEffect } from "react";

const Checkbox = (props) => {
	// console.log('renderd checkbox')
	return (
		<div
			style={{display: 'flex', alignItems: 'center' }}
		>
			<Input
				style={{marginLeft: 'unset', marginTop: 'unset', position: 'inherit'}}
				className="ml-1"
				onChange={props.onCheckbox}
				type="checkbox"
                checked={props?.checkbox?.selectAll}
            />

			<span style={{marginLeft: '0.5rem'}}>{props?.checkbox?.title}</span>
		</div>
	)
}

export default Checkbox;
