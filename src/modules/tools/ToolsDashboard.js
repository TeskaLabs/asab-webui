import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Container, Col, Row, Button
} from "reactstrap";


export default class ToolsDashboard extends Component {

	/* Example of use

	{"tools":[{"name":"Kibana","url":127.0.0.1.,"path":"tools/kibana.svg"}]}

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
								<Col lg={4} className="text-center pt-5 pb-5">
									<Row className="justify-content-center">
										<Button color="outline-dark" style={{ border: '4px solid', borderRadius: 20, width: 350, height: 350, padding: 0 }} >
											<a href={config[key].url} target="_blank" rel="noopener">
												<img
													src={config[key].path}
													style={{width:200+"px", height:200+"px"}}
													title={config[key].url}
													>
												</img>
											</a>
											<h1 className="pt-2">{config[key].name}</h1>
										</Button>
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
