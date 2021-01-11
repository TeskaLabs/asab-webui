import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
	Container,
	Col, Row,
	Button
} from "reactstrap";

export default function ConfigDashboard() {
	const [ data, setData ] = useState();

	return (
		<React.Fragment>
			<Container fluid className="animated fadeIn flex">
				<div>Hello world!</div>
			</Container>
		</React.Fragment>
	)
}
