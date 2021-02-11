import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
	Container,
	Col, Row,
	Button,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardBody, CardHeader, CardFooter, CardTitle, CardSubtitle,
	Collapse,
	Form, FormGroup, FormText, Input, Label
} from "reactstrap";


export default function ConfigEditor(props) {

	const [ type, setType ] = useState(undefined);
	const { register, handleSubmit, setValue, errors } = useForm();
	
	const onSubmit = data => console.log(data);

	// Retrieve the ASAB_CONFIG_URL from config file
	let url = props.app.Config.get('ASAB_CONFIG_URL');
	const axios = props.app.axiosCreate(url);

	useEffect(() => {
		load();
	},[]);

	const load = async () => {
		let type_response = await axios.get("/type/new_type")
		setType(type_response.data)
	}

	useEffect(() => {

		async function fetchValues() {
			// let config_response = await axios.get("/config/new_type/my_config")
			// let values = config_response.data

			// Mocked
			let values = {
				'general': {
					'uid': "123",
				}
			};

			for (var section in values) {
				for (var key in values[section]) {
					setValue('['+section + "] " + key, values[section][key], { shouldValidate: false })
				}
			}
		}
		fetchValues();

	},[type]);


	return (
		<Container fluid className="animated fadeIn flex">
			<Row>
				<Col md={{ size: 6, offset: 3 }}>
					<Form onSubmit={handleSubmit(onSubmit)}>
						
						<Card style={{marginBottom: "0.25em"}}>
							<div style={{margin: "0.5em"}}>
								<Button
									color="primary"
									type="submit"
								>
									Save
								</Button>
							</div>
						</Card>

						{type && type.properties && Object.keys(type.properties).map((section_name, idx) =>
							<ConfigSection
								key={idx}
								section={type.properties[section_name]}
								sectionname={section_name}
								register={register}
							/>
						)}
					</Form>
				</Col>
			</Row>
		</Container>
	);
}


function ConfigSection(props) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Card style={{marginBottom: "0.25em"}}>
			<CardHeader tag="h5" onClick={toggle}>
				{props.section['title']}
			</CardHeader>
			<Collapse isOpen={isOpen}>
				<CardBody>
					{Object.keys(props.section.properties).map((item_name, idx) =>
						// TODO: Decide that type of config item to render
						<ConfigItem
							key={idx}
							item={props.section.properties[item_name]}
							itemname={item_name}
							sectionname={props.sectionname}
							register={props.register}
						/>
					)}
				</CardBody>
			</Collapse>
		</Card>
	);
}

function ConfigItem(props) {

	let myid = '['+props.sectionname + "] " + props.itemname;

	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<Input
				type="text"
				name={myid}
				id={myid}
				placeholder={props.item['default']}
				innerRef={props.register()}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}
