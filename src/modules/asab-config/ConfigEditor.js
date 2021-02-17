import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TreeMenu from 'react-simple-tree-menu';

import {
	Container,
	Col, Row,
	Button,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardBody, CardHeader, CardFooter, CardTitle, CardSubtitle,
	Collapse,
	Form, FormGroup, FormText, Input, Label
} from "reactstrap";

import {
	ConfigItem,
	NumberConfigItem,
	UrlConfigItem,
	EmailConfigItem,
	PasswordConfigItem,
	CheckBoxConfigItem,
	RadioButtonConfigItem,
	SelectConfigItem,
	TextAreaConfigItem,
} from './ConfigFormatItems';


export function ConfigEditor(props) {

	const [ typeData, setTypeData ] = useState(undefined);
	const [ adHocSections, setAdHocSections ] = useState({});
	const { register, handleSubmit, setValue, getValues, errors, reset } = useForm();

	const configType = props.configType;
	const configName = props.configName;

	let App = props.app;
	const Axios = props.axios;


	// Load Schema type - it is triggered on every configType change
	useEffect(() => {
		loadSchemaType();
	},[configType]);


	/*
		Fetch config values - it is triggered on every configName change
		(e.g. within the folder) or on typeData
	*/
	useEffect(() => {
		if (configName != "") {
			fetchConfigValues();
		}
	},[typeData, configName]);


	const loadSchemaType = async () => {
		if (configType != "") {
			try {
				let response = await Axios.get("/type/" + configType);
				setTypeData(response.data);
				// TODO: validate responses which are not 200
			}
			catch {
				App.addAlert("warning", `Unable to get ${configType} data`);
				return;
				// TODO: Prepared for i18n
				// App.addAlert("warning", t(`Unable to get ${typeId} data: `, { error: error.toString() }));
			}
		}
	}


	async function fetchConfigValues() {
		let values = {}
		reset({}); // Reset form on config change

		// TODO: make config value dynamic in url (replace `new_config`)
		try {
			let response = await Axios.get("/config/" + configType + "/" + configName + "?format=json");
			values = response.data;
			// TODO: validate responses which are not 200
		}
		catch {
			App.addAlert("warning", `Unable to get config data`);
			return;
			// TODO: Prepared for i18n
			// App.addAlert("warning", t(`Unable to get config data: `, { error: error.toString() }));
		}

		// // Mocked
		// let values = {
		// 	'asab:storage': {
		// 		'type': "fool",
		// 	},
		// 	'general': {
		// 		'uid': "123",
		// 		'ahoj1': 'jdasj'
		// 	},
		// 	'admiral': {
		// 		'papillon': "666",
		// 	},
		// };

		if (Object.keys(values).length > 0) {
			let stringifiedSchemaValues = getValues() ? JSON.stringify(getValues()) : "";
			let adHocValues = {};
			for (var section in values) {
				let arr = [];
				for (var key in values[section]) {
					// Set config values to the schema (if available)
					setValue('['+section + "] " + key, values[section][key], { shouldValidate: false })
					// Check if config key values are in schema and if not, add it to adhoc values
					let k = {};
					if (stringifiedSchemaValues.indexOf(section +" " + key) == -1) {
						k[key] = values[section][key];
						arr.push(k);
						adHocValues[section] = arr;
					}
				}
			}
			setAdHocSections(adHocValues)
		} else {
			App.addAlert("warning", 'Config file is empty.')
		}
	}


	// Parse data to JSON format, stringify it and save to config file
	const onSubmit = async (data) => {
		let splitKey = "";
		let sectionTitle = "";
		let sectionKey = "";
		let sectionValue = "";
		let section = {};
		let parsedSections = {};
		let prevSection = "";
		// Parse data to object
		Object.keys(data).map((key, idx) =>
			{
				splitKey = key.split(" "),
				sectionTitle = splitKey[0],
				sectionKey = splitKey[1],
				sectionValue = data[key]
				if (prevSection == sectionTitle) {
					section[sectionKey] = sectionValue;
				} else {
					section = {};
					section[sectionKey] = sectionValue;
				}
				prevSection = sectionTitle,
				parsedSections[sectionTitle] = section
			})

		try {
			// TODO: make config dynamic value
			let response = await Axios.put("/config/" + configType + "/" + configName,
				JSON.stringify(parsedSections),
					{ headers: {
						'Content-Type': 'application/json'
						}
					}
				)
			// TODO: validate responses which are not 200
		}
		catch {
			App.addAlert("warning", 'Something went wrong.');
			return;
		}
	}


	return (
		<React.Fragment>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Card style={{marginBottom: "0.25em"}}>
					<div style={{margin: "0.5em"}}>
						<Button
							color="primary"
							type="submit"
						>
							Save
						</Button>
						<div className="float-right">
							<span className="cil-briefcase pr-3" />
							{configType}<br/>
							<span className="cil-settings pr-3" />
							{configName}
						</div>
					</div>
				</Card>

				{/*TODO: add a readOnly item adHocValue when schema does not match all the sections/values of the config*/}
				{typeData && typeData.properties && Object.keys(typeData.properties).map((section_name, idx) =>
					<ConfigSection
						key={idx}
						section={typeData.properties[section_name]}
						sectionname={section_name}
						register={register}
					/>
				)}

				{/* List all remaining sections in "values" as a  ConfigAdHocSection */}
				{Object.keys(adHocSections).length > 0 && Object.keys(adHocSections).map((section_name, idx) =>
					<ConfigAdHocSection
						key={idx}
						section={section_name}
						sectionname={section_name}
						values={adHocSections[section_name]}
					/>
				)}
			</Form>
		</React.Fragment>
	);
}


function ConfigSection(props) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	return (
		<Card style={{marginBottom: "0.25em"}}>
			<CardHeader tag="h5" onClick={toggle}>
				{props.section['title']}
			</CardHeader>
			<Collapse isOpen={isOpen}>
				<CardBody>
					{Object.keys(props.section.properties).map((item_name, idx) =>
						// Decide what type of config item to render based on format
						// TODO: `format` names should be consulted with BE team
						{switch(props.section.properties[item_name]['format']){
							case 'text': return(<ConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							case 'number': return(<NumberConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							case 'url': return(<UrlConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							case 'email': return(<EmailConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							case 'password': return(<PasswordConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							case 'checkbox': return(<CheckBoxConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							case 'radio': return(<RadioButtonConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							case 'select': return(<SelectConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							case 'textarea': return(<TextAreaConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
							default: return(<ConfigItem
													key={idx}
													item={props.section.properties[item_name]}
													itemname={item_name}
													sectionname={props.sectionname}
													register={props.register}
												/>)
						}}
					)}

					{/* TODO: List all remaining key/values from a config as simple Config Item  */}

				</CardBody>
			</Collapse>
		</Card>
	);
}


function ConfigAdHocSection(props) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	let myid = props.sectionname;
	return (
		<Card style={{marginBottom: "0.25em"}}>
			<CardHeader tag="h5" onClick={toggle} style={{background:"#dae2e4"}}>
				{myid}
			</CardHeader>
			<Collapse isOpen={isOpen}>
				<CardBody>
					{props.values.length > 0 && props.values.map((obj, idx) =>
						{
						return (
							<FormGroup key={idx}>
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
						)}
					)}
				</CardBody>
			</Collapse>
		</Card>
	);
}
