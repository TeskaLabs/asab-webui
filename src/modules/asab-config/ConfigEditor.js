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
				App.addAlert("warning", t(`Unable to get ${typeId} data: `, { error: error.toString() }));
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
			// let config_response = await Axios.get("/config/" + typeId + "/new_config")
			// let values = config_response.data;

			// Mocked
			let values = {
				'asab:storage': {
					'type': "fool",
				},
				'general': {
					'uid': "123",
				},
				'admiral': {
					'papillon': "666",
				},
			};

			for (var section in values) {
				for (var key in values[section]) {
					setValue('['+section + "] " + key, values[section][key], { shouldValidate: false })
				}
			}
			// TODO: add validation on config values, which does not fit to the schema and print them in ConfigAdHocSection
			// let testvalues = getValues();
			// console.log(values['asab:storage'], values['asab:storage']['type'])
			// console.log(testvalues, 'testvalyesss')
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

						{/*!type && && Ob*
							<ConfigAdHocSection
								section={type.properties[section_name]}
								sectionname={section_name}
								// register={register}
							/>
						/}
						{/* TODO: List all remaining sections in "values" as a  ConfigAdHocSection */}

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
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<Card style={{marginBottom: "0.25em"}}>
			<CardHeader tag="h5" onClick={toggle} style={{background:"gray"}}>
				{props.section['title']}
			</CardHeader>
			<Collapse isOpen={isOpen}>
				<CardBody>
					<FormGroup>
						<Label for={myid}>
							{props.item['title']}
						</Label>
						<Input
							type="text"
							name={myid}
							id={myid}
							placeholder={props.item['default']}
							readOnly
							// innerRef={props.register()}
						/>
						<FormText color="muted">
							{props.item['description']}
						</FormText>
					</FormGroup>
				</CardBody>
			</Collapse>
		</Card>
	);
}
