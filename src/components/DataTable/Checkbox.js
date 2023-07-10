import  React from "react";
import { Input } from "reactstrap";

const Checkbox = (props) => {
	return (
		<div className="data-table-checkbox">
			<Input
				type="checkbox"
				className="data-table-checkbox-input ml-2"
				checked={props.checkbox}
				onChange={props.onCheckbox}
				title={props.title}
			/>
			<span className="ml-2 data-table-checkbox-text">{props.title}</span>
		</div>
	)
}

export default Checkbox;
