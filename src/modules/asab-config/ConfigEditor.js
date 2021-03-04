import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TreeMenu from 'react-simple-tree-menu';

import {
	Button,
	Card, CardBody, CardHeader,
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
	ConfigAdHocItem,
} from './ConfigFormatItems';


export default function ConfigEditor(props) {

	const [ typeData, setTypeData ] = useState(undefined);
	const [ adHocValues, setAdHocValues ] = useState({});
	const [ adHocSections, setAdHocSections ] = useState({});
	const { register, handleSubmit, setValue, getValues, errors, reset } = useForm();

	let App = props.app;
	// Retrieve the asab config url from config file
	const Axios = App.axiosCreate('asab_config');

	const homeScreenImg = App.Config.get('brand_image').full;
	const homeScreenAlt = App.Config.get('title');
	const configType = props.configType;
	const configName = props.configName;
	const [ configNotExist, setConfigNotExist ] = useState(false);


	useEffect(() => {
		initialLoad();
	},[ configType, configName ]); // The container will be re-rendered on configType or configName change


	const initialLoad = async () => {
		let values = undefined;
		let type = undefined;
		setConfigNotExist(false);

		try {
			let response = await Axios.get("/type/" + configType);
			type = response.data;
			setTypeData(type);
			// TODO: validate responses which are not 200
		}
		catch {
			App.addAlert("warning", `Unable to get ${configType} data. Try to reload the page.`);
			return;
			// TODO: Prepared for i18n
			// App.addAlert("warning", t(`Unable to get ${typeId} data: `, { error: error.toString() }));
		}


		reset({}); // Reset form on config change
		try {
			let response = await Axios.get("/config/" + configType + "/" + configName + "?format=json");
			values = response.data;
			// TODO: validate responses which are not 200
		}
		catch {
			App.addAlert("warning", `Unable to get config ${configName} data. Try to reload the page.`);
			return;
			// TODO: Prepared for i18n
			// App.addAlert("warning", t(`Unable to get config data: `, { error: error.toString() }));
		}

		// // MOCKED DATA
		// values = {
		// 	'asab:storage': {
		// 		'type': "fool",
		// 		'meky': 'zbirka'
		// 	},
		// 	'general': {
		// 		'uid': "123",
		// 		'ahoj1': 'jdasj',
		// 		'paskal': 'kopytho'
		// 	},
		// 	'admiral': {
		// 		'papillon': "666",
		// 	},
		// };

		if (values && Object.keys(values).length > 0 && values != "CONFIG FILE DOESNT EXISTS") {
			let ahValues = {};
			let ahSections = {};
			for (var section in values) {
				let arrValues = [];
				let arrSections = [];
				for (var key in values[section]) {
					// Set config values to the schema (if available)
					setValue('['+section + "] " + key, values[section][key], { shouldValidate: false })
					// Check if config key values are in schema and if not, add it to adhoc values
					let s = {};
					let v = {};
					if (type?.properties[section] == undefined) {
						s[key] = values[section][key];
						arrSections.push(s);
						ahSections[section] = arrSections;
					} else if (type?.properties[section]?.properties[key] == undefined) {
						v[key] = values[section][key];
						arrValues.push(v);
						ahValues[section] = arrValues;
					}
				}
			}
			setAdHocValues(ahValues);
			setAdHocSections(ahSections)
		} else {
			App.addAlert("warning", `Config file does not exists.`);
			setConfigNotExist(true);
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
			if (response.data.result == "OK"){
				App.addAlert("success", 'Data updated successfuly.');
			}
			// TODO: validate responses which are not 200
		}
		catch {
			App.addAlert("warning", 'Something went wrong.');
			return;
		}
	}

	return (
		!typeData ?
			<ConfigMessageCard
				homeScreenImg={homeScreenImg}
				homeScreenAlt={homeScreenAlt}
				purposeTitle="Please wait"
				purposeSubtitle="Content is being loaded"
			/>
		:
		configNotExist ?
			<ConfigMessageCard
				homeScreenImg={homeScreenImg}
				homeScreenAlt={homeScreenAlt}
				purposeTitle="Config file does not exist!"
				purposeSubtitle="We are sorry, but the file cannot be found :-("
			/>
		:
			<React.Fragment>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Card style={{marginBottom: "0.25em"}}>
						<div style={{margin: "0.5em"}}>
							<div className="float-left">
								<h5 style={{paddingTop: "0.35em"}}>{configName ? configType.toString() + ' / ' + configName.toString() : ""}</h5>
							</div>
							<div className="float-right">
								<Button
									color="primary"
									type="submit"
								>
									Save
								</Button>
							</div>
						</div>
					</Card>

					{/* List of Sections (it may consist also of AdHocValues) */}
					{typeData && typeData.properties && Object.keys(typeData.properties).map((section_name, idx) =>
						<ConfigSection
							key={idx}
							section={typeData.properties[section_name]}
							sectionname={section_name}
							register={register}
							adhocvalues={adHocValues}
						/>
					)}

					{/* List all remaining sections e.g. AdHocSections */}
					{Object.keys(adHocSections).length > 0 && Object.keys(adHocSections).map((section_name, idx) =>
						<ConfigAdHocSection
							key={idx}
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

					{/* List all remaining key/values (aka AdHocValues) from a config as simple Config Item  */}
					{Object.keys(props.adhocvalues).length > 0 && Object.keys(props.adhocvalues).map((value_name, idx) =>
						{return(props.sectionname == value_name ?
							<ConfigAdHocItem
								key={idx}
								valuename={value_name}
								values={props.adhocvalues[value_name]}
							/>
						: null
						)}
					)}

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

// This component returns a pre-defined messages
function ConfigMessageCard(props) {
	return(
		<Card>
			<CardBody className="text-center">
				<img
					src={props.homeScreenImg}
					alt={props.homeScreenAlt}
					style={{maxWidth: "38%"}}
				/>
				<h3>{props.purposeTitle}</h3>
				<h5>{props.purposeSubtitle}</h5>
			</CardBody>
		</Card>)
}
