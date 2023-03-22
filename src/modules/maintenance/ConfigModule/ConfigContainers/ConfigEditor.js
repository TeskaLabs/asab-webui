import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactJson from 'react-json-view';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import {
	Button,
	Card, CardBody, CardHeader, CardFooter,
	Form, FormGroup, FormText, Input, Label,
	TabContent, TabPane, Nav, NavItem, NavLink,
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Row, Col, ButtonGroup
} from "reactstrap";

import {
	NumberConfigItem,
	CheckBoxConfigItem,
	ConfigAdHocItem,
	StringItems
} from './ConfigFormatItems';

import {types} from './actions/actions';

import { Spinner, ButtonWithAuthz } from 'asab-webui';

function ConfigEditor(props) {
	const { register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting }, reset, resetField } = useForm();
	const { t, i18n } = useTranslation();
	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	let history = useHistory();

	const [ adHocValues, setAdHocValues ] = useState({});
	const [ adHocSections, setAdHocSections ] = useState({});
	const [ formStruct, setFormStruct ] = useState({});
	const [ jsonValues, setJsonValues ] = useState({});

	// States for schema sections
	const [ selectPatternSections, setSelectPatternSections ] = useState([]);
	const [ patternPropsSchema, setPatternPropsSchema ] = useState({});

	// Retrieve the asab config url from config file
	const homeScreenImg = props.app.Config.get('brand_image').full;
	const homeScreenAlt = props.app.Config.get('title');
	const configType = props.configType;
	const configName = props.configName;

	const [ configNotExist, setConfigNotExist ] = useState(false);
	const [ activeTab, setActiveTab ] = useState('basic');

	const resourceManageConfig = "config:admin";
	const resources = useSelector(state => state.auth?.resources);
	const theme = useSelector(state => state?.theme);

	// Pattern props dropdown
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

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
		// Set selected pattern sections to empty
		setSelectPatternSections([]);

		let prevValues = getValues();
		(prevValues && Object.keys(prevValues).length > 0) && Object.keys(prevValues).map((key, idx) => {
			resetField(key);
		})

		try {
			let response = await ASABConfigAPI.get(`/type/${configType}`);
			// TODO: validate responses which are not 200
			if (response.data.result != 'OK') {
				throw new Error("Something went wrong! Unable to get schema")
			}
			schema = response.data.data;
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", `${t("ASABConfig|Unable to get schema. Try to reload the page", {type: configType})}. ${e?.response?.data?.message}`, 30);
			return;
		}

		try {
			let response = await ASABConfigAPI.get(`/config/${configType}/${configName}?format=json`);
			if (response.data.result != "OK") {
				props.app.addAlert("warning", `${t("ASABConfig|Config file does not exist")}. ${e?.response?.data?.message}`, 30);
				setConfigNotExist(true);
				return;
			}
			values = response.data.data;
			// TODO: validate responses which are not 200
		}
		catch(e) {
			// Set the states to initial state on failed response to clear the inputs
			setFormStruct({});
			setAdHocValues({});
			setAdHocSections({});
			setJsonValues({});
			console.error(e);
			props.app.addAlert("warning", `${t("ASABConfig|Unable to get config data. Try to reload the page", {type: configName})}. ${e?.response?.data?.message}`, 30);
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
			// Handle only pattern properties with data
			if (values && Object.keys(values).length > 0) {
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

			// Trim pattern props section names and push it to array to use it in the selector for adding a new empty config section
			let patternSections = [];
			await Promise.all(Object.keys(schema.patternProperties).map((sectionName, idx) => {
				let sectionTrimmed = sectionName.substring(1).replace(":.*$", "");
				patternSections.push(sectionTrimmed);
			}))
			setSelectPatternSections(patternSections);
			setPatternPropsSchema(schema.patternProperties);
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

		/*
			Set empty values for empty configuration (it will remove old values
			from forms when config is completelly empty and which reset is not able
			to remove)
		*/
		if (formStruct.properties && formStruct.data && Object.keys(formStruct.data).length == 0) {
			Object.keys(formStruct.properties).map((key, idx) => {
				if (formStruct.properties[key].properties) {
					Object.keys(formStruct.properties[key].properties).map((k, i) => {
						setValue(`${key} ${k}`, "");
					})
				}
			})
		}

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
		// Get parsed sections for submit
		let parsedSections = await getParsedSections(data);

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
			props.app.addAlert("success", t('ASABConfig|Data updated successfully'));
			initialLoad(); // Load the new data after saving
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", `${t("ASABConfig|Something went wrong, failed to update data")}. ${e?.response?.data?.message}`, 30);
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

	// Confirm message form for config section removal
	const removeSectionForm = (sectionTitle) => {
		var r = confirm(t("ASABConfig|Do you want to remove this section?"));
		if (r == true) {
			removeSection(sectionTitle);
		}
	}

	// TODO: Unify the code with onSubmit, that it does not repeat itself
	// Remove config section
	const removeSection = async (sectionTitle) => {
		let data = getValues();
		// Get parsed section for removal section
		let parsedSections = await getParsedSections(data);

		// Remove section out of data and save result
		delete parsedSections[sectionTitle]

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
			props.app.addAlert("success", t('ASABConfig|Data updated successfully'));
			initialLoad(); // Load the new data after saving
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", t("ASABConfig|Something went wrong, failed to update data", {error: e?.response?.data?.message}), 30);
			initialLoad();
			return;
		}
	}

	// Add new section out of pattern properties section list
	const addNewSection = async (selectedSection) => {
		let section = selectedSection;
		let properties = formStruct.properties;
		let cnt = 1;
		let selectedProperties = {};
		await Promise.all(Object.keys(properties).map((sectionName, idx) => {
			if (sectionName.match(section) != null) {
				cnt += 1;
				selectedProperties = properties[sectionName];
			}
		}))

		let formStructure = formStruct;
		if (cnt == 1) {
			// If section not present in the configuration, use schema obtained from the service
			await Promise.all(Object.keys(patternPropsSchema).map(async (sectionName, id) => {
				if (sectionName.match(section) != null) {
					formStructure["properties"][`${section}:${cnt}`] = patternPropsSchema[sectionName];
				}
			}))
		} else {
			// If section already present in the configuration, use its schema props
			let newSection = `${section}:${cnt}`;
			// Check if there is a section of the same name in the configuration
			await Promise.all(Object.keys(properties).map(async (sectionName, id) => {
				// If there is a section of the same name in the config, add a random string to new section
				if (sectionName === newSection) {
					let randomString = Math.random().toString(36).substr(2, 1);
					newSection = newSection + randomString;
				}
			}))
			formStructure["properties"][newSection] = selectedProperties;
		}

		props.app.addAlert("success", t('ASABConfig|Section added'));
		// Update form struct and call setValues function to load data
		setFormStruct(formStructure);
		setValues();
	}

	// Function for obtaining parsed sections
	const getParsedSections = async (data) => {
		// Get 'type' of the values (if defined) from the schema
		let formStructProperties = formStruct.properties;
		let sectionTypes = {};
		// Iterate through sections
		if (Object.keys(formStructProperties).length > 0) {
			await Promise.all(Object.keys(formStructProperties).map(async (sect, idx) => {
				let valueTypes = {};
				// Iterate through section keys
				await Promise.all(Object.keys(formStructProperties[sect]).length > 0 && Object.keys(formStructProperties[sect]).map(async (key, id) => {
					if (key === "properties") {
						// Iterate through key properties
						await Promise.all(Object.entries(formStructProperties[sect]["properties"]).map((entry, i) => {
							// If type of the value is undefined, then default is string
							valueTypes[entry[0]] = entry[1].type ? entry[1].type : "string";
						}));
					}
				}));
				sectionTypes[sect] = valueTypes;
			}));
		}

		let parsedSections = {};
		// TODO: Disable saving output from ReactJSONview component
		if (activeTab == 'advanced') {
			// If data are being submitted from JSON view, dont parse data to object
			parsedSections = jsonValues;
		} else {
			let splitKey = "";
			let sectionTitle = "";
			let sectionKey = "";
			let sectionValue = "";
			// Parse data to object
			await Promise.all(Object.keys(data).map((key, idx) => {
				splitKey = key.split(" ");
				sectionTitle = splitKey[0];
				sectionKey = splitKey[1];
				sectionValue = data[key];
				// Parsing
				let obj = {};
				if (sectionTypes[sectionTitle] == undefined) {
					// Values of adHoc sections
					obj[sectionKey] = sectionValue;
					parsedSections[sectionTitle] = {...parsedSections[sectionTitle], ...obj};
				} else {
					let valueType = sectionTypes[sectionTitle][sectionKey];
					obj[sectionKey] = convertValueType(sectionValue, valueType);
					parsedSections[sectionTitle] = {...parsedSections[sectionTitle], ...obj};
				}
			}));
		}
		return parsedSections;
	}

	// Convert pattern section name for Add button from technical name to Title of the section defined in schema
	const sectionNameString = (patternpropsSchema, patternSection) => {
		let patternKey = Object.keys(patternPropsSchema) ? Object.keys(patternPropsSchema).filter(key => key.match(patternSection)) : "";
		let returnString = patternSection;
		Object.keys(patternPropsSchema) && Object.keys(patternPropsSchema).map((key,idx) => {
			if (patternKey[0] == key) {
				returnString = patternPropsSchema[key]?.title ? patternPropsSchema[key]?.title : patternSection;
			}
		})
		return returnString;
	}

	if (configNotExist) {
		return (
			<ConfigMessageCard
				homeScreenImg={homeScreenImg}
				homeScreenAlt={homeScreenAlt}
				purposeTitle={t("ASABConfig|Config file does not exist")}
				purposeSubtitle={t("ASABConfig|We are sorry, but the file cannot be found")}
			/>
		)
	}

	// TODO: add Content loader when available as a component in ASAB WebUI
	return (
			<Card className="card-editor-layout">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<CardHeader className="border-bottom">
						<div className="card-header-title">
							<span className="cil-settings pr-2" />
							{configName ? configType.toString() + ' / ' + configName.toString() : ""}
						</div>
						{/* TODO: Replace div.float-right with ButtonGroup */}
						<ButtonGroup className="p-1">
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
						</ButtonGroup>
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
											removeSectionForm={removeSectionForm}
											selectPatternSections={selectPatternSections}
											resources={resources}
											resourceManageConfig={resourceManageConfig}
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
								<div>
									<ReactJson
										theme={theme === 'dark' ? "chalk" : "rjv-default"}
										src={jsonValues}
										onEdit={ e => { setJsonValues(e.updated_src)} }
										enableClipboard={false}
										name={false}
									/>
								</div>
							</TabPane>
						</TabContent>
					</CardBody>
					<CardFooter>
						<ButtonGroup>
							<ButtonWithAuthz
								outline
								title={t("ASABConfig|Save")}
								color="primary"
								type="submit"
								disabled={isSubmitting}
								resource={resourceManageConfig}
								resources={resources}
							>
								{t('ASABConfig|Save')}
							</ButtonWithAuthz>
						</ButtonGroup>
						{selectPatternSections.length > 0 &&
							<span className="float-right">
							<Dropdown
								direction="up"
								isOpen={dropdownOpen}
								toggle={toggleDropDown}
								title={t('ASABConfig|Add new section')}
							>
								<DropdownToggle caret outline color="primary">
									{t('ASABConfig|Add')}
								</DropdownToggle>
								<DropdownMenu
									className="pattern-section-dropdown"
								>
									{selectPatternSections.map((patternSection, idx) => {
										return(
											<DropdownItem
												key={idx}
												name={patternSection}
												onClick={(e) => {addNewSection(patternSection), e.preventDefault()}}
											>
												{sectionNameString(patternPropsSchema, patternSection)}
											</DropdownItem>
											)
									})}
								</DropdownMenu>
							</Dropdown>
						</span>
						}
					</CardFooter>
				</Form>
			</Card>
	);
}

export default ConfigEditor;


function ConfigSection(props) {
	const { t, i18n } = useTranslation();
	return (
		<React.Fragment>
			<hr/>
			<Row>
				<Col>
					<h5>
						{props.section['title']}
					</h5>
				</Col>
				<Col>
					<div className="float-right">
						{props.selectPatternSections.length > 0 &&
							<ButtonWithAuthz
								title={t('ASABConfig|Remove')}
								color="danger"
								outline
								size="sm"
								type="button"
								onClick={(e) => {props.removeSectionForm(props.sectionname)}}
								disabled={props.isSubmitting}
								resource={props.resourceManageConfig}
								resources={props.resources}
							>
								<i className="cil-trash"></i>
							</ButtonWithAuthz>
						}
					</div>
				</Col>
			</Row>
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
