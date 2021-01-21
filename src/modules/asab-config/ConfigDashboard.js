import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';
import {
	Container,
	Col, Row,
	Button,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardBody, CardHeader, CardFooter,
	Form, FormGroup, Input, Label
} from "reactstrap";

export default function ConfigDashboard(props) {

	let App = props.app;
	let Config = App.Config;
	let url = undefined;


	let testSchema = {
					"asab:storage": {
						"type": "ABCDE",
						"mongodb_uri": "ABCDEFGHIJKLMNOPQRS",
						"mongodb_database": "ABCDEFGHIJKLMNO"
						},
					"general": {
						"config_file": "ABCDEFGHIJKLMNOPQRSTUVWX",
						"tick_period": "ABCD",
						"var_dir": "ABCDEFGHIJKLMN",
						"pidfile": "ABCD",
						"working_dir": "ABCDEFGHIJKLMNOPQR",
						"uid": "ABCDEFGHIJKLMNOP",
						"gid": "ABCDEFGHIJKLMNOPQRSTUVWX",
						"docker_remote_api": "ABCDEFGHIJKLMNOPQRS",
						"docker_name_prefix": "ABCDEFGHIJKLMNOPQRSTUVWXYZAB"
						},
					"logging": {
						"verbose": "ABCDEFGHIJKLMNOPQR",
						"app_name": "ABCDEFGHIJKLMNOPQRSTUVWX",
						"sd_id": "ABCDEFGHIJKLMNOPQ",
						"level": "ABCD",
						"levels": "ABCDEFGHIJKLMNOPQ"
						},
					"logging:console": {
						"format": "ABCDEFGHIJKLMNO",
						"datefmt": "ABCDEFGHIJKLMNOPQRSTUVWX"
						},
					"logging:syslog": {
						"enabled": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
						"address": "ABCDEFGHIJK",
						"format": "ABCDEFGHIJKLMNOPQRSTUV"
						},
					"logging:file": {
						"path": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
						"format": "ABCDEFGHIJKLMN",
						"datefmt": "ABCDEFGHIJKL",
						"backup_count": "ABCDEFG",
						"backup_max_bytes": "ABCDEFGHIJKLMNOPQRS",
						"rotate_every": "ABCDEFGHIJKLMNOPQRSTUVWXYZABC"
						},
					"asab:web": {
						"listen": "ABCDEFGHIJKLM"
						},
					"passwords": {
						"kafka_password": "ABCDEFGHIJKLMNOPQRS"
						}
					}


	const [ data, setData ] = useState([]);
	const [ paramData, setParamData ] = useState([]);
	const [ schema, setSchema ] = useState(testSchema);
	const [ selectedSchema, setSelectedSchema ] = useState({});

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
			// TODO: when prepared, remove mocked data and use endpoint to fetch them
			// let Axios = App.axiosCreate(url);
			// // TODO: replace the get parameter with `Axios.get("/config")` to obtain all the main components from zookeeper 
			// Axios.get("/scheme").then(response => {
			// 		// In response there will be a list of strings
			// 		setData(response.data);
			// 	})
			// 	.catch(error => {
			// 		console.log(error); // log the error to the browser's console
			// 		App.addAlert("warning", t('Unable to get data: ', { error: error.toString() }));
			// });
			setData(["configs", "new_type", "schemas"]);
		}
	}

	// Obtain the data for specific config_type
	const getParameterData = async (configType) => {
		if (data) {
			let respData = {};
			let Axios = App.axiosCreate(url);
			await Axios.get("/config/" + configType.toString()
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
		// setParamData([{"configs":}, {"new_type":}, {"schemas"}]);
	}


	const selectSchema = (selected, data) => {
		let select = {};
		select[selected] = data;
		// console.log(schema, schema[selected], 'lajduda')
		// console.log(selected, schema.selected, 'scmenata')
		setSelectedSchema(select);
	}

	return (
		// console.log(paramData, 'paramdata'),
			<React.Fragment>
				{paramData.length != 0 ?
					<Container fluid className="animated fadeIn flex">
						<Row>
							<Col sm="3">
								<Card>
									<CardBody>
										<SchemaDropdown schema={schema} selectSchema={selectSchema} dropdownOpen={dropdownOpen} toggle={toggle} />
									</CardBody>
								</Card>
							</Col>
							<Col sm="9">
								<Card>
									<CardBody>
										<Row>
											<Col sm="6">
												<SchemaCard selectedSchema={selectedSchema} />
											</Col>
											<Col sm="6">
												<JSONCard selectedSchema={selectedSchema} />
											</Col>
										</Row>
										{/*<Row>
											<Col>
												<SchemaCard selectedSchema={selectedSchema} />
											</Col>
											<Col>
												<JSONCard selectedSchema={selectedSchema} />
											</Col>
										</Row>*/}
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				: null}
			</React.Fragment>
	)
}


function SchemaDropdown(props) {
	return (
			<ButtonDropdown title="Dashboard settings" isOpen={props.dropdownOpen} toggle={props.toggle}>
				<DropdownToggle caret>
					<span className="cil-settings" />
					{' '}
					Configuration
				</DropdownToggle>
				<DropdownMenu>
					{Object.keys(props.schema).map((scheme, idx) =>
						<DropdownItem key={idx} id={idx} title={scheme} onClick={() => props.selectSchema(scheme,props.schema[scheme])}>{scheme}</DropdownItem>
						)}
				</DropdownMenu>
			</ButtonDropdown>
		)
}


function SchemaCard(props) {
	let schemaTitle = Object.keys(props.selectedSchema)[0] ? Object.keys(props.selectedSchema)[0] : "Schema";
	let schemaValues = Object.values(props.selectedSchema)[0] ? Object.values(props.selectedSchema)[0] : {};
	return (
		<Card>
			<CardHeader>{schemaTitle}</CardHeader>
			<CardBody>
			{props.selectedSchema ?
				<FormGroup>
					{Object.keys(schemaValues).map((key, idx) =>
						<React.Fragment key={idx}>
							<Label key={idx} id={key} for={key}>{key.toString().toUpperCase()}</Label>
							<Input key={key} id={key} type="text" name={key} />
						</React.Fragment>
						)}
				</FormGroup>
			: null}
			</CardBody>
			<CardFooter>
				<Button>Submit</Button>
			</CardFooter>
		</Card>
		)
}


function JSONCard(props) {
	let schemaTitle = Object.keys(props.selectedSchema)[0] ? Object.keys(props.selectedSchema)[0] : "Schema";
	let schemaValues = Object.values(props.selectedSchema)[0] ? Object.values(props.selectedSchema)[0] : {};
	return (
		<Card>
			<CardHeader>JSON {schemaTitle}</CardHeader>
			<CardBody>
			{props.selectedSchema ?
				<ReactJson
					src={props.selectedSchema}
					name={false}
					// onEdit={ e => { setData(e.updated_src), setModified(true) } }
					// onDelete={ e => { setData(e.updated_src), setModified(true) } }
					// onAdd={ e => { setData(e.updated_src), setModified(true) } }
				/>
			: null}
			</CardBody>
			<CardFooter>
				<Button>Collapse JSON</Button>
			</CardFooter>
		</Card>

		)
}
