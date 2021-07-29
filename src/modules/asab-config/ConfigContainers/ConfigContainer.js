import React from "react";

import {
	Container,
	Col, Row,
	Card, CardBody, CardHeader
} from "reactstrap";

import { useTranslation } from 'react-i18next';

import { TreeViewComponent } from "./TreeViewComponent";
import ConfigEditor from "./ConfigEditor";
import './configuration.css';

export default function ConfigContainer(props) {

	let App = props.app;
	const { t, i18n } = useTranslation();

	const configType = props.match.params.configType;
	const configName = props.match.params.configName;

	const homeScreenImg = App.Config.get('brand_image').full;
	const homeScreenAlt = App.Config.get('title');

	return (
		<Container fluid className="animated fadeIn flex mt-0 pr-0 pl-0 pt-0 config-container">
			<Row className="config-row">
				<Col sm="2" className="pr-0 bcg-column">
					<TreeViewComponent
						app={App}
						configType={configType}
						configName={configName}
					/>
				</Col>
				<Col md={{ size: 6, offset: 1 }}>
					{configType != '$' && configName != '$' ?
						<ConfigEditor
							app={App}
							configType={configType}
							configName={configName}
						/>
					:
						<Card>
							<CardBody className="text-center">
								<img
									src={homeScreenImg}
									alt={homeScreenAlt}
									style={{maxWidth: "38%"}}
								/>
								<h3>{t('ASABConfig|Nothing has been selected yet')}</h3>
								<h5>{t('ASABConfig|Please select the configuration from tree menu on the left side of the screen')}</h5>
							</CardBody>
						</Card>
					}
				</Col>
			</Row>
		</Container>
	)
}
