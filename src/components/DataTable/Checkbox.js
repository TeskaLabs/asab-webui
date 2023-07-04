import  React from "react";
import { Input } from "reactstrap";

const Checkbox = (props) => {
	return (
		<div
			style={{display: 'flex', alignItems: 'center' }}
		>
			<Input
				style={{marginLeft: 'unset', marginTop: 'unset', position: 'inherit'}}
				className="ml-1"
				onChange={props.onCheckbox}
				type="checkbox"
                checked={props?.checkbox?.active}
            />

			<span style={{marginLeft: '0.5rem'}}>{props?.checkbox?.title}</span>
		</div>
	)
}

export default Checkbox;
