import React from "react";

import {
	Form, FormGroup, FormText, Input, Label
} from "reactstrap";

import { useTranslation } from 'react-i18next';

// TODO: Different types of ConfigItem to cover formats such as "number", "boolean", checkbox, radiobox

export function StringItems(props) {
	if (props.defs) {
		let def = Object.keys(props.defs)[0];
		if (def == 'url') {
			return (
				<UrlConfigItem
					item={props.item}
					itemname={props.itemname}
					sectionname={props.sectionname}
					register={props.register}
				/>)
		} else if (def == 'email') {
			return (
				<EmailConfigItem
					item={props.item}
					itemname={props.itemname}
					sectionname={props.sectionname}
					register={props.register}
				/>)
		} else if (def == 'password') {
			return (
				<PasswordConfigItem
					item={props.item}
					itemname={props.itemname}
					sectionname={props.sectionname}
					register={props.register}
				/>)

		} else if (def == 'textarea') {
			return (
				<TextAreaConfigItem
					item={props.item}
					itemname={props.itemname}
					sectionname={props.sectionname}
					register={props.register}
				/>)
		} else if (def == 'select') {
			return (
				<SelectConfigItem
					item={props.item}
					itemname={props.itemname}
					sectionname={props.sectionname}
					register={props.register}
				/>)
		} else {
			// If not defined as above or if `text`, then the text input is used
			return (
				<ConfigItem
					item={props.item}
					itemname={props.itemname}
					sectionname={props.sectionname}
					register={props.register}
				/>)
		}
	} else {
		return (
			<ConfigItem
				item={props.item}
				itemname={props.itemname}
				sectionname={props.sectionname}
				register={props.register}
			/>)
	}
}

export function ConfigItem(props) {
	let myid = `${props.sectionname} ${props.itemname}`;
	const reg = props.register(myid);
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
				innerRef={reg.ref}
				onChange={reg.onChange}
				onBlur={reg.onBlur}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function NumberConfigItem(props) {
	if (props.defs && Object.keys(props.defs)[0] == 'select') {
		return (
			<SelectConfigItem
				item={props.item}
				itemname={props.itemname}
				sectionname={props.sectionname}
				register={props.register}
			/>)
	} else {
		let myid = `${props.sectionname} ${props.itemname}`;
		const reg = props.register(myid);
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
					defaultValue={props.item['default']}
					innerRef={reg.ref}
					onChange={reg.onChange}
					onBlur={reg.onBlur}
				/>
				<FormText color="muted">
					{props.item['description']}
				</FormText>
			</FormGroup>
		);
	}
}


export function UrlConfigItem(props) {
	let myid = `${props.sectionname} ${props.itemname}`;
	const reg = props.register(myid);
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
				innerRef={reg.ref}
				onChange={reg.onChange}
				onBlur={reg.onBlur}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function EmailConfigItem(props) {
	let myid = `${props.sectionname} ${props.itemname}`;
	const reg = props.register(myid);
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
				innerRef={reg.ref}
				onChange={reg.onChange}
				onBlur={reg.onBlur}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function PasswordConfigItem(props) {
	let myid = `${props.sectionname} ${props.itemname}`;
	const reg = props.register(myid);
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
				innerRef={reg.ref}
				onChange={reg.onChange}
				onBlur={reg.onBlur}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function CheckBoxConfigItem(props) {
	let myid = `${props.sectionname} ${props.itemname}`;
	const reg = props.register(myid);
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<br />
			<Input
				style={{marginLeft: 2, position:"relative"}}
				type="checkbox"
				name={myid}
				id={myid}
				innerRef={reg.ref}
				onChange={reg.onChange}
				onBlur={reg.onBlur}
			/>
			<br />
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}

// TODO: Implement and test radio button when there will be a case for it
export function RadioButtonConfigItem(props) {
	let myid = `${props.sectionname} ${props.itemname}`;
	const reg = props.register(myid);
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
						innerRef={reg.ref}
						onChange={reg.onChange}
						onBlur={reg.onBlur}
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
						innerRef={reg.ref}
						onChange={reg.onChange}
						onBlur={reg.onBlur}
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
	let myid = `${props.sectionname} ${props.itemname}`;
	const reg = props.register(myid);
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="select"
				name={myid}
				id={myid}
				innerRef={reg.ref}
				onChange={reg.onChange}
				onBlur={reg.onBlur}
			>
				{props.item['default'].length > 0 ? props.item['default'].map((val, idx) => {return(
					<option key={idx} value={val}>{val}</option>
				)}) : null}
			</Input>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}


export function TextAreaConfigItem(props) {
	let myid = `${props.sectionname} ${props.itemname}`;
	const reg = props.register(myid);
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="textarea"
				name={myid}
				id={myid}
				innerRef={reg.ref}
				onChange={reg.onChange}
				onBlur={reg.onBlur}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}

export function ConfigAdHocItem(props) {
	const { t, i18n } = useTranslation();
	let myid = props.valuename;
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
							{t('ASABConfig|Read only')}
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
						{t('ASABConfig|Read only')}
					</FormText>
				</FormGroup>
			</React.Fragment>
	);
}
