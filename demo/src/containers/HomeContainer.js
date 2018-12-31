import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';


class HomeContainer extends Component {

	render() {
		return (
			<Container fluid>
				<Row>
					<Col>
						<h1>Asab WebUI Kit (CoreUI)</h1>
					</Col>
				</Row>	
			</Container>
		)
	}
}

export default HomeContainer;
