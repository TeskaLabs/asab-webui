import React from 'react';

import { 
	Container, Row, Col,
	Card, CardHeader, CardBody 
} from 'reactstrap';

class ErrorHandler extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo
		})
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<Container>
					<Row>
						<Col>
							<Card>
								<CardHeader>Oops. Something went wrong.</CardHeader>
								<CardBody>
									<details style={{ whiteSpace: 'pre-wrap' }}>
										{this.state.error && this.state.error.toString()}
										<br />
										{this.state.errorInfo.componentStack}
									</details>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			);
		}
		
		return this.props.children;
	}
}

export default ErrorHandler;
