import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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


export default function ConfigEditor(props) {

	const [ typeId, setTypeId ] = useState(props.match.params.type_id);
	const [ type, setType ] = useState(undefined);
	const [ adHocValue, setAdHocValue ] = useState({});
	const { register, handleSubmit, setValue, getValues, errors } = useForm();
	
	// TODO: parse data to JSON format
	const onSubmit = data => console.log(data);

	let App = props.app;
	// Retrieve the ASAB_CONFIG_URL from config file
	let services = App.Config.get('SERVICES');
	let url = services?.asabconfig ? services.asabconfig : 'asab-config';
	const Axios = App.axiosCreate(url);

	useEffect(() => {
		load();
	},[]);


	const load = async () => {
		if (typeId) {
			await Axios.get("/type/" + typeId).then(response => {
				setType(response.data);
			})
			.catch(error => {
				console.log(error); // log the error to the browser's console
				App.addAlert("warning", `Unable to get ${typeId} data: ${error}`);
				// TODO: Prepared for i18n
				// App.addAlert("warning", t(`Unable to get ${typeId} data: `, { error: error.toString() }));
			});
		}
	}

	// TODO: fetch list of configs (for treeview)
	// useEffect(() => {

	// 	async function fetchConfigs() {
	// 		let list_of_configs = await Axios.get("/config/" + typeId);
	// 		let configs = list_of_configs.data;
	// 		setConfigList(configs);
	// 	}
	// 	fetchConfigs();
	// }, [type]);

	useEffect(() => {

		async function fetchValues() {
			let values = {}
			// TODO: make config value dynamic in url (replace `new_config`)
			await Axios.get("/config/" + typeId + "/new_config" + "?format=json").then(response => {
				values = response.data;
			})
			.catch(error => {
				console.log(error); // log the error to the browser's console
				App.addAlert("warning", `Unable to get config data: ${error}`);
				// TODO: Prepared for i18n
				// App.addAlert("warning", t(`Unable to get config data: `, { error: error.toString() }));
			});

			// // Mocked
			// let values = {
			// 	'asab:storage': {
			// 		'type': "fool",
			// 	},
			// 	'general': {
			// 		'uid': "123",
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
				setAdHocValue(adHocValues)
			} else {
				App.addAlert("warning", 'Config file is empty.')
			}
		}
		fetchValues();

	},[type]); //configId


	return (
		<Container fluid className="animated fadeIn flex">
			<Row>
				<Col md={{ size: 6, offset: 3 }}>
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
									{typeId}
								</div>
							</div>
						</Card>

						{type && type.properties && Object.keys(type.properties).map((section_name, idx) =>
							<ConfigSection
								key={idx}
								section={type.properties[section_name]}
								sectionname={section_name}
								register={register}
							/>
						)}

						{/* List all remaining sections in "values" as a  ConfigAdHocSection */}
						{Object.keys(adHocValue).length > 0 && Object.keys(adHocValue).map((section_name, idx) =>
							<ConfigAdHocSection
								key={idx}
								section={section_name}
								sectionname={section_name}
								values={adHocValue[section_name]}
							/>
						)}
					</Form>
				</Col>
			</Row>
		</Container>
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
			<CardHeader tag="h5" onClick={toggle} style={{background:"#ead7d7"}}>
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
