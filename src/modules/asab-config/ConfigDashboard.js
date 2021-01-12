import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
	Container,
	Col, Row,
	Button
} from "reactstrap";

export default function ConfigDashboard(props) {

	let App = props.app;
	let Config = App.Config;
	let url = undefined;

	const [ data, setData ] = useState({});
	const [ paramData, setParamData ] = useState({});

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

	// Obtain the overall dataset
	const getData = () => {
		if (url) {
			let Axios = App.axiosCreate(url);
			// TODO: replace the get parameter with `Axios.get("/config")` to obtain all the main components from zookeeper 
			Axios.get("/config/new_type"
				).then(response => {
					// console.log(response.data)
					setData(response.data);
				})
				.catch(error => {
					console.log(error); // log the error to the browser's console
					App.addAlert("warning", t('Unable to get data: ', { error: error.toString() }));
			});
		}
	}

	// Obtain the data for specific config_type
	const getParameterData = (configType) => {
		if (data) {
			let Axios = App.axiosCreate(url);
			Axios.get("/config/" + configType.toString()
				).then(response => {
					setParamData(response.data);
				})
				.catch(error => {
					console.log(error); // log the error to the browser's console
					App.addAlert("warning", t('Unable to get data: ', { error: error.toString() }));
			});
		} else {
			App.addAlert("warning", 'No data has been retrieved.')
		}
	}

	return (
		<React.Fragment>
			<Container fluid className="animated fadeIn flex">
				<div>Hello world!</div>
			</Container>
		</React.Fragment>
	)
}
