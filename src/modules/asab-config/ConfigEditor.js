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

	const [ typeId, setTypeId ] = useState(props.match.params.type_id);
	const [ type, setType ] = useState(undefined);
	const { register, handleSubmit, setValue, errors } = useForm();
	
	const onSubmit = data => console.log(data);

	// Retrieve the ASAB_CONFIG_URL from config file
	let url = props.app.Config.get('ASAB_CONFIG_URL');
	const Axios = props.app.axiosCreate(url);

	useEffect(() => {
		load();
	},[]);


	const load = async () => {
		if (typeId) {
			await Axios.get("/type/" + typeId).then(response => {
				setType(response.data);
			})
			.catch(error => {
				console.log(error); // log the error to the browser's console
				App.addAlert("warning", t(`Unable to get ${typeId} data: `, { error: error.toString() }));
			});
		}
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
								<div className="float-right">
									<span className="cil-briefcase pr-3" />
									{typeId}
								</div>
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

						{/* TODO: List all remaining sections in "values" as a  ConfigAdHocSection */}

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

					{/* TODO: List all remaining key/values from a config as simple Config Item  */}

				</CardBody>
			</Collapse>
		</Card>
	);
}

// TODO: Different types of ConfigItem to cover formats such as "number", "boolean", checkbox, radiobox
function ConfigItem(props) {
	let myid = '['+props.sectionname + "] " + props.itemname;
	return (
		<FormGroup>
			<Label for={myid}>
				{props.item['title']}
			</Label>
			<ConfigItemFormats
				format={props.item['type']}
				myid={myid}
				placeholder={props.item['default']}
				register={props.register()}
			/>
			<FormText color="muted">
				{props.item['description']}
			</FormText>
		</FormGroup>
	);
}

function ConfigItemFormats(props) {
	let format = props.format;
	switch(format) {
		case "string": return(
				<Input
					type="text"
					name={props.myid}
					id={props.myid}
					placeholder={props.placeholder}
					innerRef={props.register}
				/>
			);
		case "number": return(
				<Input
					type="number"
					name={props.myid}
					id={props.myid}
					placeholder={props.placeholder}
					innerRef={props.register}
				/>
			);
		case "url": return(
				<Input
					type="url"
					name={props.myid}
					id={props.myid}
					placeholder={props.placeholder}
					innerRef={props.register}
				/>
			);
		case "email": return(
				<Input
					type="email"
					name={props.myid}
					id={props.myid}
					placeholder={props.placeholder}
					innerRef={props.register}
				/>
			);
		case "password": return(
				<Input
					type="password"
					name={props.myid}
					id={props.myid}
					placeholder={props.placeholder}
					innerRef={props.register}
				/>
			);
		case "boolean": return(
				<React.Fragment>
					<br />
					<Input
						style={{marginLeft: 5}}
						type="checkbox"
						name={props.myid}
						id={props.myid}
						innerRef={props.register}
					/>
					<br />
				</React.Fragment>
			);
		case undefined: return(null);
		}
}
