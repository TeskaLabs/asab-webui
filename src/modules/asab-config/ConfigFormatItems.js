import React from "react";

import {
	Form, FormGroup, FormText, Input, Label
} from "reactstrap";

// TODO: Different types of ConfigItem to cover formats such as "number", "boolean", checkbox, radiobox
export function ConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="text"
				name={myid}
				id={myid}
				placeholder={props.item['default']}
				innerRef={props.register()}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function NumberConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="number"
				name={myid}
				id={myid}
				placeholder={props.item['default']}
				innerRef={props.register()}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function UrlConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="url"
				name={myid}
				id={myid}
				placeholder={props.item['default']}
				innerRef={props.register()}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function EmailConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="email"
				name={myid}
				id={myid}
				placeholder={props.item['default']}
				innerRef={props.register()}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function PasswordConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="password"
				name={myid}
				id={myid}
				placeholder={props.item['default']}
				innerRef={props.register()}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function CheckBoxConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<br />
			<Input
				style={{marginLeft: 5}}
				type="checkbox"
				name={myid}
				id={myid}
				innerRef={props.register()}
			/>
			<br />
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function RadioButtonConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<React.Fragment>
			<FormGroup check>
				<Label for={myid}>
					{props.item['title']}
				</Label>
				<br />
				<Label for={myid} style={{marginLeft: 20}} check>
					<Input
						type="radio"
						name={myid}
						id={myid}
						value={"True"}
						innerRef={props.register()}
					/>{' '}
					True
				</Label>
			</FormGroup>
			<FormGroup check>
				<Label for={myid} style={{marginLeft: 20}} check>
					<Input
						type="radio"
						name={myid}
						id={myid}
						value={"False"}
						innerRef={props.register()}
					/>{' '}
					False
				</Label>
				<FormText color="muted">
					{props.item['description']}
				</FormText>
			</FormGroup>
		</React.Fragment>
	);
}


export function SelectConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="select"
				name={myid}
				id={myid}
				innerRef={props.register()}
			>
				{props.item['default'].length > 0 ? props.item['default'].map((val, idx) => {return(
					<option key={idx}>{val}</option>
				)}) : null}
			</Input>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function TextAreaConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="textarea"
				name={myid}
				id={myid}
				innerRef={props.register()}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function ConfigAdHocItem(props) {
	let myid = props.sectionname;
	return (
		props.values.length > 1 ?
			props.values.map(obj => {
				return(
					<FormGroup key={Object.keys(obj)}>
						<Label for={myid}>
							{Object.keys(obj)}
						</Label>
						<Input
							type="text"
							name={myid}
							id={myid}
							value={Object.values(obj)}
							readOnly
						/>
						<FormText color="muted">
							Read only
						</FormText>
					</FormGroup>
					)
			})
		:
			<React.Fragment>
				<FormGroup>
					<Label for={myid}>
						{Object.keys(props.values[0])}
					</Label>
					<Input
						type="text"
						name={myid}
						id={myid}
						value={Object.values(props.values[0])}
						readOnly
					/>
					<FormText color="muted">
						Read only
					</FormText>
				</FormGroup>
			</React.Fragment>
	);
}
