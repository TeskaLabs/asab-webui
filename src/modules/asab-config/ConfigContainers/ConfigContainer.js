import React, { useState } from "react";

import {
	Container, Col, Row,
	Card, CardBody
} from "reactstrap";

import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { TreeViewComponent } from "./TreeViewComponent";
import ConfigEditor from "./ConfigEditor";
import ConfigList from "./ConfigList";

function ConfigContainer(props) {

	const { t, i18n } = useTranslation();

	const configType = props.match.params.configType;
	const configName = props.match.params.configName;

	const [ createConfig, setCreateConfig ] = useState(false);

	const homeScreenImg = props.app.Config.get('brand_image').full;
	const homeScreenAlt = props.app.Config.get('title');

	return (
		<Container fluid className="config-container animated fadeIn">
			<Row className="ml-0 h-100">
				<Col xs="3" sm="3" className="h-100">
					<TreeViewComponent
						app={props.app}
						configCreated={props.config_created}
						configRemoved={props.config_removed}
						setCreateConfig={setCreateConfig}
						configType={configType}
						configName={configName}
					/>
				</Col>
				<Col xs="8" sm="8" className="h-100">
					{configType != '$' && configName != '$' ?
						configName != '!manage' && createConfig == false ?
							<ConfigEditor
								app={props.app}
								configType={configType}
								configName={configName}
							/>
						:
							<ConfigList
								app={props.app}
								configType={configType}
								createConfig={createConfig}
								setCreateConfig={setCreateConfig}
							/>
					:
						<Card>
							<CardBody className="text-center">
								<img
									src={homeScreenImg}
									alt={homeScreenAlt}
									style={{maxWidth: "38%"}}
								/>
								<h3>{t('ASABConfig|Nothing has been selected')}</h3>
								<h5>{t('ASABConfig|Please select the configuration from tree menu on the left side of the screen')}</h5>
							</CardBody>
						</Card>
					}
				</Col>
			</Row>
		</Container>
	)
}

function mapStateToProps(state) {
	return {
		config_created: state.asab_config.config_created,
		config_removed: state.asab_config.config_removed
	}
}

export default connect(mapStateToProps)(ConfigContainer);
