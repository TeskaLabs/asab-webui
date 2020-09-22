import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Container, Col, Row
} from "reactstrap";


export default class ToolsDashboard extends Component {

	/* Example of use

	{"tools":[{"name":"Kibana","url":127.0.0.1.,"path":"tools/kibana.svg"}}}

	*/

	constructor(props) {
		super(props);
		this.App = props.app;
		this.Config = this.App.Config;
	}


	render() {
		let config = undefined;
		if (this.Config === undefined) {
			config = config;
			this.App.addAlert("warning", 'Unable to load the data from site.');
		} else {
			config = this.Config.get('tools');
		}
		return (
			config !== undefined ?
			<React.Fragment>
				<Container fluid className="animated fadeIn">
					<Row>
					{Object.keys(config).map((key, idx) => {
						return(
							<React.Fragment key={key}>
								<Col sm={3} className="text-center">
									<Row className="justify-content-center">
										<a href={config[key].url} target="_blank">
											<img
												src={config[key].path}
												style={{width:200+"px", height:200+"px"}}
												title={config[key].url}
												>
											</img>
										</a>
									</Row>
									<Row className="justify-content-center pt-2">
										<h1>{config[key].name}</h1>
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
	}
};
