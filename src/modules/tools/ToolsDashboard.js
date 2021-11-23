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
		}

		// If Tools configuration not present in app config file, try to get the configuration from Zookeeper
		if (configuration == undefined) {
			if (props.config == undefined) {
				props.app.addAlert("warning", t("ASABToolsModule|Can't load the configuration, 'config' property has not been specified"));
				console.warn("'config' property is undefined. Specify it in the module of the application.");
				return;
			}

			let type = props.type;
			if (type.indexOf("/", 0) == 0) {
				type = type.substring(1);
			}

			// Tools config is loaded from Zookeeper (dynamic configuration)
			const ASABConfigAPI = props.app.axiosCreate('asab_config');
			try {
				let response = await ASABConfigAPI.get(`/config/${type}/${props.config}${props.variant}`);
				if (response.data.result == 'FAIL') {
					throw new Error(t("ASABToolsModule|Unable to get config data from service, please check the config settings"))
				}
				configuration = response.data?.tools;
			} catch(e) {
				console.error(e);
				props.app.addAlert("warning", t("ASABToolsModule|Something went wrong, unable to get config data from service"));
			}
		}

		setConfig(configuration);
	}

	return (
		config != undefined ?
			<React.Fragment>
				<Container fluid className="animated fadeIn flex">
					<Row>
						{Object.keys(config).map((key, idx) => {
							return (
								<React.Fragment key={key}>
									<Col className="text-center pt-5 pb-5 pl-5 pr-5">
										<Row className="justify-content-center">
											<a href={config[key].url} target="_blank" rel="noopener noreferrer">
												<Button title={config[key].url} color="light" style={{ boxShadow: "0px 2px 4px rgba(33, 36, 41, 0.05)", borderRadius: 15, width: 130, height: 130, padding: 0 }} >
													<img
														src={config[key].image}
														style={{ width: 72 + "px", height: 72 + "px", padding: 5 }}
													>
													</img>
													<h6 className="pt-2">{config[key].name}</h6>
												</Button>
											</a>
										</Row>
									</Col>
								</React.Fragment>
							)
						})}
					</Row>
				</Container>
			</React.Fragment>
			: null
	);
};
