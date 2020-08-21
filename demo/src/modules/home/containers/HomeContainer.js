import React, { Component } from 'react'
import { Container } from 'reactstrap';


class HomeContainer extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Container fluid>
				<p>Hello world</p>
			</Container>
		)
	}
}

export default HomeContainer;