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
				<Container fluid className="animated fadeIn flex">
					<Row>
					{Object.keys(config).map((key, idx) => {
						return(
							<React.Fragment key={key}>
								<Col className="text-center pt-5 pb-5">
									<Row className="justify-content-center">
										<a href={config[key].url} target="_blank" rel="noopener noreferrer">
											<Button color="light" style={{ border: '1.5px solid', borderRadius: 20, width: 130, height: 130, padding: 0 }} >
												<img
													src={config[key].path}
													style={{width:72+"px", height:72+"px"}}
													title={config[key].url}
													>
												</img>
												<h6 className="pt-2">{config[key].name}</h6>
											</Button>
										</a>
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
