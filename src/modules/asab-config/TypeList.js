// List of types
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import {
	Container,
	Col, Row,
	Button,
	Card, CardBody, CardHeader, CardFooter, CardTitle, CardSubtitle,
	Form, FormGroup, FormText, Input, Label,
	Table
} from "reactstrap";


export default function TypeList(props) {
	const { register, handleSubmit, setValue, errors } = useForm();

	let App = props.app;

	// Retrieve the ASAB_CONFIG_URL from config file
	let services = App.Config.get('SERVICES');
	let url = services?.asabconfig ? services.asabconfig : 'asab-config';
	const Axios = App.axiosCreate(url);

	const [ typeList, setTypeList ] = useState([]);


	useEffect(() => {
		getTypes();
	}, []);

	// Obtain the overall dataset
	const getTypes = async () => {
		await Axios.get("/type").then(response => {
				// In response there will be a list of strings
				setTypeList(response.data);
			})
			.catch(error => {
				console.log(error); // log the error to the browser's console
				App.addAlert("warning", t('Unable to get data: ', { error: error.toString() }));
			});
	}

	return (
		<Container fluid className="animated fadeIn flex">
			<Row className="justify-content-md-center pt-5">
				<Col md={6}>
					<Card>
						<CardHeader>
							<span className="icon-menu pr-3" />
							Config types
						</CardHeader>
						<CardBody>
							<Table hover>
								<colgroup>
									<col style={{width: "1px"}} />
								</colgroup>
								<thead>
									<tr>
										<th>Type name</th>
									</tr>
								</thead>
								<tbody>
									{typeList.map((type, idx) => {
										return (
											<tr key={idx}>
												<th scope="row">
													<Link to={{
														pathname: '/config/' + type,
														aboutProps: {
															name: type
														}
													}}>{type}</Link>
												</th>
											</tr>
										)
									})}
								</tbody>
							</Table>
						</CardBody>
						<CardFooter />
					</Card>
				</Col>
			</Row>
		</Container>
		)
}
