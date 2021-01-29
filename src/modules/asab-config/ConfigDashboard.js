import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactJson from 'react-json-view';
import { useForm } from "react-hook-form";
import {
	Container,
	Col, Row,
	Button,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardBody, CardHeader, CardFooter,
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

	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);

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
		let schemaData = paramData.filter(function (obj) {
			return obj[selected];
		})
		setSelectedSchema(schemaData[0]);

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
							<Col sm="3">
								<Card>
									<CardHeader>
										Select schema
									</CardHeader>
									<CardBody>
										<SchemaDropdown
											schema={data}
											selectSchema={selectSchema}
											dropdownOpen={dropdownOpen}
											toggle={toggle}
										/>
									</CardBody>
								</Card>
							</Col>
							<Col sm="9">
								<Card>
									<CardHeader>
										Display schema
									</CardHeader>
									<CardBody>
										<Row>
											<Col sm="12">
												<SchemaCard
													handleSubmit={handleSubmit}
													onSubmit={onSubmit}
													register={register}
													selectedSchema={selectedSchema}
													modifySchemaContent={modifySchemaContent}
												/>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				: null}
			</React.Fragment>
	)
}

// Schema dropdown to display list of schemas
// TODO: make a tree view from it?
function SchemaDropdown(props) {
	return (
			<React.Fragment>
					{props.schema.map((scheme, idx) =>
						<Button color="secondary" size="lg" key={idx} id={idx} title={scheme} block onClick={() => props.selectSchema(scheme)}>{scheme}</Button>
					)}
			</React.Fragment>
		)
}



			/*<ButtonDropdown title="Dashboard settings" isOpen={props.dropdownOpen} toggle={props.toggle}>
				<DropdownToggle caret>
					<span className="cil-settings" />
					{' '}
					Configuration
				</DropdownToggle>
				<DropdownMenu>
					{props.schema.map((scheme, idx) =>
						<DropdownItem key={idx} id={idx} title={scheme} onClick={() => props.selectSchema(scheme,props.schema[scheme])}>{scheme}</DropdownItem>
					)}
				</DropdownMenu>
			</ButtonDropdown>*/


// Display Schema with inputs
function SchemaCard(props) {
	let schemaTitle = Object.keys(props.selectedSchema)[0] ? Object.keys(props.selectedSchema)[0] : "Schema";
	let schemaValues = Object.values(props.selectedSchema)[0] ? Object.values(props.selectedSchema)[0] : {};
	return (
		<Form onSubmit={props.handleSubmit(props.onSubmit)}>
			<Card>
				<CardHeader>{schemaTitle}</CardHeader>
				<CardBody>
				{props.selectedSchema ?
					<FormGroup>
						{Object.keys(schemaValues).map((key, idx) =>
							<React.Fragment key={idx}>
								<Label key={idx} id={key} for={key}>{key.toString().toUpperCase()}</Label>
								<Input
									key={key}
									id={key}
									type="text"
									name={key}
									value={schemaValues.key}
									innerRef={props.register}
									onChange={(e) => props.modifySchemaContent(e, idx)}
								/>
							</React.Fragment>
							)}
					</FormGroup>
				: null}
				</CardBody>
				<CardFooter>
					<Button color="primary" type="submit">Submit</Button>
				</CardFooter>
			</Card>
		</Form>
		)
}
