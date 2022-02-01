import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactJson from 'react-json-view';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

import {
	Button,
	Card, CardBody, CardHeader, CardFooter,
	Form, FormGroup, FormText, Input, Label,
	TabContent, TabPane, Nav, NavItem, NavLink
} from "reactstrap";

import {
	NumberConfigItem,
	CheckBoxConfigItem,
	ConfigAdHocItem,
	StringItems
} from './ConfigFormatItems';

import {types} from './actions/actions';

import { Spinner } from 'asab-webui';

export default function ConfigEditor(props) {
	const { register, handleSubmit, getValues, formState: { errors, isSubmitting }, reset } = useForm();
	const { t, i18n } = useTranslation();
	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	let history = useHistory();

	const [ formStruct, setFormStruct ] = useState({});
	const [ jsonValues, setJsonValues ] = useState({});

	// Retrieve the asab config url from config file
	const homeScreenImg = props.app.Config.get('brand_image').full;
	const homeScreenAlt = props.app.Config.get('title');
	const configType = props.configType;

	const [ activeTab, setActiveTab ] = useState('basic');

	const regConfigName = register("configName",
		{
			validate: {
				emptyInput: value => (getValues("configName") !== "" || getValues("configNameAdvanced") !== "") || t("ASABConfigModule|Configuration name can't be empty!"),
			}
		});
	const regConfigNameAdvanced = register("configNameAdvanced",
		{
			validate: {
				emptyInput: value => (getValues("configNameAdvanced") !== "" || getValues("configName") !== "") || t("ASABConfigModule|Configuration name can't be empty!"),
			}
		});

	// The container will be re-rendered on configType or configName change
	useEffect(() => {
		initialLoad();
	}, [ configType ]);


	// Load data and set up the data for form struct
	const initialLoad = async () => {
		let schema = undefined;
		try {
			let response = await ASABConfigAPI.get(`/type/${configType}`);
			// TODO: validate responses which are not 200
			schema = response.data;
			if (schema.result == 'FAIL') {
				props.app.addAlert("warning", t(`ASABConfig|Something went wrong! Unable to get schema`, {type: configType}));
				return;
			}
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", t(`ASABConfig|Unable to get schema. Try to reload the page`, {type: configType}));
			return;
		}


		let formStructure = {};
		let schemaProps = {};


		// TODO: handle nested patternProperties (in items)
		// Check for properties of schema
		if (schema.properties) {
			schemaProps = schema.properties;
		}

		if (schema.patternProperties) {
			await Promise.all(Object.keys(schema.patternProperties).map((sectionName, id) => {
				schemaProps[sectionName] = schema.patternProperties[sectionName];
			}))
		}

		// Data are always empty when creating a new configuration file
		formStructure["data"] = {};
		// Assign schema to form struct under properties key
		formStructure["properties"] = schemaProps;
		// Set data and properties for form struct
		setFormStruct(formStructure);
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

		let configName = activeTab == 'basic' ? data.configName : data.configNameAdvanced;
		delete data.configName; // Remove config name from the data object

		let dataParsed = {};
		if (Object.keys(data).length > 0 && typeof Object.values(data)[0] == "object") {
			await Promise.all(Object.keys(data).map(async (section, idx) => {
				let sectionName = section.substring(1);
				sectionName = sectionName + configName;
				await Promise.all(Object.keys(data[section]).map((key, idx) => {
					let sectionKey = key.replace("*$", sectionName);
					dataParsed[sectionKey] = data[section][key];
				}))
			}))
		} else {
			dataParsed = data;
		}


		// Sort data by the key name before parsing them
		const sortedData = Object.keys(dataParsed).sort().reduce((obj, key) => { obj[key] = dataParsed[key]; return obj; }, {});

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

		// TODO: Disable advanced creation of configuration if needed
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
				throw new Error(t('ASABConfig|Something went wrong, failed to create configuration'));
			}
			props.app.addAlert("success", t('ASABConfig|Configuration created successfully'));
			props.app.Store.dispatch({
				type: types.CONFIG_CREATED,
				config_created: true
			});
			history.push({
				pathname: `/config/${configType}/${configName}`
			});
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", t('ASABConfig|Something went wrong, failed to create configuration'));
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
		<React.Fragment>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Card className="card-editor-layout">
					<CardHeader>
						<span className="cil-settings pr-3" />
						{configType.toString() + ' / ' + t('ASABConfig|New')}
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
										// TODO: Disable advanced creation if needed
										// disabled
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
									<hr/>
									<h5>
										{t('ASABConfig|File name')}
									</h5>
									<FormGroup tag="fieldset" disabled={isSubmitting}>
										<Label for="configName">
											{t('ASABConfig|Configuration file name')}
										</Label>
										<Input
											type="text"
											name="configName"
											id="configName"
											innerRef={regConfigName.ref}
											onChange={regConfigName.onChange}
											onBlur={regConfigName.onBlur}
										/>
										<FormText color={errors.configName ? "danger" : "muted"}>
											{errors.configName ? errors.configName.message : t('ASABConfig|Fill out configuration file name')}
										</FormText>
									</FormGroup>
									{/* List of Sections */}
									{formStruct && formStruct.properties && Object.keys(formStruct.properties).map((section_name, idx) =>
										<ConfigSection
											key={idx}
											section={formStruct.properties[section_name]}
											sectionname={section_name}
											register={register}
											isSubmitting={isSubmitting}
										/>
									)}
									<hr/>
								</React.Fragment>
							</TabPane>
							<TabPane tabId="advanced">
								<div>
									<hr/>
									<h5>
										{t('ASABConfig|File name')}
									</h5>
									<FormGroup tag="fieldset" disabled={isSubmitting}>
										<Label for="configNameAdvanced">
											{t('ASABConfig|Configuration file name')}
										</Label>
										<Input
											type="text"
											name="configNameAdvanced"
											id="configNameAdvanced"
											innerRef={regConfigNameAdvanced.ref}
											onChange={regConfigNameAdvanced.onChange}
											onBlur={regConfigNameAdvanced.onBlur}
										/>
										<FormText color={errors.configNameAdvanced ? "danger" : "muted"}>
											{errors.configNameAdvanced ? errors.configNameAdvanced.message : t('ASABConfig|Fill out configuration file name')}
										</FormText>
									</FormGroup>
									<hr/>
									<ReactJson
										style={{zIndex:999}}
										src={jsonValues}
										onEdit={ e => { setJsonValues(e.updated_src)} }
										onDelete={ e => { setJsonValues(e.updated_src)} }
										onAdd={ e => { setJsonValues(e.updated_src)} }
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
							disabled={isSubmitting || formStruct.properties == undefined}
						>
							<i className="pr-1">+</i>
							{t('ASABConfig|Create')}
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
		</React.Fragment>

	);
}
