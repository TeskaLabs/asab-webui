import  React from "react";
import { Input } from "reactstrap";

const Checkbox = (props) => {
	return (
		<div className="data-table-checkbox">
			<Input
				type="checkbox"
				className="data-table-checkbox-input"
				checked={props.checkbox?.active}
				onChange={props?.onCheckbox}
				title={props?.checkbox?.title}
			/>

			<span className="ml-2 data-table-checkbox-text">{props?.checkbox?.title}</span>
		</div>
	)
}

export default Checkbox;
