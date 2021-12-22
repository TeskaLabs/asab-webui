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

export default function ConfigEditor(props) {
	const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm();
	const { t, i18n } = useTranslation();
	const ASABConfigAPI = props.app.axiosCreate('asab_config');

	const [ adHocValues, setAdHocValues ] = useState({});
	const [ adHocSections, setAdHocSections ] = useState({});
	const [ formStruct, setFormStruct ] = useState({});
	const [ jsonValues, setJsonValues ] = useState({});

	// Retrieve the asab config url from config file
	const homeScreenImg = props.app.Config.get('brand_image').full;
	const homeScreenAlt = props.app.Config.get('title');
	const configType = props.configType;
	const configName = props.configName;

	const [ configNotExist, setConfigNotExist ] = useState(false);
	const [ activeTab, setActiveTab ] = useState('basic');

	// The container will be re-rendered on configType or configName change
	useEffect(() => {
		initialLoad();
	}, [ configType, configName ]);

	// Set values based on form struct
	useEffect(() => {
		if (Object.keys(formStruct).length > 0) {
			setValues();
		}
	}, [formStruct])

	// Load data and set up the data for form struct
	const initialLoad = async () => {
		let values = undefined;
		let schema = undefined;
		setConfigNotExist(false);

		try {
			let response = await ASABConfigAPI.get(`/type/${configType}`);
			// TODO: validate responses which are not 200
			schema = response.data;
			if (schema.result == 'FAIL') {
				props.app.addAlert("warning", t(`ASABConfig|Something went wrong! Unable to get data`, {type: configType}));
				return;
			}
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", t(`ASABConfig|Unable to get type data. Try to reload the page`, {type: configType}));
			return;
		}

		try {
			let response = await ASABConfigAPI.get(`/config/${configType}/${configName}?format=json`);
			values = response.data;
			if (values.result == "FAIL") {
				props.app.addAlert("warning", t(`ASABConfig|Config file does not exist`));
				setConfigNotExist(true);
				return;
			}
			// TODO: validate responses which are not 200
		}
		catch(e) {
			// Set the states to initial state on failed response to clear the inputs
			setFormStruct({});
			setAdHocValues({});
			setAdHocSections({});
			setJsonValues({});
			console.error(e);
			props.app.addAlert("warning", t(`ASABConfig|Unable to get config data. Try to reload the page`, {config: configName}));
			return;
		}

		let formStructure = {};
		let schemaProps = {};
		let sectionKeyData = {};
		let ahValues = {};
		let ahSections = values;

		// TODO: handle nested patternProperties (in items)
		// Check for properties of schema
		if (schema.properties) {
			schemaProps = schema.properties;
			await Promise.all(values && Object.keys(values).map(async (section, idx) => {
				await Promise.all(Object.keys(schema.properties).map(async (sectionName, id) => {
					if (section == sectionName) {
						let arrAHValues = [];
						await Promise.all(Object.keys(values[section]).map(async (key, id) => {
							sectionKeyData[`${section} ${key}`] = values[section][key];

							// Check for adHoc values in properties of section
							if (schemaProps[`${section}`].properties) {
								// Add empty string to keys, which are not present in configuration, but key is present in schema
								await Promise.all(Object.keys(schemaProps[`${section}`].properties).map((schemaKey, i) => {
									if (Object.keys(values[section]).indexOf(schemaKey) == -1) {
										sectionKeyData[`${section} ${schemaKey}`] = "";
									}
								}));
								// Check if key exist in schema and if not, add it to adHoc values
								if (schemaProps[`${section}`].properties[`${key}`] == undefined) {
									let v = {};
									v[key] = values[section][key];
									arrAHValues.push(v);
									ahValues[`${section}`] = arrAHValues;
								}
							}
						}));
						// Mutate adHoc section based on the matching sections
						// If section name match with schema, then remove it from adHoc sections (it is also removed for submit)
						ahSections = Object.assign({}, ahSections);
						delete ahSections[section];
					}
				}));
			}));
		}

		// TODO: handle nested patternProperties (in items)
		// Check for pattern properties of schema
		if (schema.patternProperties) {
			await Promise.all(values && Object.keys(values).map(async (section, idx) => {
				await Promise.all(Object.keys(schema.patternProperties).map(async (sectionName, id) => {
					// Check for matching section name
					if (section.match(sectionName) != null) {
						// If matched, then add schema to schema props
						schemaProps[`${section}`] = schema.patternProperties[sectionName];
						let arrAHValues = [];
						await Promise.all(Object.keys(values[section]).map(async (key, i) => {
							// Add data for section
							sectionKeyData[`${section} ${key}`] = values[section][key];

							// Check for adHoc values in properties of section
							if (schemaProps[`${section}`].properties) {
								// Add empty string to keys, which are not present in configuration, but key is present in schema
								await Promise.all(Object.keys(schemaProps[`${section}`].properties).map((schemaKey, i) => {
									if (Object.keys(values[section]).indexOf(schemaKey) == -1) {
										sectionKeyData[`${section} ${schemaKey}`] = "";
									}
								}));
								// Check if key exist in schema and if not, add it to adHoc values
								if (schemaProps[`${section}`].properties[`${key}`] == undefined) {
									let v = {};
									v[key] = values[section][key];
									arrAHValues.push(v);
									ahValues[`${section}`] = arrAHValues;
								}
							}
						}));
						// Mutate adHoc section based on the matching sections
						// If section name match with schema, then remove it from adHoc sections (it is also removed for submit)
						ahSections = Object.assign({}, ahSections);
						delete ahSections[section];
					}
				}));
			}));
		}

		// Set values for JSON view
		setJsonValues(values);
		// Set data for adHoc sections
		setAdHocSections(ahSections);
		// Set data for adHoc values
		setAdHocValues(ahValues);

		// Assign sectionKeyData to form struct under data key
		formStructure["data"] = sectionKeyData;
		// Assign schema to form struct under properties key
		formStructure["properties"] = schemaProps;
		// Set data and properties for form struct
		setFormStruct(formStructure);
	}


	// Set values from form struct and adHoc sections
	const setValues = () => {
		// Reset old values before setting new values to prevent unintended data submitting
		reset({});
		// Set values from form struct for registration and submitting
		if (formStruct.data) {
			Object.entries(formStruct.data).map((entry, idx) => {
				setValue(`${entry[0]}`, entry[1]);
			});
		}
		// Set adHoc sections for submitting
		if (adHocSections) {
			Object.keys(adHocSections).map((section, idx) => {
				Object.keys(adHocSections[section]).map((key, id) => {
					setValue(`${section} ${key}`, adHocSections[section][key]);
				});
			});
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

		// Sort data by the key name before parsing them
		const sortedData = Object.keys(data).sort().reduce((obj, key) => { obj[key] = data[key]; return obj; }, {});

		// Get 'type' of the values (if defined) from the schema
		let formStructProperties = formStruct.properties;
		let sectionTypes = {};
		// Iterate through sections
		await Promise.all(Object.keys(formStructProperties).length > 0 && Object.keys(formStructProperties).map(async (section, idx) => {
			let valueTypes = {};
			// Iterate through section keys
			await Promise.all(Object.keys(formStructProperties[section]).length > 0 && Object.keys(formStructProperties[section]).map(async (key, id) => {
				if (key === "properties") {
					// Iterate through key properties
					await Promise.all(Object.entries(formStructProperties[section]["properties"]).map((entry, i) => {
						// If type of the value is undefined, then default is string
						valueTypes[entry[0]] = entry[1].type ? entry[1].type : "string";
					}));
				}
			}));
			sectionTypes[section] = valueTypes;
		}));

		// TODO: Disable saving output from ReactJSONview component
		if (activeTab == 'advanced') {
			// If data are being submitted from JSON view, dont parse data to object
			parsedSections = jsonValues;
		} else {
			// Parse data to object
			await Promise.all(Object.keys(sortedData).map((key, idx) => {
				splitKey = key.split(" ");
				sectionTitle = splitKey[0];
				sectionKey = splitKey[1];
				sectionValue = sortedData[key];
				if (prevSection == sectionTitle) {
					if (sectionTypes[sectionTitle] == undefined) {
						// Values of adHoc sections
						section[sectionKey] = sectionValue;
					} else {
						let valueType = sectionTypes[sectionTitle][sectionKey];
						section[sectionKey] = convertValueType(sectionValue, valueType);
					}
				} else {
					section = {};
					if (sectionTypes[sectionTitle] == undefined) {
						// Values of adHoc sections
						section[sectionKey] = sectionValue;
					} else {
						let valueType = sectionTypes[sectionTitle][sectionKey];
						section[sectionKey] = convertValueType(sectionValue, valueType);
					}
				}

				prevSection = sectionTitle;
				parsedSections[sectionTitle] = section;
			}));
		}

		try {
			let response = await ASABConfigAPI.put(`/config/${configType}/${configName}`,
				JSON.parse(JSON.stringify(parsedSections)),
					{ headers: {
						'Content-Type': 'application/json'
						}
					}
				)
			if (response.data.result != "OK"){
				throw new Error(t('ASABConfig|Something went wrong, failed to update data'));
			}
			props.app.addAlert("success", t('ASABConfig|Data updated successfuly'));
			initialLoad(); // Load the new data after saving
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", t('ASABConfig|Something went wrong, failed to update data'));
			initialLoad();
			return;
		}
	}

	// Swith between the tabs
	const toggle = tab => {
		if(activeTab !== tab) setActiveTab(tab);
	}

	// Function to convert value types from string
	function convertValueType(sectionValue, valueType) {
		/*
			Conversion based on
			https://json-schema.org/understanding-json-schema/reference/type.html
		*/
		let value;
		// Check number type values
		if (valueType == "number" ||
			valueType == "integer" ||
			valueType == "float" ||
			valueType == "null" ||
			valueType == "boolean") {
			// If value is an empty string, then return undefined (to prevent parsing failures)
			if (sectionValue === "") {
				value = value;
			} else {
				value = JSON.parse(sectionValue);
			}
		}
		// Check for array type values
		else if (valueType == "array") {
			// If value is an empty string, then return undefined (to prevent parsing failures)
			if (sectionValue === "") {
				value = value;
			} else {
				value = sectionValue.toString().split(",");
			}
		}
		// Check for object type values
		else if (valueType == "object") {
			// If value is an empty string, then return undefined (to prevent parsing failures)
			if (sectionValue === "") {
				value = value;
			} else {
				value = JSON.parse(JSON.stringify(sectionValue));
			}
		}
		// If not match any of the types, return default (string). This apply also for adHoc values of sections
		else {
			value = sectionValue;
		}
		return value;
	}

	// TODO: add Content loader when available as a component in ASAB WebUI
	return (
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
										{formStruct && formStruct.properties && Object.keys(formStruct.properties).map((section_name, idx) =>
											<ConfigSection
												key={idx}
												section={formStruct.properties[section_name]}
												sectionname={section_name}
												register={register}
												adhocvalues={adHocValues}
												isSubmitting={isSubmitting}
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
										<hr/>
									</React.Fragment>
								</TabPane>
								<TabPane tabId="advanced">
									<div style={{overflow: "auto"}}>
										<ReactJson
											src={jsonValues}
											// TODO: Editing in JSON values is disabled because users can mess with the value types
											// onEdit={ e => { setJsonValues(e.updated_src)} }
											enableClipboard={false}
											name={false}
										/>
									</div>
								</TabPane>
							</TabContent>
						</CardBody>
						<CardFooter>
							<Button
								color="primary"
								type="submit"
								disabled={isSubmitting}
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
			<hr/>
			<h5>
				{props.section['title']}
			</h5>
			<FormGroup tag="fieldset" disabled={props.isSubmitting}>
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
			</FormGroup>
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
			<hr/>
			<h5>
				{myid}
			</h5>
			{Object.keys(props.values).length > 0 && Object.keys(props.values).map((key, idx) =>
				{
				return (
					<FormGroup key={idx}>
						<Label for={myid}>
							{key}
						</Label>
						<Input
							type="text"
							name={myid}
							id={myid}
							value={props.values[key]}
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
