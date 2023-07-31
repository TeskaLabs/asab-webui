import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import {
	Container, Col, Row, Button
} from "reactstrap";

import { validateConfiguration } from 'asab-webui';

/*
	For informations about Tools module, refer to asab-webui/doc/tools.md
*/

export default function ToolsDashboard(props){
	const { t } = useTranslation();
	const [ config, setConfig ] = useState(undefined);

	useEffect(() => {
		retrieveConfig();
	}, []);

	const retrieveConfig = async () => {
		let configuration = undefined;

		// First, look for Tools configuration in app config file (static configuration)
		if (props.app.Config != undefined) {
			configuration = await props.app.Config.get('tools');
			if (configuration != undefined) {
				let configArray = [];
				Object.keys(configuration).map((key, idx) => {
					configArray.push(configuration[key])
				})
				configuration = configArray;
			}
		}

		// If Tools configuration not present in app config file, try to get the configuration from Zookeeper
		if (configuration == undefined) {
			let type = props.type;
			if (type.indexOf("/", 0) == 0) {
				type = type.substring(1);
			}

			// Tools configs are loaded from Zookeeper (dynamic configuration)
			const ASABConfigAPI = props.app.axiosCreate('asab-config');
			try {
				let response = await ASABConfigAPI.get(`/configs/${type}`);
				if (response.data.result != 'OK') {
					throw new Error(t("ASABToolsModule|Unable to get config data from service, please check the config settings"))
				}
				configuration = response.data.data;
			} catch(e) {
				console.error(e);
				props.app.addAlert("warning", `${t("ASABToolsModule|Something went wrong, unable to get config data from service")}. ${e?.response?.data?.message}`, 30);
			}
			// Parse configuration and drop config file names
			let configArray = [];
			await Promise.all(configuration.map(async (cnfg) => {
				if (Object.keys(cnfg) && Object.keys(cnfg).length > 0) {
					let configToAppend = {};
					let configContent = Object.values(cnfg)[0];
					if (configContent && Object.keys(configContent).length > 0) {
						configToAppend = Object.values(configContent)[0];
						// Check if current tenant is present in the configuration
						// and if so, display the configuration only for tenants in configuration
						if (validateConfiguration(props, configContent)) {
							return;
						}
						configArray.push(Object.values(configContent)[0]);
					}
				}
			}))
			configuration = configArray;
		}
		setConfig(configuration);
	}

	return (
		config != undefined ?
			<React.Fragment>
				<Container fluid className="animated fadeIn flex">
					<Row>
						<Tool config={config} />
					</Row>
				</Container>
			</React.Fragment>
			: null
	);
};

function Tool(props) {
	return(
		props.config.map((configObject, idx) => {
			return (
				<React.Fragment key={configObject.name}>
					<Col className="text-center pt-5 pb-5 ps-5 pe-5">
						<Row className="justify-content-center">
							<a href={configObject.url} target="_blank" style={{textDecoration: "none"}} rel="noopener noreferrer">
								<Button className="tools-btn" title={configObject.url}>
									<img
										src={configObject.image}
										style={{ width: 72 + "px", height: 72 + "px", padding: 5 }}
									>
									</img>
									<h6 className="pt-2">{configObject.name}</h6>
								</Button>
							</a>
						</Row>
					</Col>
				</React.Fragment>
			)
		})
	)
}
