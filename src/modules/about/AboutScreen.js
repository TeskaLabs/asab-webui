import React from 'react';

import AboutCard from './AboutCard';
import UserInterfaceCard from './UserInterfaceCard';


import {
	Container, Row, Col,
} from 'reactstrap';

function AboutScreen(props) {
	return (
		<Container>
			<Row className="justify-content-center">
				<Col md="6">
					<AboutCard app={props.app} />
					<UserInterfaceCard />
				</Col>
			</Row>
		</Container>
	);
}

export default AboutScreen;
