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
import ConfigEditor from "./ConfigEditor";

export default function ConfigContainer(props) {

	let App = props.app;

	const configType = props.match.params.configType;
	const configName = props.match.params.configName;

	return (
		<Container fluid className="animated fadeIn flex mt-0 pr-0 pl-0 pt-0 library-container">
			<Row className="library-row">
				<Col xs="2" sm="2" className="pr-0 bcg-column">
					<TreeViewComponent
						app={App}
						configType={configType}
						configName={configName}
					/>
				</Col>
				<Col md={{ size: 6, offset: 1 }}>
					<ConfigEditor
						app={App}
						configType={configType}
						configName={configName}
					/>
				</Col>
			</Row>
		</Container>
	)
}