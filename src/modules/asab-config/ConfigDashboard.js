import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactJson from 'react-json-view';
import { useForm } from "react-hook-form";
import {
	Container,
	Col, Row,
	Button,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardBody, CardHeader, CardFooter, CardTitle, CardSubtitle,
	Form, FormGroup, Input, Label
} from "reactstrap";

export default function ConfigDashboard(props) {

	const {handleSubmit, register, errors, getValues} = useForm({});

	let App = props.app;
	let Config = App.Config;
	let url = undefined;
	let history = useHistory();

	// To make it right, I should take just  what is inside "properties" on every level and display it
	// * list of main properties (dropdown/tree) - e.g. asab:storage, general, etc.
	// 	* after a click on some property, it should reveal the properties of this property and display them
	// 	* title and description should be editable and I should also allow to change the type
	// 	* Everything should be displayed in different levels
	// * I should get rid of JSON schema


	const [ data, setData ] = useState([]);
	const [ paramData, setParamData ] = useState([]);
	const [ schema, setSchema ] = useState([]);
	const [ selectedSchema, setSelectedSchema ] = useState({});
	const [ updated, setUpdated ] = useState(false);

	const [ displaySchemeKey, setDisplaySchemeKey ] = useState(false);
	const [ prevDisplay, setPreviousDisplay ] = useState(displaySchemeKey);
	const toggleDisplay = () => setDisplaySchemeKey(!displaySchemeKey);


	// Retrieve the ASAB_CONFIG_URL from config file
	if (!Config?.get('ASAB_CONFIG_URL')) {
		url = url;
		App.addAlert("warning", 'Unable to load the data. `ASAB_CONFIG_URL` is not defined.')
	} else {
		url = Config.get('ASAB_CONFIG_URL');
	}

	useEffect(() => {
		getData();
	},[]);

	useEffect(() => {
		Promise.all(data.map(async type => {
			await getParameterData(type);
		}))
	}, [data])

	// Obtain the overall dataset
	const getData = () => {
		if (url) {
			let Axios = App.axiosCreate(url);
			Axios.get("/scheme").then(response => {
					// In response there will be a list of strings
					setData(response.data);
				})
				.catch(error => {
					console.log(error); // log the error to the browser's console
					App.addAlert("warning", t('Unable to get data: ', { error: error.toString() }));
			});
		}
	}

	// Obtain the data for specific config_type
	const getParameterData = async (configType) => {
		if (data) {
			let respData = {};
			let Axios = App.axiosCreate(url);
			await Axios.get("/scheme/" + configType.toString()
				).then(response => {
					// In response there will be a list of strings
					respData[configType] = response.data;
					paramData.push(respData);
				})
				.catch(error => {
					console.log(error); // log the error to the browser's console
					App.addAlert("warning", t('Unable to get data: ', { error: error.toString() }));
			});
		} else {
			App.addAlert("warning", 'No data has been retrieved.')
		}
	}

	// Select particular schema
	const selectSchema = (selected) => {
		// Validation on selected schema
		let schemaData = paramData.filter(function (obj) {
			return obj[selected];
		})
		setSelectedSchema(schemaData[0]);
		setDisplaySchemeKey(true);

		// TODO: Update with history
		// history.push({
		// 	pathname: "/config/schema/" + selected,
		// });
	}


	// Modify schema on input
	const modifySchemaContent = (e, idx) => {
		const { value, id } = e.target;
		const data = selectedSchema;
		data[Object.keys(selectedSchema)[0]][id] = value;
		setSelectedSchema(data);
		setUpdated(!updated);
	}

	// Submit values to be processed to ASAB config
	const onSubmit = values => {
		// TODO: update values in asab.config on submit (need an API endpoint)
		const data = selectedSchema;
		// setUpdated(true);
		// data[Object.keys(selectedSchema)[0]][id] = value;

	}

	return (
			<React.Fragment>
				{paramData.length != 0 ?
					<Container fluid className="animated fadeIn flex">
						<Row>
							<Col sm="2">
								<Card>
									<CardHeader>
										Select schema
									</CardHeader>
									<CardBody>
										<SchemaButtons
											data={data}
											selectSchema={selectSchema}
											selectedSchema={selectedSchema}
											toggleDisplay={toggleDisplay}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col sm="10">
								<SchemaCard
									handleSubmit={handleSubmit}
									onSubmit={onSubmit}
									register={register}
									selectedSchema={selectedSchema}
									modifySchemaContent={modifySchemaContent}
								/>
							</Col>
						</Row>
					</Container>
				: null}
			</React.Fragment>
	)
}

// Schema dropdown to display list of schemas
// TODO: make a tree view from it?
function SchemaButtons(props) {
	return (
			<React.Fragment>
				{props.data.map((scheme, idx) =>
					<React.Fragment>
						<Button color="secondary" size="lg" key={idx} id={idx} title={scheme} block onClick={() => {props.selectSchema(scheme), props.toggleDisplay()}}>{scheme}</Button>
					</React.Fragment>
				)}
			</React.Fragment>
		)
}


// Display Schema with inputs
function SchemaCard(props) {
	let schemaTitle = Object.keys(props.selectedSchema)[0] ? Object.keys(props.selectedSchema)[0] : "";
	let schemaValues = Object.values(props.selectedSchema)[0] ? Object.values(props.selectedSchema)[0] : {};
	
	// console.log(schemaTitle.title, 'schema title')
	// console.log(props.selectedSchema, 'selected schema')
	// console.log(schemaValues, 'schema values')
	// console.log(schemaValues.properties, 'schema properties')


	return (
		<Form onSubmit={props.handleSubmit(props.onSubmit)}>
			<Card>
				<CardHeader>
					Schema title: <b>{schemaTitle}</b>
					<div className="float-right">
						<p>type: <b>{schemaValues.type}</b></p>
					</div>
				</CardHeader>
				<CardBody>
					{schemaValues ?
						<React.Fragment>
							<CardTitle>{schemaValues.title}</CardTitle>
							<FormGroup>
								<RenderHandle valProps={schemaValues.properties}/>
							</FormGroup>
						</React.Fragment>
					: null}
				</CardBody>
				<CardFooter>
					<Button color="primary" type="submit">Submit</Button>
				</CardFooter>
			</Card>
		</Form>
		)
}


function RenderHandle(props) {

	let valueProperties = props.valProps;
	return(
		valueProperties && typeof valueProperties == 'object' ?
			Object.keys(valueProperties).map((key, idx) => {
				return(
					<React.Fragment key={idx+1}>
						<CardSubtitle key={key} className="pb-2">{key.toString().toUpperCase()}</CardSubtitle>
						<Label key={valueProperties[key].title} className="pb-2">{valueProperties[key].title}</Label>
						<Input
							key={idx}
							id={idx}
							type="text"
							name={valueProperties[key].title}
							value={valueProperties[key].examples}
							// innerRef={props.register}
							// onChange={(e) => props.modifySchemaContent(e, idx)}
						/>
						<hr key={idx+2} className="pb-2" />
						{valueProperties[key] && typeof valueProperties[key] == 'object' ?
							<RenderHandle key={idx+3} valProps={valueProperties[key].properties} />
						: null
						}
					</React.Fragment>
				)
			})
		:
			null
	)
}
