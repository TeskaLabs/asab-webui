import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TreeMenu from 'react-simple-tree-menu';

import {
	Container,
	Col, Row,
	Button,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardBody, CardHeader, CardFooter, CardTitle, CardSubtitle,
	Collapse,
	Form, FormGroup, FormText, Input, Label
} from "reactstrap";

import { TreeViewComponent } from "./TreeViewComponent";
import { ConfigEditor } from "./ConfigEditor";

export default function ConfigContainer(props) {

	let App = props.app;
	// Retrieve the ASAB_CONFIG_URL from config file
	let services = App.Config.get('SERVICES');
	let url = services?.asabconfig ? services.asabconfig : 'asab-config';
	const Axios = App.axiosCreate(url);

	const [ configType, setConfigType ] = useState("");	//typeId
	const [ configName, setConfigName ] = useState(""); // configId

	// Get config type and name from TreeView
	const getConfigTypeName = (type, name) => {
		setConfigType(type);
		setConfigName(name);
	}

	return (
		<Container fluid className="animated fadeIn flex mt-0 pr-0 pl-0 pt-0 library-container">
			<Row className="library-row">
				<Col xs="2" sm="2" className="pr-0 bcg-column">
					<TreeViewComponent
						axios={Axios}
						app={App}
						configType={configType}
						configName={configName}
						onTreeClick={getConfigTypeName}
					/>
				</Col>
				<Col md={{ size: 6, offset: 1 }}>
					<ConfigEditor
						axios={Axios}
						app={App}
						configType={configType}
						configName={configName}
					/>
				</Col>
			</Row>
		</Container>
		)
}