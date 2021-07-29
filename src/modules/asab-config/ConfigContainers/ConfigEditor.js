import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TreeMenu from 'react-simple-tree-menu';
import ReactJson from 'react-json-view';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import {
	Button,
	Card, CardBody, CardHeader, CardFooter,
	Collapse,
	Form, FormGroup, FormText, Input, Label,
	TabContent, TabPane, Nav, NavItem, NavLink
} from "reactstrap";

import {
	NumberConfigItem,
	CheckBoxConfigItem,
	ConfigAdHocItem,
	StringItems
} from './ConfigFormatItems';

import { Spinner } from 'asab-webui';

import './configuration.css';

export default function ConfigEditor(props) {

	const [ typeData, setTypeData ] = useState(undefined);
	const [ adHocValues, setAdHocValues ] = useState({});
	const [ adHocSections, setAdHocSections ] = useState({});
	const { register, handleSubmit, setValue, getValues, errors, reset } = useForm();

	let App = props.app;
	// Retrieve the asab config url from config file
	const ASABConfigAPI = App.axiosCreate('asab_config');
	const { t, i18n } = useTranslation();
	const homeScreenImg = App.Config.get('brand_image').full;
	const homeScreenAlt = App.Config.get('title');
	const configType = props.configType;
	const configName = props.configName;
	const [ configNotExist, setConfigNotExist ] = useState(false);
	const [ jsonValues, setJsonValues] = useState({});
	const [activeTab, setActiveTab] = useState('basic');


	useEffect(() => {
		initialLoad();
	},[ configType, configName ]); // The container will be re-rendered on configType or configName change


	const initialLoad = async () => {
		let values = undefined;
		let type = undefined;
		setConfigNotExist(false);

		try {
			let response = await ASABConfigAPI.get("/type/" + configType);
			// TODO: validate responses which are not 200
			type = response.data;
			if (type.result == 'FAIL') {
				App.addAlert("warning", t(`ASABConfig|Something went wrong! Unable to get data`, {type: configType}));
				return;
			} else {
				setTypeData(type);
			}
		}
		catch(e) {
			console.log(e);
			App.addAlert("warning", t(`ASABConfig|Unable to get type data. Try to reload the page`, {type: configType}));
			return;
		}


		reset({}); // Reset form on config change
		try {
			let response = await ASABConfigAPI.get("/config/" + configType + "/" + configName + "?format=json");
			values = response.data;
			// TODO: validate responses which are not 200
		}
		catch(e) {
			console.log(e);
			App.addAlert("warning", t(`ASABConfig|Unable to get config data. Try to reload the page`, {config: configName}));
			return;
		}

		// // MOCKED DATA
		// values = {
		// 	'asab:docker': {
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

		if (values && Object.keys(values).length >= 0 && values.result != "FAIL") {
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
			setAdHocSections(ahSections);
			setJsonValues(values);
		} else {
			App.addAlert("warning", t(`ASABConfig|Config file does not exist`));
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

		if (activeTab == 'advanced') {
			// If data are being submitted from JSON view, dont parse data to object
			parsedSections = jsonValues;
		} else {
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
		}

		try {
			// TODO: make config dynamic value
			let response = await ASABConfigAPI.put("/config/" + configType + "/" + configName,
				JSON.parse(JSON.stringify(parsedSections)),
					{ headers: {
						'Content-Type': 'application/json'
						}
					}
				)
			if (response.data.result == "OK"){
				App.addAlert("success", t('ASABConfig|Data updated successfuly'));
				initialLoad(); // Load the new data after saving
			}
			// TODO: validate responses which are not 200
		}
		catch {
			App.addAlert("warning", t('ASABConfig|Something went wrong'));
			return;
		}
	}

	// Swith between the tabs
	const toggle = tab => {
		if(activeTab !== tab) setActiveTab(tab);
	}

	return (
		!typeData ?
			<div style={{paddingTop: "100px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
				<Spinner />
			</div>
		:
		configNotExist ?
			<ConfigMessageCard
				homeScreenImg={homeScreenImg}
				homeScreenAlt={homeScreenAlt}
				purposeTitle={t("ASABConfig|Config file does not exist")}
				purposeSubtitle={t("ASABConfig|We are sorry, but the file cannot be found")}
			/>
		:
			<React.Fragment>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Card className="card-editor-layout">
						<CardHeader>
							<span className="cil-settings pr-3" />
							{configName ? configType.toString() + ' / ' + configName.toString() : ""}
							<div className="float-right">
								<Nav tabs>
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === 'basic' })}
											onClick={() => { toggle('basic'); }}
										>
											{t('ASABConfig|Basic')}
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === 'advanced' })}
											onClick={() => { toggle('advanced'); }}
										>
											{t('ASABConfig|Advanced')}
										</NavLink>
									</NavItem>
								</Nav>
							</div>
						</CardHeader>
						<CardBody className="card-editor-body">
							<TabContent style={{border: "none"}} activeTab={activeTab}>
								<TabPane tabId="basic">
									<React.Fragment>
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
										<hr className="config-hr"/>
									</React.Fragment>
								</TabPane>
								<TabPane tabId="advanced">
									<ReactJson
										src={jsonValues}
										onEdit={ e => { setJsonValues(e.updated_src)} }
										enableClipboard={false}
										name={false}
									/>
								</TabPane>
							</TabContent>
						</CardBody>
						<CardFooter>
							<Button
								color="primary"
								type="submit"
							>
								{t('ASABConfig|Save')}
							</Button>
						</CardFooter>
					</Card>
				</Form>
			</React.Fragment>
	);
}


function ConfigSection(props) {
	return (
		<React.Fragment>
			<hr className="config-hr"/>
			<h5>
				{props.section['title']}
			</h5>
			{Object.keys(props.section.properties).map((item_name, idx) =>
				// Decide what type of config item to render based on format
				// TODO: Update also other RADIO and SELECT types
				{switch(props.section.properties[item_name]['type']){
					case 'string': return(<StringItems
											key={idx}
											item={props.section.properties[item_name]}
											itemname={item_name}
											sectionname={props.sectionname}
											register={props.register}
											defs={props.section.properties[item_name]['$defs']}
										/>)
					case 'number': return(<NumberConfigItem
											key={idx}
											item={props.section.properties[item_name]}
											itemname={item_name}
											sectionname={props.sectionname}
											register={props.register}
											defs={props.section.properties[item_name]['$defs']}
										/>)
					case 'integer': return(<NumberConfigItem
											key={idx}
											item={props.section.properties[item_name]}
											itemname={item_name}
											sectionname={props.sectionname}
											register={props.register}
											defs={props.section.properties[item_name]['$defs']}
										/>)
					case 'boolean': return(<CheckBoxConfigItem
											key={idx}
											item={props.section.properties[item_name]}
											itemname={item_name}
											sectionname={props.sectionname}
											register={props.register}
										/>)
					default: return(<StringItems
										key={idx}
										item={props.section.properties[item_name]}
										itemname={item_name}
										sectionname={props.sectionname}
										register={props.register}
										defs={props.section.properties[item_name]['$defs']}
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
		</React.Fragment>

	);
}


function ConfigAdHocSection(props) {
	const { t, i18n } = useTranslation();
	let myid = props.sectionname;
	return (
		<React.Fragment>
			<hr className="config-hr"/>
			<h5>
				{myid}
			</h5>
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
							{t('ASABConfig|Read only')}
						</FormText>
					</FormGroup>
				)}
			)}
		</React.Fragment>
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
