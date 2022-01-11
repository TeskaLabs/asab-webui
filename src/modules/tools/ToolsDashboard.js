import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import {
	Container, Col, Row, Button
} from "reactstrap";

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
			const ASABConfigAPI = props.app.axiosCreate('asab_config');
			try {
				let response = await ASABConfigAPI.get(`/configs/${type}`);
				if (response.data.result != 'OK') {
					throw new Error(t("ASABToolsModule|Unable to get config data from service, please check the config settings"))
				}
				configuration = response.data.data;
			} catch(e) {
				console.error(e);
				props.app.addAlert("warning", t("ASABToolsModule|Something went wrong, unable to get config data from service"));
			}
			// Parse configuration and drop config file names
			let configArray = [];
			await Promise.all(configuration.map((cnfg) => {
				if (Object.keys(cnfg) && Object.keys(cnfg).length > 0) {
					let configContent = Object.values(cnfg)[0];
					if (configContent && Object.keys(configContent).length > 0) {
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
					<Col className="text-center pt-5 pb-5 pl-5 pr-5">
						<Row className="justify-content-center">
							<a href={configObject.url} target="_blank" rel="noopener noreferrer">
								<Button title={configObject.url} color="light" style={{ boxShadow: "0px 2px 4px rgba(33, 36, 41, 0.05)", borderRadius: 15, width: 130, height: 130, padding: 0 }} >
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
